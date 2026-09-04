"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

/**
 * Constrained WYSIWYG (bold/italic/links/lists/headings only, per the
 * design plan) backing every "richtext" FieldSpec. Its output HTML is
 * embedded directly by the live block components (dangerouslySetInnerHTML)
 * and by the static-export generators, so keep the allowed marks limited
 * to what src/styles/prose.css actually styles.
 */
export function RichTextField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false,
        code: false,
        blockquote: false,
        horizontalRule: false,
      }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "prose-content min-h-[120px] px-3 py-2.5 text-sm outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Keep editor content in sync when the active locale changes underneath it
  // (same DOM node, different `value` prop) — TipTap doesn't watch props.
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `rounded px-2 py-1 text-xs font-semibold ${active ? "bg-accent-tint text-accent-strong" : "text-ink-soft hover:bg-paper"}`;

  return (
    <div className="rounded-md border border-border bg-surface focus-within:border-accent">
      <div className="flex flex-wrap gap-0.5 border-b border-border px-1.5 py-1">
        <button type="button" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>
          Ж
        </button>
        <button type="button" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <span className="italic">К</span>
        </button>
        <button type="button" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>
        <button type="button" className={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </button>
        <button type="button" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • Список
        </button>
        <button type="button" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. Список
        </button>
        <button
          type="button"
          className={btn(editor.isActive("link"))}
          onClick={() => {
            const url = window.prompt("Ссылка (URL):", editor.getAttributes("link").href ?? "https://");
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().unsetLink().run();
            } else {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          Ссылка
        </button>
      </div>
      <EditorContent editor={editor} placeholder={placeholder} />
    </div>
  );
}
