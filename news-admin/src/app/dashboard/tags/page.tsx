"use client";

import { useEffect, useState } from "react";

interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export default function Page() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const [tags, setTags] = useState<Tag[]>([]);

  // ✅ LOAD TAGS FROM DB
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const res = await fetch("/api/tags");
      const data = await res.json();
      setTags(data);
    } catch (err) {
      console.error("Failed to load tags", err);
    }
  };

  // ✅ ADD TAG (DB)
  const addTag = async () => {
    if (!name.trim()) return;

    const newTag = {
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      description,
    };

    try {
      const res = await fetch("/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTag),
      });

      const saved = await res.json();

      setTags((prev) => [saved, ...prev]);

      setName("");
      setSlug("");
      setDescription("");
    } catch (err) {
      console.error("Failed to add tag", err);
    }
  };

  // ✅ DELETE TAG (DB)
  const deleteTag = async (id: number) => {
    try {
      await fetch("/api/tags", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      setTags((prev) => prev.filter((tag) => tag.id !== id));
    } catch (err) {
      console.error("Failed to delete tag", err);
    }
  };

  return (
    <div className="p-5 lg:p-7 max-w-screen-xl mx-auto">
      <h1 className="text-xl font-bold text-[#222222] mb-6">
        Tags
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Tag Form */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 shadow-card h-fit">
          <h2 className="font-semibold text-lg mb-4">
            Add Tag
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2"
              />
            </div>

            <button
              onClick={addTag}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Add Tag
            </button>
          </div>
        </div>

        {/* Tags List */}
        <div className="lg:col-span-2 bg-white border border-[#E0E0E0] rounded-xl shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b font-semibold">
            All Tags
          </div>

          {tags.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tags found
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Slug</th>
                  <th className="text-left px-4 py-3">Description</th>
                  <th className="text-left px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {tags.map((tag) => (
                  <tr key={tag.id} className="border-b">
                    <td className="px-4 py-3">{tag.name}</td>
                    <td className="px-4 py-3">{tag.slug}</td>
                    <td className="px-4 py-3">{tag.description}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteTag(tag.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}