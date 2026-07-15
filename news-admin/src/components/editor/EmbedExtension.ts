import { Node, mergeAttributes } from "@tiptap/core";

export type EmbedProvider = "youtube" | "instagram" | "unknown";

export interface EmbedOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    embed: {
      /**
       * Insert a video/reel embed block from a raw URL.
       * Detects YouTube / Instagram automatically.
       */
      insertEmbed: (url: string) => ReturnType;
    };
  }
}

/**
 * Extracts a YouTube video ID from any common URL shape:
 * youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID
 */
export function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");

    if (host === "youtu.be") {
      return u.pathname.slice(1).split("/")[0] || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") {
        return u.searchParams.get("v");
      }
      if (u.pathname.startsWith("/shorts/")) {
        return u.pathname.split("/")[2] || null;
      }
      if (u.pathname.startsWith("/embed/")) {
        return u.pathname.split("/")[2] || null;
      }
      if (u.pathname.startsWith("/live/")) {
        return u.pathname.split("/")[2] || null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Matches instagram.com/reel/ID, /p/ID, /tv/ID
 */
export function isInstagramUrl(url: string): boolean {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");
    return (
      host === "instagram.com" &&
      (u.pathname.startsWith("/reel/") ||
        u.pathname.startsWith("/p/") ||
        u.pathname.startsWith("/tv/"))
    );
  } catch {
    return false;
  }
}

export function detectProvider(url: string): EmbedProvider {
  if (getYouTubeId(url)) return "youtube";
  if (isInstagramUrl(url)) return "instagram";
  return "unknown";
}

export const Embed = Node.create<EmbedOptions>({
  name: "embed",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      url: {
        default: null,
      },
      provider: {
        default: "unknown",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="embed"]',
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) return false;
          return {
            url: el.getAttribute("data-url"),
            provider: el.getAttribute("data-provider") || "unknown",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const { url, provider } = node.attrs;

    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "embed",
        "data-url": url,
        "data-provider": provider,
      }),
    ];
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const { url, provider } = node.attrs as {
        url: string;
        provider: EmbedProvider;
      };

      const wrapper = document.createElement("div");
      wrapper.setAttribute("data-type", "embed");
      wrapper.setAttribute("data-url", url || "");
      wrapper.setAttribute("data-provider", provider);
      wrapper.contentEditable = "false";
      wrapper.className = "wp-embed-wrapper my-4 select-none";

      const card = document.createElement("div");
      card.className =
        "rounded-lg border border-gray-200 bg-gray-50 overflow-hidden";

      if (provider === "youtube") {
        const videoId = getYouTubeId(url);

        const frameWrap = document.createElement("div");
        frameWrap.className = "relative w-full";
        frameWrap.style.aspectRatio = "16 / 9";

        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.className = "absolute inset-0 w-full h-full";
        iframe.style.border = "0";
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";

        frameWrap.appendChild(iframe);
        card.appendChild(frameWrap);

        const footer = document.createElement("div");
        footer.className =
          "flex items-center justify-between px-3 py-2 bg-white border-t border-gray-200";

        const label = document.createElement("span");
        label.className = "text-xs text-gray-500";
        label.textContent = "YouTube video";

        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Watch on YouTube ↗";
        link.className =
          "text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline";

        footer.appendChild(label);
        footer.appendChild(link);
        card.appendChild(footer);
      } else if (provider === "instagram") {
        const igWrap = document.createElement("div");
        igWrap.className = "flex justify-center bg-white py-2";

        const blockquote = document.createElement("blockquote");
        blockquote.className = "instagram-media";
        blockquote.setAttribute("data-instgrm-permalink", url);
        blockquote.setAttribute("data-instgrm-version", "14");
        blockquote.style.maxWidth = "540px";
        blockquote.style.minWidth = "326px";
        blockquote.style.width = "100%";

        igWrap.appendChild(blockquote);
        card.appendChild(igWrap);

        const footer = document.createElement("div");
        footer.className =
          "flex items-center justify-between px-3 py-2 bg-white border-t border-gray-200";

        const label = document.createElement("span");
        label.className = "text-xs text-gray-500";
        label.textContent = "Instagram reel";

        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "View on Instagram ↗";
        link.className =
          "text-xs font-medium text-pink-600 hover:text-pink-700 hover:underline";

        footer.appendChild(label);
        footer.appendChild(link);
        card.appendChild(footer);

        // Ask Instagram's embed script to process this block once it's mounted.
        requestAnimationFrame(() => {
          (window as any).instgrm?.Embeds?.process?.();
        });
      } else {
        const fallback = document.createElement("a");
        fallback.href = url;
        fallback.target = "_blank";
        fallback.rel = "noopener noreferrer";
        fallback.textContent = url;
        fallback.className =
          "block px-3 py-3 text-sm text-blue-600 hover:underline break-all";
        card.appendChild(fallback);
      }

      wrapper.appendChild(card);

      return {
        dom: wrapper,
      };
    };
  },

  addCommands() {
    return {
      insertEmbed:
        (url: string) =>
        ({ chain }) => {
          const provider = detectProvider(url);

          return chain()
            .insertContent({
              type: this.name,
              attrs: { url, provider },
            })
            .run();
        },
    };
  },
});

export default Embed;