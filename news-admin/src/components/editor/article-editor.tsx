"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export default function ArticleEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: "<p>Start writing your article...</p>",
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Enter URL");

    if (!url) return;

    editor
      .chain()
      .focus()
      .setLink({ href: url })
      .run();
  };

  const addImage = () => {
    const url = window.prompt("Paste Image URL");

    if (!url) return;

    editor
      .chain()
      .focus()
      .setImage({ src: url })
      .run();
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">

      {/* Toolbar */}
      <div className="border-b p-3 flex flex-wrap gap-2">

        <button
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className="px-3 py-1 border rounded"
        >
          Bold
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className="px-3 py-1 border rounded"
        >
          Italic
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className="px-3 py-1 border rounded"
        >
          Underline
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="px-3 py-1 border rounded"
        >
          H1
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-3 py-1 border rounded"
        >
          H2
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="px-3 py-1 border rounded"
        >
          List
        </button>

        <button
          onClick={addLink}
          className="px-3 py-1 border rounded"
        >
          Link
        </button>

        <button
          onClick={() => {
            const event = new CustomEvent("open-media-library");
            window.dispatchEvent(event);
          }}
          className="px-3 py-1 border rounded"
        >
          Media Library
        </button>

      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[400px]"
      />
    </div>
  );
}