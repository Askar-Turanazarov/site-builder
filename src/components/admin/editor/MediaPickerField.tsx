"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { listMediaAction, uploadMediaAction, type UploadMediaState } from "@/lib/actions/media";
import { useAdminT } from "@/components/admin/AdminI18nProvider";

interface MediaRow {
  id: string;
  path: string;
  filename: string;
}

export function MediaPickerField({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (mediaId: string | null) => void;
}) {
  const t = useAdminT();
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [loading, startLoading] = useTransition();
  const [uploadState, setUploadState] = useState<UploadMediaState>({});
  const [uploading, startUploading] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function refresh() {
    startLoading(async () => {
      const rows = await listMediaAction();
      setMedia(rows);
    });
  }

  useEffect(() => {
    refresh();
  }, []);

  const selected = media.find((m) => m.id === value) ?? null;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.set("file", file);
    startUploading(async () => {
      const result = await uploadMediaAction({}, formData);
      setUploadState(result);
      if (result.mediaId) {
        onChange(result.mediaId);
        refresh();
        setOpen(false);
      }
    });
    e.target.value = "";
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-paper">
          {selected ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/uploads/${selected.path}`} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-muted">{t("field.noFile")}</span>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink hover:border-accent"
          >
            {t("field.chooseImage")}
          </button>
          {selected && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-left text-xs text-muted hover:text-danger"
            >
              {t("field.removeImage")}
            </button>
          )}
        </div>
      </div>

      {open && (
        <div className="mt-3 rounded-md border border-border bg-surface p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-ink-soft">{t("field.mediaLibrary")}</span>
            <label className="cursor-pointer rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-surface hover:bg-accent-strong">
              {uploading ? t("media.uploading") : t("media.upload")}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          </div>
          {uploadState.error && <p className="mb-2 text-xs text-danger">{t(uploadState.error)}</p>}
          {loading && <p className="text-xs text-muted">{t("common.loading")}</p>}
          <div className="grid max-h-64 grid-cols-4 gap-2 overflow-y-auto">
            {media.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  onChange(m.id);
                  setOpen(false);
                }}
                className={`aspect-square overflow-hidden rounded-md border-2 ${
                  m.id === value ? "border-accent" : "border-transparent"
                }`}
                title={m.filename}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/uploads/${m.path}`} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
            {media.length === 0 && !loading && (
              <p className="col-span-4 text-xs text-muted">{t("media.empty")}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
