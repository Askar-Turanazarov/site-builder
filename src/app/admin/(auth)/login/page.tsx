import { getAdminT } from "@/lib/admin-i18n/server";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  const t = await getAdminT();

  return (
    <LoginForm
      labels={{
        subtitle: t("login.subtitle"),
        email: t("login.email"),
        password: t("login.password"),
        submit: t("login.submit"),
        submitting: t("login.submitting"),
        errorEmpty: t("login.errorEmpty"),
        errorInvalid: t("login.errorInvalid"),
      }}
    />
  );
}
