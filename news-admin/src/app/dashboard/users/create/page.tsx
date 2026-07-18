"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/mock-data";

export default function CreateUserPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    category: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Block anyone who isn't Admin from seeing this page,
  // even if they navigate here directly by URL.
  if (currentUser.role !== "Admin") {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.role) {
      toast.error("Name, Email, Password and Role are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api//users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to create user");
      }

      toast.success("User created successfully ✅");

      setForm({
        name: "",
        email: "",
        phone: "",
        role: "",
        category: "",
        password: "",
      });

      setTimeout(() => {
        router.push("/dashboard/users");
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center text-[#222222]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-[#E0E0E0] rounded-xl p-6 shadow-sm space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">Add New User</h1>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Name"
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Email"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Phone"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Reporter">Reporter</option>
        </select>

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Category (Sports, Politics, Tech...)"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
}