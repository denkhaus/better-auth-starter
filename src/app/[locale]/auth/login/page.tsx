"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/auth/login-form";
import { Card, CardContent } from "@/components/ui/card";
import { GoogleIcon, GithubIcon } from "@/components/ui/icons";
import { signInWithGithub, signInWithGoogle } from "@/lib/auth-client";
import { useTranslations } from 'next-intl';

const LoginPage = () => {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-md gap-6">
        <Card className="w-full">
          <CardContent className="flex flex-col gap-4 pt-6">
            <LoginForm />
            <div className="flex items-center my-2">
              <div className="flex-1 h-px bg-muted-foreground/30" />
              <span className="mx-3 text-muted-foreground text-xs font-medium">
                {tCommon('or')}
              </span>
              <div className="flex-1 h-px bg-muted-foreground/30" />
            </div>
            <div className="flex flex-row gap-2 w-full">
              <Button
                variant="outline"
                className="w-1/2 flex items-center justify-center cursor-pointer"
                type="button"
                onClick={signInWithGoogle}
              >
                <GoogleIcon className="mr-2" />
                {t('sign_in_with', {provider: 'Google'})}
              </Button>
              <Button
                variant="outline"
                className="w-1/2 flex items-center justify-center cursor-pointer"
                type="button"
                onClick={signInWithGithub}
              >
                <GithubIcon className="mr-2" />
                {t('sign_in_with', {provider: 'GitHub'})}
              </Button>
            </div>
            <div className="text-center text-sm mt-4">
              {t('no_account')}{" "}
              <Link
                href="/auth/register"
                className="text-primary underline hover:no-underline font-medium"
              >
                {t('create_account')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;