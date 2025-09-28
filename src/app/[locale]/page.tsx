import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Database, Palette, Globe } from "lucide-react";
import { Hero } from "@/components/ui/animated-hero";
import { getTranslations } from 'next-intl/server';
import { Link } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

const HomePage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: 'common' }); // Using 'common' namespace from our translation files

  const features = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: t('internationalization_feature'),
      description: t('feature_description'),
      items: [
        t('language'),
        t('switch_language'),
        t('feature_ui_title'), // Responsive UI support
        t('feature_mobile_responsive'),
      ],
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: t('feature_auth_title'),
      description: t('feature_auth_desc'),
      items: [
        t('feature_email_auth'),
        t('feature_session_mgmt'),
        t('feature_role_access'),
        t('feature_account_linking'),
      ],
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: t('feature_user_mgmt_title'),
      description: t('feature_user_mgmt_desc'),
      items: [
        t('feature_user_reg'),
        t('feature_profile_mgmt'),
        t('feature_ban_users'),
        t('feature_session_revocation'),
      ],
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: t('feature_db_title'),
      description: t('feature_db_desc'),
      items: [
        t('feature_postgresql'),
        t('feature_drizzle'),
        t('feature_type_safe'),
        t('feature_auto_migrations'),
      ],
    },
    {
      icon: <Palette className="h-5 w-5" />,
      title: t('feature_ui_title'),
      description: t('feature_ui_desc'),
      items: [
        t('feature_tailwind'),
        t('feature_shadcn'),
        t('feature_dark_mode'),
        t('feature_mobile_responsive'),
      ],
    },
  ];

  const techStack = [
    t('tech_nextjs'),
    t('tech_better_auth'),
    t('tech_postgresql'),
    t('tech_drizzle'),
    t('tech_tailwind'),
    t('tech_shadcn'),
    t('tech_typescript'),
    t('tech_hook_form'),
    t('tech_zod'),
    t('tech_brevo'),
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <Hero />

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 hover:border-border transition-colors"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {feature.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle>{t('tech_stack_title')}</CardTitle>
            <CardDescription>
              {t('tech_stack_desc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border/50">
          <p className="text-muted-foreground">
            {t('built_with')}{" "}
            <Link
              href="https://zexa.app"
              target="_blank"
              className="text-primary hover:underline font-medium"
            >
              Zexa
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;