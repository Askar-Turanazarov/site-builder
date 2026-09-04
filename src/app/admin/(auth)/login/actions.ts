"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, createSessionCookie } from "@/lib/auth";

export interface LoginFormState {
  error?: string;
}

export async function loginAction(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Введите email и пароль" };
  }

  const user = await verifyCredentials(email, password);
  if (!user) {
    return { error: "Неверный email или пароль" };
  }

  await createSessionCookie({ sub: user.id, email: user.email });
  redirect("/admin");
}
