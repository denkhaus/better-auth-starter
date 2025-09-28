import { useTranslations } from "next-intl";

/**
 * Better-Auth Internationalization Wrapper
 * Provides internationalized versions of Better-Auth components
 */
const useAuthI18n = () => {
  const t = useTranslations("auth");

  // These are the translated labels for auth components
  const authLabels = {
    // Form labels
    email: t("email"),
    password: t("password"),
    confirmPassword: t("confirm_password"),

    // Button text
    signIn: t("sign_in"),
    signUp: t("sign_up"),
    forgotPassword: t("forgot_password"),

    // Links
    alreadyHaveAccount: t("already_have_account"),
    noAccount: t("no_account"),
    createAccount: t("create_account"),

    // Dynamic content (with provider parameter)
    signInWith: (provider: string) => t("sign_in_with", { provider }),
    continueWith: (provider: string) => t("continue_with", { provider }),
  };

  // Return only the labels since we can't access better-auth client hooks directly
  return {
    labels: authLabels,
  };
};

// Export the hook
export { useAuthI18n };

// Export a wrapper component for sign-in
export const SignInI18n = () => {
  const t = useTranslations("auth");

  // In a real implementation, this would wrap the Better Auth sign in component
  // with translated labels, but Better Auth may not have direct support for
  // translation injection. We'll need to handle this at the UI level.

  return {
    emailLabel: t("email"),
    passwordLabel: t("password"),
    signInText: t("sign_in"),
    forgotPasswordText: t("forgot_password"),
    noAccountText: t("no_account"),
    createAccountText: t("create_account"),
  };
};

// Export a wrapper component for sign-up
export const SignUpI18n = () => {
  const t = useTranslations("auth");

  return {
    emailLabel: t("email"),
    passwordLabel: t("password"),
    confirmPasswordLabel: t("confirm_password"),
    signUpText: t("sign_up"),
    alreadyHaveAccountText: t("already_have_account"),
    signInText: t("sign_in"),
  };
};
