"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { mainNav } from "@/config/site";

/** Desktop-Navigation. Der aktive Eintrag wird ueber brand-600 ausgezeichnet. */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Hauptnavigation" className="hidden md:block">
      <ul className="flex items-center gap-8">
        {mainNav.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-brand-600" : "text-ink hover:text-brand-600",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
