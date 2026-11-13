"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Next can land a new page near the footer when navigating between routes.
 * On every route change, start at the top (or at the #hash if there is one).
 */
export function ScrollTop() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
