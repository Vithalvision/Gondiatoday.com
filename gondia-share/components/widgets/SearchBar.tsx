'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md notranslate"
      translate="no"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news, categories, places..."
        className="w-full h-11 rounded-card border border-border bg-surface-muted pl-4 pr-11 text-sm text-ink placeholder:text-body/70 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center text-body hover:text-brand"
      >
        <Search size={18} />
      </button>
    </form>
  );
}
