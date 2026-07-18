"use client";

import { Search } from "lucide-react";

interface UserFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
}

export default function UserFilters({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
}: UserFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">

      {/* Search */}
      <div className="relative flex-1 min-w-[250px]">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-[#E0E0E0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Role Filter */}
      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="border border-[#E0E0E0] rounded-lg px-3 py-2 text-sm"
      >
        <option>All Roles</option>
        <option>Admin</option>
        <option>Editor</option>
        <option>Reporter</option>
      </select>
    </div>
  );
}