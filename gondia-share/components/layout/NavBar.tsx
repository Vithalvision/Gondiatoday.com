'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Home } from "lucide-react";
import { NAV_ITEMS } from "@/lib/categories";

const MORE_ITEMS = [
  { label: "Entertainment", href: "/entertainment" },
  { label: "Technology", href: "/technology" },
  { label: "Opinion", href: "/opinion" },
  { label: "Obituary", href: "/obituary" },
];

export function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);

useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      moreRef.current &&
      !moreRef.current.contains(event.target as Node)
    ) {
      setMoreOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
   <nav
      className="sticky top-0 z-50 bg-white border-y border-gray-200 shadow-sm notranslate"
      translate="no"
    >
      <div className="max-w-wrap mx-auto">

        <div className="flex items-center h-14 px-4">

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden mr-3"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8 text-[15px] font-semibold flex-1">

            <li>
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-red-600"
              >
                <Home size={18} />
              </Link>
            </li>

            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition-colors pb-4 border-b-2 ${
                      active
                        ? "border-red-600 text-red-600"
                        : "border-transparent hover:border-red-600 hover:text-red-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* More Dropdown */}
           <li
            ref={moreRef}
            className="relative ml-auto"
          >
            <button
              onClick={() => setMoreOpen((prev) => !prev)}
              className="flex items-center gap-1 hover:text-red-600"
            >
              More
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 z-[9999]">
                <div className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                  {MORE_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-3 hover:bg-gray-100 hover:text-red-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
          </ul>

        </div>

      </div>

      {/* Mobile Navigation */}

      {mobileOpen && (

        <div className="lg:hidden border-t bg-white">

          {[...NAV_ITEMS, ...MORE_ITEMS].map((item) => (

            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-5 py-3 border-b hover:bg-gray-50 hover:text-red-600"
            >
              {item.label}
            </Link>

          ))}

        </div>

      )}

    </nav>
  );
}