#!/usr/bin/env node

/**
 * Build-time validation script for locale configuration
 * Validates that all configured locales have corresponding translation files
 */

const fs = require('fs');
const path = require('path');

// Import locales from the central configuration
// Note: We read the file directly since this is a build-time script
const configPath = path.join(process.cwd(), 'src', 'lib', 'locale-config.ts');
const configContent = fs.readFileSync(configPath, 'utf8');

// Extract SUPPORTED_LOCALES array from the TypeScript file
const localesMatch = configContent.match(/SUPPORTED_LOCALES\s*=\s*\[(.*?)\]/s);
const defaultLocaleMatch = configContent.match(/DEFAULT_LOCALE\s*=\s*['"`]([^'"`]+)['"`]/);

const supportedLocales = localesMatch 
  ? localesMatch[1].split(',').map(s => s.trim().replace(/['"`]/g, ''))
  : ['en', 'de'];
  
const defaultLocale = defaultLocaleMatch ? defaultLocaleMatch[1] : 'de';

console.log('🌍 Validating locale configuration...');
console.log(`📋 Configured locales: ${supportedLocales.join(', ')}`);
console.log(`🎯 Default locale: ${defaultLocale}`);

let hasErrors = false;

// Check if default locale is in supported locales
if (!supportedLocales.includes(defaultLocale)) {
  console.error(`❌ Default locale "${defaultLocale}" is not in supported locales list`);
  hasErrors = true;
}

// Check translation files
const localesDir = path.join(process.cwd(), 'public', 'locales');

if (!fs.existsSync(localesDir)) {
  console.error(`❌ Locales directory not found: ${localesDir}`);
  hasErrors = true;
} else {
  console.log(`📁 Checking translation files in: ${localesDir}`);
  
  for (const locale of supportedLocales) {
    const translationFile = path.join(localesDir, `${locale}.json`);
    
    if (!fs.existsSync(translationFile)) {
      console.error(`❌ Missing translation file: ${translationFile}`);
      hasErrors = true;
    } else {
      try {
        const content = fs.readFileSync(translationFile, 'utf8');
        JSON.parse(content); // Validate JSON syntax
        console.log(`✅ Valid translation file: ${locale}.json`);
      } catch (error) {
        console.error(`❌ Invalid JSON in translation file ${locale}.json:`, error.message);
        hasErrors = true;
      }
    }
  }
}

// Check for orphaned translation files
if (fs.existsSync(localesDir)) {
  const translationFiles = fs.readdirSync(localesDir)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
    
  const orphanedFiles = translationFiles.filter(locale => !supportedLocales.includes(locale));
  
  if (orphanedFiles.length > 0) {
    console.warn(`⚠️  Orphaned translation files (not in SUPPORTED_LOCALES): ${orphanedFiles.join(', ')}`);
  }
}

if (hasErrors) {
  console.error('\n❌ Locale validation failed!');
  process.exit(1);
} else {
  console.log('\n✅ Locale validation passed!');
}