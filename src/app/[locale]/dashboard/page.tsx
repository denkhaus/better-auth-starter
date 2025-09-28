import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Users, Mail, Settings, Code } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

const DashboardPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "common" });

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
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Quick Actions */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {t("quick_actions")}
            </CardTitle>
            <CardDescription>{t("quick_actions_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2"
                asChild
              >
                <Link href="/auth/register">
                  <Users className="h-5 w-5" />
                  <span>{t("create_account")}</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2"
                asChild
              >
                <Link href="/admin">
                  <Shield className="h-5 w-5" />
                  <span>{t("admin_panel")}</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2"
                asChild
              >
                <Link
                  href="https://github.com/zexahq/better-auth-starter"
                  target="_blank"
                >
                  <Code className="h-5 w-5" />
                  <span>{t("view_source")}</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2"
                asChild
              >
                <Link href="https://docs.zexa.dev" target="_blank">
                  <Mail className="h-5 w-5" />
                  <span>{t("documentation")}</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle>{t("tech_stack_title")}</CardTitle>
            <CardDescription>{t("tech_stack_description")}</CardDescription>
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
              href="https://zexa.dev"
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

export default DashboardPage;
