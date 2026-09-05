"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, createSessionCookie } from "@/lib/auth";
import { LOGIN_RULE, clientKey, hit, reset } from "@/lib/rate-limit";

/** Коды ошибок, а не готовый текст: перевод подставляет форма входа. */
export type LoginError = "errorEmpty" | "errorInvalid" | "errorTooMany";

export interface LoginFormState {
  error?: LoginError;
}

export async function loginAction(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "errorEmpty" };
  }

  // Пароль один на весь проект, поэтому перебор — самый вероятный сценарий
  // атаки: ограничиваем число попыток с одного адреса.
  const key = await clientKey();
  if (!hit("login", key, LOGIN_RULE)) {
    return { error: "errorTooMany" };
  }

  const user = await verifyCredentials(email, password);
  if (!user) {
    return { error: "errorInvalid" };
  }

  reset("login", key);

  await createSessionCookie({ sub: user.id, email: user.email });

  // Возврат к тому, ради чего просили войти (например, к применению шаблона
  // с портала). Берём только внутренние адреса: значение приходит из формы.
  const next = String(formData.get("next") ?? "");
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/admin");
}
