"use client";

import { useActionState } from "react";
import { loginAction, type LoginFormState } from "./actions";
import { LogoMark } from "@/components/brand/Logo";

const initialState: LoginFormState = {};

/**
 * Экран входа лежит вне (dashboard), где живёт AdminI18nProvider, поэтому
 * подписи приходят пропом из серверной страницы, а не из контекста.
 */
export interface LoginLabels {
  subtitle: string;
  email: string;
  password: string;
  submit: string;
  submitting: string;
  errorEmpty: string;
  errorInvalid: string;
  errorTooMany: string;
}

export function LoginForm({ labels, next }: { labels: LoginLabels; next?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <LogoMark className="mx-auto mb-4 h-11 w-11" />
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
            Site<span className="text-accent">Go</span>
          </h1>
          <p className="mt-1.5 text-sm text-muted">{labels.subtitle}</p>
        </div>

        <form action={formAction} className="card rounded-3xl bg-surface p-6 shadow-surface">
          {next && <input type="hidden" name="next" value={next} />}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-soft">
                {labels.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                required
                className="input w-full"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-soft">
                {labels.password}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input w-full"
                placeholder="••••••••"
              />
            </div>
          </div>

          {state.error && (
            <p className="mt-4 rounded-2xl bg-danger-soft px-3.5 py-2.5 text-sm text-danger-soft-foreground">
              {labels[state.error]}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="button button--primary mt-6 w-full bg-accent text-accent-foreground hover:bg-accent-hover"
          >
            {pending ? labels.submitting : labels.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
