"use client";

import Link from "next/link";

export default function UsersTable({
  users,
  role,
}: {
  users: any[];
  role: string;
}) {
  const deleteUser = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      // reload page after delete
      window.location.reload();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-[#E0E0E0]">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="p-3 border">{user.name}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">{user.phone || "-"}</td>
              <td className="p-3 border">{user.role}</td>
              <td className="p-3 border">{user.category || "-"}</td>

              <td className="p-3 border">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    user.status === "Active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              {/* ACTIONS */}
              <td className="p-3 border">
                <div className="flex justify-center items-center gap-4">

                  {/* ✏️ EDIT */}
                  {role === "Admin" && (
                    <Link
                      href={`/dashboard/users/edit/${user.id}`}
                      className="text-blue-600 text-lg"
                    >
                      ✏️
                    </Link>
                  )}

                  {/* 🗑 DELETE */}
                  {role === "Admin" && (
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 text-lg"
                    >
                      🗑
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <p className="text-center p-4 text-gray-500">
          No users found
        </p>
      )}
    </div>
  );
}