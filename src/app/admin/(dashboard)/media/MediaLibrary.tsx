"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteMediaAction, updateMediaAltAction, uploadMediaAction, type UploadMediaState } from "@/lib/actions/media";
import { useAdminT } from "@/components/admin/AdminI18nProvider";

interface MediaRow {
  id: string;
  path: string;
  filename: string;
  size: number;
  altRu: string | null;
  altUz: string | null;
  altEn: string | null;
}

export function MediaLibrary({ initialMedia }: { initialMedia: MediaRow[] }) {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const t = useAdminT();
  const [uploadState, setUploadState] = useState<UploadMediaState>({});
  const [uploading, startUploading] = useTransition();

  const active = initialMedia.find((m) => m.id === activeId) ?? null;

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.set("file", file);
    startUploading(async () => {
      const result = await uploadMediaAction({}, formData);
      setUploadState(result);
      router.refresh();
    });
    e.target.value = "";
  }

  function handleDelete(id: string) {
    if (!window.confirm(t("media.confirmDelete"))) return;
    startTransition(async () => {
      await deleteMediaAction(id);
      if (activeId === id) setActiveId(null);
      router.refresh();
    });
  }

  function handleSaveAlt(id: string, alt: { altRu: string; altUz: string; altEn: string }) {
    startTransition(async () => {
      await updateMediaAltAction(id, alt);
      router.refresh();
    });
  }

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">{t("media.title")}</h1>
          <p className="mt-1 text-sm text-muted">{t("media.subtitle")}</p>
        </div>
        <label className="cursor-pointer rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface hover:bg-accent-strong">
          {uploading ? t("media.uploading") : t("media.upload")}
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
      {uploadState.error && <p className="mt-3 text-sm text-danger">{t(uploadState.error)}</p>}

      <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {initialMedia.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setActiveId(m.id)}
            className="text-left"
          >
            <div className="aspect-square overflow-hidden rounded-md border border-border bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/uploads/${m.path}`} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="mt-1 truncate text-xs text-muted">{m.filename}</div>
          </button>
        ))}
        {initialMedia.length === 0 && (
          <p className="col-span-4 py-8 text-center text-sm text-muted">{t("media.empty")}</p>
        )}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6" onClick={() => setActiveId(null)}>
          <div className="w-full max-w-lg rounded-lg bg-surface p-5 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-ink">{active.filename}</h2>
              <button type="button" onClick={() => setActiveId(null)} className="rounded-md p-1.5 text-muted hover:bg-paper">
                ✕
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/uploads/${active.path}`} alt="" className="max-h-64 w-full rounded-md object-contain" />
            <AltForm media={active} onSave={handleSaveAlt} />
            <button
              type="button"
              disabled={pending}
              onClick={() => handleDelete(active.id)}
              className="mt-4 rounded-md border border-border px-3 py-1.5 text-sm text-danger hover:border-danger"
            >
              {t("media.deleteFile")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AltForm({
  media,
  onSave,
}: {
  media: MediaRow;
  onSave: (id: string, alt: { altRu: string; altUz: string; altEn: string }) => void;
}) {
  const t = useAdminT();
  const [altRu, setAltRu] = useState(media.altRu ?? "");
  const [altUz, setAltUz] = useState(media.altUz ?? "");
  const [altEn, setAltEn] = useState(media.altEn ?? "");

  return (
    <div className="mt-4 space-y-2">
      <p className="text-xs font-semibold text-muted">{t("media.altTitle")}</p>
      <input value={altRu} onChange={(e) => setAltRu(e.target.value)} placeholder="RU" className="w-full rounded-md border border-border bg-paper px-3 py-1.5 text-sm text-ink outline-none focus:border-accent" />
      <input value={altUz} onChange={(e) => setAltUz(e.target.value)} placeholder="UZ" className="w-full rounded-md border border-border bg-paper px-3 py-1.5 text-sm text-ink outline-none focus:border-accent" />
      <input value={altEn} onChange={(e) => setAltEn(e.target.value)} placeholder="EN" className="w-full rounded-md border border-border bg-paper px-3 py-1.5 text-sm text-ink outline-none focus:border-accent" />
      <button
        type="button"
        onClick={() => onSave(media.id, { altRu, altUz, altEn })}
        className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-ink hover:border-accent"
      >
        {t("media.saveAlt")}
      </button>
    </div>
  );
}
