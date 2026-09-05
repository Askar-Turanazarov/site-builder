import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveMedia } from "../context";
import { resolveHref } from "../links";
import { CX, cx } from "../classes";

export function HeroBlock({ data, ctx }: { data: BlockDataOf<"hero">; ctx: RenderContext }) {
  const media = resolveMedia(ctx, data.imageMediaId);
  const isFullBleed = data.variant === "fullBleed";
  const isCentered = data.variant === "centered";
  const isSplit = data.variant === "split";
  // Белый текст оправдан только поверх картинки с затемнением. Без картинки
  // фон секции — обычная бумага темы, и белые буквы на ней не читались бы
  // (в шаблонах медиа нет вовсе, а на живом сайте её может не быть ещё).
  const onImage = isFullBleed && !!media;

  return (
    <section
      className={cx(
        "relative overflow-hidden bg-[var(--tpl-paper)]",
        isFullBleed ? "flex min-h-[520px] items-end" : CX.section,
      )}
    >
      {isFullBleed && media && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.url}
            alt={media.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-[var(--tpl-ink)]"
            style={{ opacity: data.overlayOpacity }}
          />
        </>
      )}
      <div className={cx(CX.container, "relative", isFullBleed && "pt-40 pb-16")}>
        <div
          className={cx(
            isCentered && "mx-auto max-w-3xl text-center",
            isSplit && "grid items-center gap-12 lg:grid-cols-2",
          )}
        >
          <div>
            {data.heading && (
              <h1 className={cx(CX.h1, onImage && "text-white")}>{data.heading}</h1>
            )}
            {data.subheading && (
              <p
                className={cx(
                  CX.lead,
                  "mt-5",
                  onImage && "text-white/85",
                  isCentered && "mx-auto",
                )}
              >
                {data.subheading}
              </p>
            )}
            {data.ctaLabel && (
              <div className={cx("mt-8", isCentered && "flex justify-center")}>
                <a href={resolveHref(data.ctaLink, ctx.locale, ctx.linkBase)} className={cx(CX.button, CX.buttonSolid)}>
                  {data.ctaLabel}
                </a>
              </div>
            )}
          </div>
          {isSplit && media && (
            <div className="overflow-hidden rounded-[var(--tpl-radius)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media.url} alt={media.alt} className="h-full w-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
