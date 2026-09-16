"use client";

import { useState, useEffect } from "react";
import { Trash2, Pencil, X } from "lucide-react";
import toast from "react-hot-toast";

type Campaign = {
  id: string;
  name: string;
  topics: string[];
  categories: string[];
  author?: string | null;
  createdAt: string;
};

export default function Page() {
  const [name, setName] = useState("");
  const [topicInput, setTopicInput] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [allAuthors, setAllAuthors] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);

  useEffect(() => {
    loadCategories();
    loadAuthors();
    loadCampaigns();
  }, []);

  async function loadCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setAllCategories(data.categories || []);
    } catch {
      setAllCategories([]);
    }
  }

  async function loadAuthors() {
    try {
      const res = await fetch("/api/users/list");
      const data = await res.json();
      setAllAuthors(data.users || data || []);
    } catch {
      setAllAuthors([]);
    }
  }

  async function loadCampaigns() {
    try {
      const res = await fetch("/api/campaigns");
      const data = await res.json();
      setCampaigns(data.campaigns || []);
    } catch {
      setCampaigns([]);
    }
  }

    function toggleCategory(catName: string) {
    setSelectedCategories((prev) => {
      const updated = prev.includes(catName)
        ? prev.filter((c) => c !== catName)
        : [...prev, catName];

      // Auto-match author based on the selected category
      const matchedAuthor = allAuthors.find(
        (user: any) =>
          user.category &&
          user.category.toLowerCase() === catName.toLowerCase()
      );

      if (matchedAuthor && !prev.includes(catName)) {
        setSelectedAuthor(matchedAuthor.name);
      }

      return updated;
    });

    setCategoryOpen(false);
  }

  function addTopic() {
    const trimmed = topicInput.trim();

    if (!trimmed) return;

    if (selectedTopics.includes(trimmed)) {
      toast.error("This topic is already added");
      setTopicInput("");
      return;
    }

    setSelectedTopics((prev) => [...prev, trimmed]);
    setTopicInput("");
  }

  function removeTopic(topic: string) {
    setSelectedTopics((prev) => prev.filter((t) => t !== topic));
  }

  function handleTopicKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTopic();
    }
  }

  function resetForm() {
    setName("");
    setTopicInput("");
    setSelectedTopics([]);
    setSelectedCategories([]);
    setSelectedAuthor("");
    setEditingId(null);
    setCategoryOpen(false);
  }

  async function handleSubmit() {
    if (!name.trim()) {
      toast.error("Please enter a campaign name");
      return;
    }

    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        editingId ? `/api/campaigns/${editingId}` : "/api/campaigns",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            topics: selectedTopics,
            categories: selectedCategories,
            author: selectedAuthor || null,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success(
        editingId
          ? "Campaign updated successfully!"
          : "Campaign created successfully!"
      );

      resetForm();
      await loadCampaigns();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(campaign: Campaign) {
    setEditingId(campaign.id);
    setName(campaign.name);
    setSelectedTopics(campaign.topics || []);
    setTopicInput("");
    setSelectedCategories(campaign.categories || []);
    setSelectedAuthor(campaign.author || "");
    setCategoryOpen(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this campaign?")) return;

    try {
      const res = await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to delete");
        return;
      }

      toast.success("Campaign deleted successfully");
      await loadCampaigns();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="p-5 lg:p-7 max-w-screen-xl mx-auto">
      <h1 className="text-xl font-bold text-[#222222] mb-6">
        {editingId ? "Edit Campaign" : "Create Campaign"}
      </h1>

      <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 shadow-card space-y-4 relative z-20">
        <div>
          <label className="text-xs font-semibold text-[#555]">
            Campaign Name
          </label>
          <input
            className="w-full mt-1 px-3 py-2 border border-[#E0E0E0] rounded-lg text-sm"
            placeholder="e.g. Diwali Special Coverage"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#555] block mb-2">
            Topics
          </label>
          <div className="w-full min-h-[42px] px-3 py-2 border border-[#E0E0E0] rounded-lg text-sm bg-white flex flex-wrap items-center gap-1.5">
            {selectedTopics.map((topic) => (
              <span
                key={topic}
                className="bg-blue-50 text-[#0B57D0] border border-blue-100 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1"
              >
                {topic}
                <button
                  type="button"
                  onClick={() => removeTopic(topic)}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              className="flex-1 min-w-[120px] outline-none text-sm py-1"
              placeholder={
                selectedTopics.length === 0
                  ? "e.g. Mirzapur, press Enter to add"
                  : "Add another topic..."
              }
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={handleTopicKeyDown}
              onBlur={addTopic}
            />
          </div>
          <p className="text-[11px] text-[#999] mt-1">
            Type a topic and press Enter or comma (,) to add it
          </p>
        </div>

        <div className="relative">
          <label className="text-xs font-semibold text-[#555] block mb-2">
            Categories
          </label>
          <button
            type="button"
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="w-full min-h-[42px] px-3 py-2 border border-[#E0E0E0] rounded-lg text-sm bg-white flex items-center justify-between text-left"
          >
            <div className="flex flex-wrap gap-1.5">
              {selectedCategories.length === 0 ? (
                <span className="text-[#999]">Select Categories</span>
              ) : (
                selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="bg-blue-50 text-[#0B57D0] border border-blue-100 px-2 py-1 rounded-md text-xs font-medium"
                  >
                    {cat}
                  </span>
                ))
              )}
            </div>
            <span className="text-[#777] ml-2 shrink-0">
              {categoryOpen ? "▲" : "▼"}
            </span>
          </button>

          {categoryOpen && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="max-h-48 overflow-y-auto p-2">
                {allCategories.length === 0 ? (
                  <p className="text-sm text-gray-400 px-2 py-3">
                    No categories found
                  </p>
                ) : (
                  allCategories.map((cat: any) => {
                    const isSelected = selectedCategories.includes(cat.name);
                    return (
                      <label
                        key={cat.id}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleCategory(cat.name)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-[#333]">
                          {cat.name}
                        </span>
                      </label>
                    );
                  })
                )}
              </div>

              {selectedCategories.length > 0 && (
                <div className="border-t border-[#E0E0E0] px-3 py-2 flex items-center justify-between bg-gray-50">
                  <span className="text-xs text-[#666]">
                    {selectedCategories.length}{" "}
                    {selectedCategories.length === 1
                      ? "category"
                      : "categories"}{" "}
                    selected
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategories([]);
                      setCategoryOpen(false);
                    }}
                    className="text-xs font-medium text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="text-xs font-semibold text-[#555] block mb-2">
            Author
          </label>
          <select
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg text-sm bg-white"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">Select Author</option>
            {allAuthors.map((user: any) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#0B57D0] hover:bg-[#0842A0] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update Campaign"
              : "Create Campaign"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold border border-[#E0E0E0] text-[#555]"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-[#222222] mb-4">
          All Campaigns ({campaigns.length})
        </h2>

        {campaigns.length === 0 ? (
          <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 text-center text-gray-400 text-sm">
            No campaigns created yet
          </div>
        ) : (
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white border border-[#E0E0E0] rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-[#222222]">
                    {campaign.name}
                  </h3>

                  {campaign.author && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      Author: {campaign.author}
                    </p>
                  )}

                  {(campaign.topics || []).length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(campaign.topics || []).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs bg-blue-50 text-[#0B57D0] px-2 py-0.5 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mt-1">
                    {(campaign.categories || []).map((cat) => (
                      <span
                        key={cat}
                        className="text-xs bg-gray-100 text-[#555] px-2 py-0.5 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(campaign)}
                    title="Edit"
                    className="p-2 rounded-lg border border-[#E0E0E0] text-[#0B57D0] hover:bg-blue-50"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(campaign.id)}
                    title="Delete"
                    className="p-2 rounded-lg border border-[#E0E0E0] text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}