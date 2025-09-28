import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Dependency Management', () => {
  it('should ensure Resend is removed and Brevo SDK is present in package.json', () => {
    const packageJsonPath = path.resolve(__dirname, '../../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // Check if Resend is removed
    expect(packageJson.dependencies?.resend).toBeUndefined();
    expect(packageJson.devDependencies?.resend).toBeUndefined();

    // Check if Brevo SDK is present
    expect(packageJson.dependencies?.['@getbrevo/brevo']).toBeDefined();
  });
});