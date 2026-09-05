"use client";

import { useTransition } from "react";
import { clearContactMessagesAction, deleteContactMessageAction } from "@/lib/actions/messages";

export interface MessageItem {
  id: string;
  locale: string;
  pageSlug: string | null;
  createdAt: string;
  fields: { label: string; value: string }[];
}

export function MessageList({
  messages,
  labels,
}: {
  messages: MessageItem[];
  labels: { empty: string; delete: string; clear: string; page: string };
}) {
  const [pending, startTransition] = useTransition();

  if (messages.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-surface px-5 py-8 text-center text-sm text-muted">
        {labels.empty}
      </p>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {messages.map((message) => (
          <article key={message.id} className="rounded-lg border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <time dateTime={message.createdAt}>
                  {new Date(message.createdAt).toLocaleString("ru-RU")}
                </time>
                <span className="rounded bg-paper px-1.5 py-0.5 uppercase">{message.locale}</span>
                {message.pageSlug && (
                  <span>
                    {labels.page}: /{message.pageSlug}
                  </span>
                )}
              </div>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    await deleteContactMessageAction(message.id);
                  })
                }
                className="text-xs text-danger hover:underline disabled:opacity-60"
              >
                {labels.delete}
              </button>
            </div>

            <dl className="mt-3 space-y-1.5">
              {message.fields.map((field, i) => (
                <div key={i} className="grid gap-1 sm:grid-cols-[10rem_1fr]">
                  <dt className="text-xs font-medium text-muted">{field.label}</dt>
                  <dd className="text-sm whitespace-pre-line text-ink">{field.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await clearContactMessagesAction();
          })
        }
        className="mt-5 rounded-md border border-border px-4 py-2 text-sm text-ink-soft hover:border-danger hover:text-danger disabled:opacity-60"
      >
        {labels.clear}
      </button>
    </>
  );
}
