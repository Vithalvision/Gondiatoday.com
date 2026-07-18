"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

import UserFilters from "@/components/dashboard/UserFilters";
import UsersTable from "@/components/dashboard/UsersTable";
import { currentUser } from "@/lib/mock-data";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/users", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to fetch users");
      }

      setUsers(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("FETCH_USERS_ERROR:", err);
      setError(err.message || "Something went wrong");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (currentUser.role === "Reporter") {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">
          Access Denied
        </h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  const filteredUsers = users.filter((user) => {
    const name = user?.name?.toLowerCase() || "";
    const email = user?.email?.toLowerCase() || "";

    const matchesSearch =
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All Roles" || user?.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-8 bg-[#FFFFFF] text-[#222222]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Users</h1>

        {currentUser.role === "Admin" && (
          <Link href="/dashboard/users/create">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B57D0] text-white hover:opacity-90">
              <Plus size={18} />
              Add User
            </button>
          </Link>
        )}
      </div>

      <div className="border border-[#E0E0E0] rounded-lg p-3 mb-4 bg-white">
        <UserFilters
          search={search}
          setSearch={setSearch}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />
      </div>

      <div className="border border-[#E0E0E0] rounded-lg bg-white">
        {loading ? (
          <p className="p-6 text-center">Loading users...</p>
        ) : error ? (
          <p className="p-6 text-center text-red-500">{error}</p>
        ) : filteredUsers.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            No users found
          </p>
        ) : (
          <UsersTable
            users={filteredUsers}
            role={currentUser.role}
          />
        )}
      </div>
    </div>
  );
}