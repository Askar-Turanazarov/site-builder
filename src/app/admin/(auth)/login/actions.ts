"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, createSessionCookie } from "@/lib/auth";

/** Коды ошибок, а не готовый текст: перевод подставляет форма входа. */
export type LoginError = "errorEmpty" | "errorInvalid";

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

  const user = await verifyCredentials(email, password);
  if (!user) {
    return { error: "errorInvalid" };
  }

  await createSessionCookie({ sub: user.id, email: user.email });
  redirect("/admin");
}
