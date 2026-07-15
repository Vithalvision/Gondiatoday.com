"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

import Embed, { detectProvider } from "./EmbedExtension";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Globe,
  Undo,
  Redo,
} from "lucide-react";

export type EditorMethods = {
  editor?: any;
  insertImage?: (url: string) => void;
  insertHtml?: (html: string) => void;
  insertEmbed?: (url: string) => void;
  getHTML?: () => string;
  setHTML?: (html: string) => void;
};

/**
 * Loads Instagram's embed.js once per page so pasted reels can render
 * their native player instead of staying a static placeholder.
 */
function useInstagramEmbedScript() {
  useEffect(() => {
    const existing = document.getElementById("instagram-embed-script");

    if (existing) {
      (window as any).instgrm?.Embeds?.process?.();
      return;
    }

    const script = document.createElement("script");
    script.id = "instagram-embed-script";
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
}

const WordPressEditor = forwardRef(function WordPressEditor(_, ref) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [showEmbedInput, setShowEmbedInput] = useState(false);
  const [embedUrl, setEmbedUrl] = useState("");

  const [uploading, setUploading] = useState(false);

  const imageFileInputRef = useRef<HTMLInputElement | null>(null);

  useInstagramEmbedScript();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Underline,

      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),

      Image.configure({
        HTMLAttributes: {
          class:
            "rounded-lg max-w-full h-auto my-4 shadow-sm border border-gray-200",
        },
      }),

      Embed,
    ],

    content: "<p></p>",

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[500px] px-8 py-6 focus:outline-none prose-img:rounded-lg prose-img:shadow-sm",
      },
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      editor,

      insertImage: (url: string) => {
        editor?.chain().focus().setImage({ src: url }).run();
      },

      // Kept for backwards compatibility with any existing callers,
      // but plain links no longer cover video/reel URLs — see insertEmbed.
      insertHtml: (html: string) => {
        editor?.commands.insertContent(html);
      },

      insertEmbed: (url: string) => {
        if (!editor) return;

        const provider = detectProvider(url);

        if (provider === "unknown") {
          // Not a recognized YouTube/Instagram URL — fall back to a normal link
          // so the page still gets something useful out of the input.
          editor
            .chain()
            .focus()
            .insertContent(
              `<p><a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a></p>`
            )
            .run();
          return;
        }

        (editor.commands as any).insertEmbed(url);
      },

      getHTML: () => {
        return editor?.getHTML() || "";
      },

      setHTML: (html: string) => {
        editor?.commands.setContent(html || "<p></p>");
      },
    }),
    [editor]
  );

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  if (!editor) return null;

  const openLinkInput = () => {
    const previousUrl = editor.getAttributes("link").href as
      | string
      | undefined;

    setLinkUrl(previousUrl || "");
    setShowImageInput(false);
    setShowLinkInput(true);
  };

  const applyLink = () => {
    if (!linkUrl.trim()) {
      setShowLinkInput(false);
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: linkUrl.trim(),
      })
      .run();

    setLinkUrl("");
    setShowLinkInput(false);
  };

  const removeLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowLinkInput(false);
    setLinkUrl("");
  };

  const openImageInput = () => {
    setShowLinkInput(false);
    setShowImageInput(true);
  };

  const applyImageUrl = () => {
    if (!imageUrl.trim()) {
      setShowImageInput(false);
      return;
    }

    editor.chain().focus().setImage({ src: imageUrl.trim() }).run();

    setImageUrl("");
    setShowImageInput(false);
  };
  const openEmbedInput = () => {
  setShowLinkInput(false);
  setShowImageInput(false);
  setShowEmbedInput(true);
};

const applyEmbed = () => {
  if (!embedUrl.trim()) {
    setShowEmbedInput(false);
    return;
  }

  (editor.commands as any).insertEmbed(embedUrl.trim());

  setEmbedUrl("");
  setShowEmbedInput(false);
};
  const triggerImageUpload = () => {
    imageFileInputRef.current?.click();
  };

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();

      if (data?.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
      }
    } catch (error) {
      console.error("Image upload error:", error);
    } finally {
      setUploading(false);
      setShowImageInput(false);

      if (imageFileInputRef.current) {
        imageFileInputRef.current.value = "";
      }
    }
  };

  const ToolbarButton = ({
    onClick,
    active,
    disabled,
    title,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={!!active}
      className={`p-2 rounded transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:bg-gray-200"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );

  return (
    <div className="relative border rounded-xl bg-white shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 border-b bg-gray-50 px-3 py-2">
        <ToolbarButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <ToolbarButton
          title="Heading 1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <ToolbarButton
          title="Bullet List"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Numbered List"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <ToolbarButton
          title="Add Link"
          active={editor.isActive("link")}
          onClick={openLinkInput}
        >
          <LinkIcon size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Remove Link"
          disabled={!editor.isActive("link")}
          onClick={removeLink}
        >
          <Unlink size={16} />
        </ToolbarButton>

        <ToolbarButton title="Insert Image" onClick={openImageInput}>
          <ImageIcon size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Embed Social Media"
          onClick={openEmbedInput}
        >
          <Globe size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <ToolbarButton
          title="Undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo size={16} />
        </ToolbarButton>
      </div>

      {showLinkInput && (
        <div className="absolute top-12 left-3 z-20 bg-white border shadow-lg p-3 rounded-lg flex gap-2 items-center">
          <input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="border px-2 py-1 rounded text-sm w-56"
          />

          <button
            type="button"
            onClick={applyLink}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Apply
          </button>
        </div>
      )}

      {showImageInput && (
        <div className="absolute top-12 left-3 z-20 bg-white border shadow-lg p-3 rounded-lg flex flex-col gap-2 w-72">
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image URL..."
            className="border px-2 py-1 rounded text-sm"
          />

          <button
            type="button"
            onClick={applyImageUrl}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Insert URL
          </button>

          <button
            type="button"
            onClick={triggerImageUpload}
            disabled={uploading}
            className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm"
          >
            {uploading ? "Uploading..." : "Upload from device"}
          </button>
        </div>
      )}
      {showEmbedInput && (
        <div className="absolute top-12 left-3 z-20 bg-white border shadow-lg p-3 rounded-lg flex flex-col gap-2 w-80">
          <input
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
            placeholder="Paste YouTube or Instagram URL..."
            className="border px-2 py-1 rounded text-sm"
          />

          <button
            type="button"
            onClick={applyEmbed}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Insert Embed
          </button>
        </div>
      )}

      <input
        type="file"
        ref={imageFileInputRef}
        onChange={handleImageFileChange}
        accept="image/*"
        className="hidden"
      />

      <BubbleMenu
        {...({
          editor,
          tippyOptions: { duration: 100 },
        } as any)}
      >
        <div className="flex gap-2 bg-black text-white px-2 py-1 rounded-lg shadow-lg">
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            B
          </button>

          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            I
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            H2
          </button>
        </div>
      </BubbleMenu>

      <EditorContent editor={editor} />
    </div>
  );
});

export default WordPressEditor;