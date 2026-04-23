"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {ShoppingBag,Plus,Settings,LogOut,User as UserIcon,Menu,X,ChevronDown} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/items?category=Fashion", label: "Fashion" },
  { href: "/items?category=Electronics", label: "Tech" },
];

export const Navbar = ({ user, signOut }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? "U";

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href) => {
    const [path, query] = href.split("?");
    if (href === "/") return pathname === "/";
    if (query) {
      const param = new URLSearchParams(query);
      const category = param.get("category");
      return pathname === path && searchParams.get("category") === category;
    }
    return pathname === path && !searchParams.get("category");
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-sky-200 bg-sky-50/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-sky-600 tracking-tight">Shopino</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-sky-600 bg-sky-100"
                      : "text-slate-600 hover:text-white hover:bg-sky-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-200 bg-white hover:bg-sky-50 transition-colors duration-200"
                  >
                    <div className="h-8 w-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold">
                      {initials}
                    </div>
                    <span className="text-sm font-medium text-slate-700 max-w-30 truncate">
                      {user.email}
                    </span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl border border-sky-100 bg-white shadow-lg overflow-hidden">
                      <div className="px-4 py-3 border-b border-sky-100">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-medium text-slate-700 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => { router.push("/products/new"); setDropdownOpen(false); }}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                        >
                          <Plus className="h-4 w-4" /> Add Product
                        </button>
                        <button
                          onClick={() => { router.push("/products/manage"); setDropdownOpen(false); }}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                        >
                          <Settings className="h-4 w-4" /> Manage Products
                        </button>
                      </div>
                      <div className="border-t border-sky-100 py-1">
                        <button
                          onClick={() => { signOut && signOut(); setDropdownOpen(false); }}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" /> Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push("/auth")}
                    className="px-4 py-2 text-sm font-medium text-slate-600 rounded-full hover:bg-sky-100 hover:text-sky-600 transition-colors"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => router.push("/auth?mode=signup")}
                    className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-full hover:bg-sky-600 transition-colors"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-full text-slate-600 hover:bg-sky-100 transition-colors"
            >
              <Menu className="h-5 w-5 hover:text-white" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-100 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeMobile}
        />

        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-sky-100">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <span className="font-extrabold text-sky-600 tracking-tight">Shopino</span>
            </div>
            <button
              onClick={closeMobile}
              className="p-1.5 rounded-full text-slate-500 hover:bg-sky-50  transition-colors"
            >
              <X className="h-5 w-5 hover:text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-sky-100 text-sky-600"
                      : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-sky-100 flex flex-col gap-1">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 mb-1 bg-sky-50 rounded-xl">
                    <div className="h-9 w-9 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-medium text-slate-700 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { router.push("/products/new"); closeMobile(); }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add Product
                  </button>
                  <button
                    onClick={() => { router.push("/products/manage"); closeMobile(); }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                  >
                    <Settings className="h-4 w-4" /> Manage Products
                  </button>
                  <button
                    onClick={() => { signOut && signOut(); closeMobile(); }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <button
                    onClick={() => { router.push("/auth"); closeMobile(); }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-sky-200 text-sm font-medium text-slate-600 hover:bg-sky-600 hover:text-white transition-colors"
                  >
                    <UserIcon className="h-4 w-4 " /> Log in
                  </button>
                  <button
                    onClick={() => { router.push("/auth?mode=signup"); closeMobile(); }}
                    className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-sky-500/40 hover:bg-sky-600 transition-colors"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};