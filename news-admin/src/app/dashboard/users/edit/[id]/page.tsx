"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Reporter",
    category: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${params.id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();

        setForm({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "Reporter",
          category: data.category || "",
        });
      } catch (err) {
        setMessage("Failed to load user");
      } finally {
        setFetching(false);
      }
    };

    if (params?.id) {
      fetchUser();
    }
  }, [params?.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`/api/users/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update user");
      }

      setMessage("User updated successfully ✅");

      setTimeout(() => {
        router.push("/dashboard/users");
      }, 1000);
    } catch (err: any) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Loading user...</h2>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white min-h-screen text-[#222222]">
      <h1 className="text-3xl font-bold mb-6">
        Edit User
      </h1>

      <div className="max-w-xl bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Role
          </label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Reporter">Reporter</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Sports, Politics, Technology..."
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => router.push("/dashboard/users")}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}