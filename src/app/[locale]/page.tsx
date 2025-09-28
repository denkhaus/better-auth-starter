import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Database,
  Palette,
  Globe,
  Monitor,
  Lock,
} from "lucide-react"; // Added Monitor and Lock for new features
import { Hero } from "@/components/ui/animated-hero";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

const HomePage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "common" }); // Using 'common' namespace from our translation files

  const features = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: t("internationalization_feature"),
      description: t("feature_i18n_desc"), // Changed description key
      items: [
        t("i18n_multi_language_support"), // New key
        t("i18n_locale_detection"), // New key
        t("i18n_translation_management"), // New key
        t("i18n_language_toggle"), // New key
      ],
    },
    {
      icon: <Palette className="h-5 w-5" />,
      title: t("feature_dark_mode_title"), // New key
      description: t("feature_dark_mode_desc"), // New key
      items: [
        t("dark_mode_comfortable_viewing"), // New key
        t("dark_mode_system_preference"), // New key
        t("dark_mode_theme_toggle"), // New key
      ],
    },
    {
      icon: <Lock className="h-5 w-5" />, // New icon
      title: t("feature_session_handling_title"), // New key
      description: t("feature_session_handling_desc"), // New key
      items: [
        t("session_handling_optimized"), // New key
        t("session_handling_secure_tokens"), // New key
        t("session_handling_revocation"), // New key
      ],
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: t("feature_auth_title"),
      description: t("feature_auth_desc"),
      items: [
        t("feature_email_auth"),
        t("feature_session_mgmt"),
        t("feature_role_access"),
        t("feature_account_linking"),
      ],
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: t("feature_user_mgmt_title"),
      description: t("feature_user_mgmt_desc"),
      items: [
        t("feature_user_reg"),
        t("feature_profile_mgmt"),
        t("feature_ban_users"),
        t("feature_session_revocation"),
        t("user_mgmt_initial_admin"), // New key
      ],
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: t("feature_db_title"),
      description: t("feature_db_desc"),
      items: [
        t("feature_postgresql"),
        t("feature_drizzle"),
        t("feature_type_safe"),
        t("feature_auto_migrations"),
      ],
    },
    {
      icon: <Monitor className="h-5 w-5" />, // Changed icon
      title: t("feature_ui_title"),
      description: t("feature_ui_desc"),
      items: [
        t("feature_tailwind"),
        t("feature_shadcn"),
        t("feature_mobile_responsive"),
      ],
    },
  ];

  const techStack = [
    t("tech_nextjs"),
    t("tech_better_auth"),
    t("tech_postgresql"),
    t("tech_drizzle"),
    t("tech_tailwind"),
    t("tech_shadcn"),
    t("tech_typescript"),
    t("tech_hook_form"),
    t("tech_zod"),
    t("tech_brevo_email_service"), // New key
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
            <CardTitle>{t("tech_stack_title")}</CardTitle>
            <CardDescription>{t("tech_stack_desc")}</CardDescription>
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
            {t("built_with")}{" "}
            <Link
              href="https://zexa.app"
              target="_blank"
              className="text-primary hover:underline font-medium"
            >
              Zexa
            </Link>{" "}
            &{" "}
            <Link
              href="https://denkhaus.dev" // Assuming a link for Denkhaus
              target="_blank"
              className="text-primary hover:underline font-medium"
            >
              Denkhaus
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
