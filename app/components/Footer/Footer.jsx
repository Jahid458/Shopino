import Link from "next/link";
import { ShoppingBag, Globe, Mail, Share2 } from "lucide-react";

const cols = [
  {
    title: "Shop",
    links: [
      { label: "All items", href: "/items" },
      { label: "Fashion", href: "/items?category=Fashion" },
      { label: "Electronics", href: "/items?category=Electronics" },
      { label: "Home", href: "/items?category=Home" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Press", href: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "/about" },
      { label: "Shipping", href: "/about" },
      { label: "Returns", href: "/about" },
    ],
  },
];

const socialLinks = [
  { icon: Mail, label: "Email" },
  { icon: Share2, label: "Social" },
  { icon: Globe, label: "Website" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-sky-200 bg-sky-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">

          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-sky-600 tracking-tight">Shopino</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              A vibrant marketplace for bold finds. Shop with delight.
            </p>
            <div className="flex gap-2 mt-6">
              {socialLinks.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-sky-200 text-slate-500 hover:bg-sky-500 hover:border-sky-500 hover:text-white transition-colors duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-slate-700 mb-4 tracking-wide uppercase">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-sky-600 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-sky-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Shopino. Crafted with care.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-sky-600 transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-sky-600 transition-colors duration-200">Terms</a>
            <a href="#" className="hover:text-sky-600 transition-colors duration-200">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};