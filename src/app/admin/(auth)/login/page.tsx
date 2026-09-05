import { getAdminT } from "@/lib/admin-i18n/server";
import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const [t, { next }] = await Promise.all([getAdminT(), searchParams]);

  return (
    <LoginForm
      next={next && next.startsWith("/") && !next.startsWith("//") ? next : undefined}
      labels={{
        subtitle: t("login.subtitle"),
        email: t("login.email"),
        password: t("login.password"),
        submit: t("login.submit"),
        submitting: t("login.submitting"),
        errorEmpty: t("login.errorEmpty"),
        errorInvalid: t("login.errorInvalid"),
        errorTooMany: t("login.errorTooMany"),
      }}
    />
  );
}
