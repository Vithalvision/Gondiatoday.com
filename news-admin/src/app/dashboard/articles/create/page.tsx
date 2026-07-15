"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import WordPressEditor from "@/components/editor/WordPressEditor";

type EditorMethods = {
  editor?: any;
  insertImage?: (url: string) => void;
  insertHtml?: (html: string) => void;
  insertEmbed?: (url: string) => void;
  getHTML?: () => string;
  setHTML?: (html: string) => void;
};

function CreateArticleForm() {
  const searchParams = useSearchParams();
  const articleId = searchParams.get("slug");

  const [form, setForm] = useState({
    title: "",
    sourceLink: "",
    author: "",
    category: "",
    status: "draft",

    socialVideoUrls: [] as string[],
    socialPostUrls: [] as string[],
  });

  const [videoInput, setVideoInput] = useState("");
  const [postInput, setPostInput] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<any[]>([]);
  const [filteredTags, setFilteredTags] = useState<any[]>([]);
  const [featuredImg, setFeaturedImg] = useState("");
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<EditorMethods | null>(null);
  const categoryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return;

      try {
        const res = await fetch(`/api/articles/${articleId}`);
        const article = await res.json();

        setForm({
          title: article.title || "",
          sourceLink: article.sourceLink || "",
          author: article.author || "",
          category: article.category || "",
          status: article.status || "draft",

          socialVideoUrls: article.socialVideoUrls || [],
          socialPostUrls: article.socialPostUrls || [],
        });
        setTags(article.tags || []);
        setFeaturedImg(article.featuredImg || "");

        // LOAD CONTENT INTO EDITOR
        setTimeout(() => {
          editorRef.current?.setHTML?.(article.content || "<p></p>");
        }, 500);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();
  }, [articleId]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/tags");
        const data = await res.json();

        if (Array.isArray(data)) {
          setAllTags(data);
        }
      } catch (error) {
        console.error("Failed to load tags", error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
  async function loadCategories() {
    try {
      const response = await fetch("/api/categories", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();

      console.log(data);

      setAllCategories(data.categories || []);
    } catch (err) {
      console.error("CATEGORY LOAD ERROR:", err);
      setAllCategories([]);
    }
  }

  loadCategories();
}, []);

  useEffect(() => {
    if (!tagInput.trim()) {
      setFilteredTags([]);
      return;
    }

    const matches = allTags.filter((tag) =>
      tag.name.toLowerCase().includes(tagInput.toLowerCase())
    );

    setFilteredTags(matches);
  }, [tagInput, allTags]);

  // Close category dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(e.target as Node)
      ) {
        setCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addTag = async () => {
    if (!tagInput.trim()) return;

    const name = tagInput.trim();

    try {
      const res = await fetch("/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create tag");
      }

      // avoid duplicates in article tags
      setTags((prev) =>
        prev.includes(data.name) ? prev : [...prev, data.name]
      );

      // update autocomplete list instantly
      setAllTags((prev) => {
        const exists = prev.find((t) => t.id === data.id);
        if (exists) return prev;
        return [data, ...prev];
      });

      setTagInput("");
      setFilteredTags([]);
    } catch (err) {
      console.error("Tag creation failed:", err);
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setPublishing(true);

      const content = editorRef.current?.getHTML?.() || "<p>No Content</p>";

      const res = await fetch(
        articleId ? `/api/articles/${articleId}` : "/api/articles",
        {
          method: articleId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: form.title,
            content,
            author: form.author,
            sourceLink: form.sourceLink,
            category: form.category,
            tags,
            status: form.status,
            featuredImg,

            socialVideoUrls: form.socialVideoUrls,
            socialPostUrls: form.socialPostUrls,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to publish article");
      }

      alert(
        articleId
          ? "Article Updated Successfully!"
          : "Article Published Successfully!"
      );
      setForm({
        title: "",
        sourceLink: "",
        author: "",
        category: "",
        status: "draft",

        socialVideoUrls: [],
        socialPostUrls: [],
      });

      setTags([]);
      setTagInput("");
      setFeaturedImg("");
    } catch (error) {
      console.error("Publish Error:", error);
      alert("Failed to publish article");
    } finally {
      setPublishing(false);
    }
  };

  const handleMediaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
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
      const imageUrl = data?.url;

      if (!imageUrl) return;

      editorRef.current?.insertImage?.(imageUrl);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed");
    } finally {
      e.target.value = "";
    }
  };

  const addVideoLink = () => {
    const url = prompt("Paste YouTube video URL");

    if (!url) return;

    editorRef.current?.insertEmbed?.(url.trim());
  };

  const addInstagramReel = () => {
    const url = prompt("Paste Instagram Reel URL");

    if (!url) return;

    editorRef.current?.insertEmbed?.(url.trim());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/articles"
            className="flex items-center justify-center text-gray-600 hover:text-black"
          >
            <ArrowLeft size={20} />
          </Link>

          <h1 className="text-2xl font-semibold leading-none">
            {articleId ? "Edit Article" : "Create Article"}
          </h1>
        </div>

        <button
          onClick={handleSubmit}
          disabled={publishing}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {publishing
            ? articleId
              ? "Updating..."
              : "Publishing..."
            : articleId
            ? "Update Article"
            : "Publish Article"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border rounded-lg p-5">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Add title"
              className="w-full text-3xl border-none outline-none px-0 py-2 leading-tight"
            />

            <div className="mt-4 border-t pt-4">
              <input
                type="url"
                name="sourceLink"
                value={form.sourceLink}
                onChange={handleChange}
                placeholder="Source link"
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>

          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="border-b px-4 py-3 bg-gray-50 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleMediaClick}
                className="px-4 py-2 h-10 flex items-center bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Upload From Device
              </button>

              <button
                type="button"
                onClick={() => window.open("/dashboard/media", "_blank")}
                className="px-4 py-2 h-10 flex items-center bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Select From Media Library
              </button>

              <button
                type="button"
                onClick={addVideoLink}
                className="px-4 py-2 h-10 flex items-center bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add Video Link
              </button>

              <button
                type="button"
                onClick={addInstagramReel}
                className="px-4 py-2 h-10 flex items-center bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                Add Reel
              </button>
            </div>

            <div className="p-5">
              <WordPressEditor ref={editorRef} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-5">
            <h2 className="font-semibold mb-4">Publish</h2>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mb-4"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <button
              onClick={handleSubmit}
              disabled={publishing}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {publishing
                ? articleId
                  ? "Updating..."
                  : "Publishing..."
                : articleId
                ? "Update"
                : "Publish"}
            </button>
          </div>

          <div className="bg-white border rounded-lg p-5">
            <h2 className="font-semibold mb-4">Author</h2>

            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author name"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="bg-white border rounded-lg p-5">
            <h2 className="font-semibold mb-4">
              Category ({allCategories.length})
            </h2>

            <div className="relative" ref={categoryRef}>
              {/* Selected */}
              <div
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="w-full border rounded-lg p-2 cursor-pointer bg-white"
              >
                {form.category || "Select Category"}
              </div>

              {/* Dropdown */}
              {categoryOpen && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {allCategories.length === 0 ? (
                    <div className="p-2 text-gray-500">No categories found</div>
                  ) : (
                    allCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setForm((prev) => ({
                            ...prev,
                            category: cat.name,
                          }));
                          setCategoryOpen(false);
                        }}
                      >
                        {cat.name}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border rounded-lg p-5">
            <h2 className="font-semibold mb-4">Social Media Embeds</h2>

            {/* Video URLs */}
            <label className="block text-sm font-medium mb-2">
              Video URLs
            </label>

            <div className="flex gap-2 mb-3">
              <input
                value={videoInput}
                onChange={(e) => setVideoInput(e.target.value)}
                placeholder="Paste YouTube / Instagram Reel / LinkedIn Video URL"
                className="flex-1 border rounded-lg p-2"
              />

              <button
                type="button"
                className="bg-blue-600 text-white px-4 rounded-lg"
                onClick={() => {
                  if (!videoInput.trim()) return;

                  setForm((prev) => ({
                    ...prev,
                    socialVideoUrls: [...prev.socialVideoUrls, videoInput.trim()],
                  }));

                  setVideoInput("");
                }}
              >
                Add
              </button>
            </div>

            {form.socialVideoUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
              >
                <span className="truncate text-sm">{url}</span>

                <button
                  type="button"
                  className="text-red-600"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      socialVideoUrls: prev.socialVideoUrls.filter(
                        (_, i) => i !== index
                      ),
                    }))
                  }
                >
                  ✕
                </button>
              </div>
            ))}

            <hr className="my-4" />

            {/* Post URLs */}
            <label className="block text-sm font-medium mb-2">
              Social Posts
            </label>

            <div className="flex gap-2 mb-3">
              <input
                value={postInput}
                onChange={(e) => setPostInput(e.target.value)}
                placeholder="Paste Instagram / Facebook / X / LinkedIn Post URL"
                className="flex-1 border rounded-lg p-2"
              />

              <button
                type="button"
                className="bg-green-600 text-white px-4 rounded-lg"
                onClick={() => {
                  if (!postInput.trim()) return;

                  setForm((prev) => ({
                    ...prev,
                    socialPostUrls: [...prev.socialPostUrls, postInput.trim()],
                  }));

                  setPostInput("");
                }}
              >
                Add
              </button>
            </div>

            {form.socialPostUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
              >
                <span className="truncate text-sm">{url}</span>

                <button
                  type="button"
                  className="text-red-600"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      socialPostUrls: prev.socialPostUrls.filter(
                        (_, i) => i !== index
                      ),
                    }))
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white border rounded-lg p-5">
            <h2 className="font-semibold mb-4">Tags</h2>

            {/* Add New Tag */}
            <div className="relative w-full flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Type tag name..."
                className="flex-1 border rounded-lg p-2"
              />

              <button
                type="button"
                onClick={addTag}
                className="bg-blue-600 text-white px-4 rounded-lg"
              >
                Add
              </button>

              {tagInput.trim() && filteredTags.length > 0 && (
                <div className="absolute z-50 top-full mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                      onClick={() => {
                        if (!tags.includes(tag.name)) {
                          setTags([...tags, tag.name]);
                        }

                        setTagInput("");
                        setFilteredTags([]);
                      }}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {tag} ×
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-lg p-5">
            <h2 className="font-semibold mb-4">Featured Image</h2>

            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center text-center">
              <Upload className="text-gray-400 mb-2" size={24} />

              <p className="text-sm text-gray-500 mb-3">Upload Image</p>

              <input
                type="file"
                className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  const formData = new FormData();
                  formData.append("file", file);

                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });

                  const data = await res.json();

                  if (data.url) {
                    setFeaturedImg(data.url);
                  }
                }}
              />

              {featuredImg && (
                <img
                  src={featuredImg}
                  alt="Featured Image"
                  className="mt-4 rounded-lg w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
}

export default function CreateArticlePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center text-gray-500">
          Loading...
        </div>
      }
    >
      <CreateArticleForm />
    </Suspense>
  );
}