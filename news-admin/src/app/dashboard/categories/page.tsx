"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  parentId?: string | null;
  parent?: Category | null;
  children?: Category[];
}

export default function Page() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parent, setParent] = useState("None");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();

      if (Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error(err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔥 ADD
  const addCategory = async () => {
    if (!name.trim()) return;

    setLoading(true);

    await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
        parentId: parent === "None" ? null : parent,
        description,
      }),
    });

    setName("");
    setSlug("");
    setParent("None");
    setDescription("");

    await fetchCategories();
    setLoading(false);
  };

  // 🔥 DELETE
  const deleteCategory = async (id: string) => {
    await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    fetchCategories();
  };

  // 🔥 BUILD TREE
  function buildTree(categories: Category[]) {
    const map = new Map<string, any>();
    const roots: any[] = [];

    categories.forEach((cat) => {
      map.set(cat.id, { ...cat, children: [] });
    });

    categories.forEach((cat) => {
      if (cat.parentId) {
        const parent = map.get(cat.parentId);
        if (parent) {
          parent.children.push(map.get(cat.id));
        }
      } else {
        roots.push(map.get(cat.id));
      }
    });

    return roots;
  }

  // 🔥 RENDER TREE
  const renderRows = (cats: any[], level = 0) =>
    cats.map((cat) => (
      <>
        <tr key={cat.id} className="border-t">
          <td className="p-4 font-medium">
            <span style={{ paddingLeft: `${level * 20}px` }}>
              {level > 0 ? "↳ " : ""}
              {cat.name}
            </span>
          </td>

          <td className="p-4 text-sm text-gray-600">
            {cat.description || "—"}
          </td>

          <td className="p-4">{cat.slug}</td>

          <td className="p-4">{cat.parent?.name || "None"}</td>

          <td className="p-4">{cat.count}</td>

          <td className="p-4">
            <button
              onClick={() => deleteCategory(cat.id)}
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </button>
          </td>
        </tr>

        {cat.children?.length > 0 &&
          renderRows(cat.children, level + 1)}
      </>
    ));

  return (
    <div className="p-5 lg:p-7 max-w-screen-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* FORM */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-lg mb-5">Add Category</h2>

            <div className="space-y-5">

              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                placeholder="Slug (optional)"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />

              <select
                value={parent}
                onChange={(e) => setParent(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="None">None</option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />

              <button
                onClick={addCategory}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                {loading ? "Adding..." : "Add Category"}
              </button>

            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="lg:col-span-3">
          <div className="bg-white border rounded-xl overflow-hidden">

            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Slug</th>
                  <th className="p-4 text-left">Parent</th>
                  <th className="p-4 text-left">Count</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {renderRows(buildTree(categories))}
              </tbody>

            </table>

          </div>
        </div>

      </div>
    </div>
  );
}