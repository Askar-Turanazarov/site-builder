"use client";

import { useAdminT } from "@/components/admin/AdminI18nProvider";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upsertDictionaryEntryAction, deleteDictionaryEntryAction } from "@/lib/actions/dictionary";

interface Entry {
  key: string;
  valueRu: string;
  valueUz: string;
  valueEn: string;
  group: string;
}

const GROUP_LABELS = {
  nav: "dictionary.groupNav",
  buttons: "dictionary.groupButtons",
  forms: "dictionary.groupForms",
  footer: "dictionary.groupFooter",
  messages: "dictionary.groupMessages",
  general: "dictionary.groupGeneral",
} as const;

export function DictionaryTable({ entries }: { entries: Entry[] }) {
  const t = useAdminT();

  const groups = groupBy(entries, (e) => e.group);
  const groupOrder = ["nav", "buttons", "forms", "footer", "messages", "general"].filter((g) => groups[g]);
  for (const g of Object.keys(groups)) {
    if (!groupOrder.includes(g)) groupOrder.push(g);
  }

  return (
    <div className="space-y-8">
      {groupOrder.map((group) => (
        <div key={group}>
          <h2 className="mb-2 font-display text-sm font-semibold text-ink-soft">
            {group in GROUP_LABELS ? t(GROUP_LABELS[group as keyof typeof GROUP_LABELS]) : group}
          </h2>
          <div className="divide-y divide-border rounded-lg border border-border bg-surface">
            {groups[group].map((entry) => (
              <Row key={entry.key} entry={entry} />
            ))}
          </div>
        </div>
      ))}
      <NewEntryForm />
    </div>
  );
}

function Row({ entry }: { entry: Entry }) {
  const t = useAdminT();

  const router = useRouter();
  const [valueRu, setValueRu] = useState(entry.valueRu);
  const [valueUz, setValueUz] = useState(entry.valueUz);
  const [valueEn, setValueEn] = useState(entry.valueEn);
  const [pending, startTransition] = useTransition();
  const dirty = valueRu !== entry.valueRu || valueUz !== entry.valueUz || valueEn !== entry.valueEn;

  function save() {
    startTransition(async () => {
      await upsertDictionaryEntryAction({ key: entry.key, valueRu, valueUz, valueEn, group: entry.group });
      router.refresh();
    });
  }

  function remove() {
    if (!window.confirm(`${t("dictionary.confirmDelete")} ${entry.key}`)) return;
    startTransition(async () => {
      await deleteDictionaryEntryAction(entry.key);
      router.refresh();
    });
  }

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center gap-3 px-4 py-2.5">
      <code className="truncate text-xs text-muted">{entry.key}</code>
      <input value={valueRu} onChange={(e) => setValueRu(e.target.value)} className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm text-ink outline-none focus:border-accent" />
      <input value={valueUz} onChange={(e) => setValueUz(e.target.value)} className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm text-ink outline-none focus:border-accent" />
      <input value={valueEn} onChange={(e) => setValueEn(e.target.value)} className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm text-ink outline-none focus:border-accent" />
      <div className="flex gap-1">
        <button
          type="button"
          onClick={save}
          disabled={!dirty || pending}
          className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-ink hover:border-accent disabled:opacity-40"
        >
          {t("common.save")}
        </button>
        <button type="button" onClick={remove} className="rounded-md px-2 py-1.5 text-xs text-muted hover:text-danger">
          ✕
        </button>
      </div>
    </div>
  );
}

function NewEntryForm() {
  const t = useAdminT();

  const router = useRouter();
  const [key, setKey] = useState("");
  const [group, setGroup] = useState("general");
  const [valueRu, setValueRu] = useState("");
  const [valueUz, setValueUz] = useState("");
  const [valueEn, setValueEn] = useState("");
  const [pending, startTransition] = useTransition();

  function submit() {
    if (!key.trim()) return;
    startTransition(async () => {
      await upsertDictionaryEntryAction({ key: key.trim(), valueRu, valueUz, valueEn, group });
      setKey("");
      setValueRu("");
      setValueUz("");
      setValueEn("");
      router.refresh();
    });
  }

  return (
    <div className="rounded-lg border border-dashed border-border p-4">
      <h2 className="mb-3 text-sm font-semibold text-ink-soft">{t("dictionary.addKey")}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="nav.contact" className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent" />
        <select value={group} onChange={(e) => setGroup(e.target.value)} className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent">
          {Object.keys(GROUP_LABELS).map((g) => (
            <option key={g} value={g}>
              {t(GROUP_LABELS[g as keyof typeof GROUP_LABELS])}
            </option>
          ))}
        </select>
        <input value={valueRu} onChange={(e) => setValueRu(e.target.value)} placeholder="RU" className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent" />
        <input value={valueUz} onChange={(e) => setValueUz(e.target.value)} placeholder="UZ" className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent" />
        <input value={valueEn} onChange={(e) => setValueEn(e.target.value)} placeholder="EN" className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent" />
      </div>
      <button
        type="button"
        onClick={submit}
        disabled={pending}
        className="mt-3 rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-surface hover:bg-accent-strong disabled:opacity-60"
      >
        {t("common.add")}
      </button>
    </div>
  );
}

function groupBy<T>(arr: T[], fn: (item: T) => string): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const key = fn(item);
    (acc[key] ??= []).push(item);
    return acc;
  }, {});
}
