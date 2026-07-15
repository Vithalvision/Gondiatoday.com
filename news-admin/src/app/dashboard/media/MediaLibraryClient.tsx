"use client";

import { useMemo, useState } from "react";

interface MediaItem {
  id: string;
  name: string | null;
  url: string;
  publicId: string | null;
  type: string | null;
  altText: string | null;
  articleTitle: string | null;
  isFeatured: boolean;
  fileSize: number | null;
  createdAt: Date;
}

export default function MediaLibraryClient({
  media,
}: {
  media: MediaItem[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const filteredMedia = useMemo(() => {
    return media.filter((item) => {
      const matchesSearch =
        !search ||
        item.name?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "featured"
          ? item.isFeatured
          : filter === "photos"
          ? item.type !== "video"
          : item.type === "video";

      return matchesSearch && matchesFilter;
    });
  }, [media, search, filter]);

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    alert("URL copied");
  };

  const toggleSelect = (id: string) => {
    setSelectedMedia((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    const ok = confirm(`Delete ${selectedMedia.length} selected file(s)?`);
    if (!ok) return;

    try {
      await Promise.all(
        selectedMedia.map((id) => {
          const item = media.find((m) => m.id === id);

          if (!item?.publicId) return;

          return fetch(`/api/media/${item.id}`, {
            method: "DELETE",
          });
        })
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-gray-500 text-sm mt-1">
            Total Files: {media.length}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search media..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-72"
        />
      </div>

      {selectedMedia.length > 0 && (
        <div className="mb-6 bg-white border rounded-xl p-4 flex items-center justify-between">
          <span className="font-medium">
            {selectedMedia.length} Selected
          </span>

          <div className="flex gap-2">
            <button
              onClick={deleteSelected}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete Selected
            </button>

            <button
              onClick={() => setSelectedMedia([])}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "photos", "videos", "featured"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg ${
              filter === f ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filteredMedia.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center text-gray-500">
          No media found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className={`cursor-pointer bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition ${
                selectedMedia.includes(item.id)
                  ? "ring-4 ring-blue-500"
                  : ""
              }`}
            >
              {/* IMAGE CLICK = PREVIEW */}
              <div
                className="relative"
                onClick={() => setPreview(item.url)}
              >
                {item.type === "video" ? (
                  <video
                    src={item.url}
                    controls
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.altText || item.name || "Media"}
                    className="w-full h-48 object-cover"
                  />
                )}

                {item.isFeatured && (
                  <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    Featured
                  </span>
                )}

                {selectedMedia.includes(item.id) && (
                  <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-xl">
                      ✓
                    </div>
                  </div>
                )}
              </div>

              {/* SELECTION CLICK SEPARATE */}
              <div
                className="p-3"
                onClick={() => toggleSelect(item.id)}
              >
                <h3 className="font-medium text-sm truncate">
                  {item.name || "Untitled"}
                </h3>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyUrl(item.url);
                  }}
                  className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm"
                >
                  Copy URL
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* IMAGE PREVIEW MODAL */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            className="max-w-4xl max-h-[90vh] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}