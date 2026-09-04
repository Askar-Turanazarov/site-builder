"use client";

import { useActionState } from "react";
import { loginAction, type LoginFormState } from "./actions";

const initialState: LoginFormState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-accent text-surface font-display font-bold">
            S
          </div>
          <h1 className="font-display text-xl font-semibold text-ink">Site Builder</h1>
          <p className="mt-1 text-sm text-muted">Вход в панель администратора</p>
        </div>

        <form action={formAction} className="rounded-lg border border-border bg-surface p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-soft">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                required
                className="w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-soft">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="••••••••"
              />
            </div>
          </div>

          {state.error && (
            <p className="mt-4 rounded-md bg-danger-tint px-3 py-2 text-sm text-danger">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-6 w-full rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface transition hover:bg-accent-strong disabled:opacity-60"
          >
            {pending ? "Входим…" : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
