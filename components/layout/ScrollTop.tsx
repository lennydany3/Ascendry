"use client";

import { useEffect } from "react";

/**
 * Next can restore/land the scroll position near the footer when switching
 * between legal pages. Always start a legal page at the top (or at the hash).
 */
export function ScrollTop() {
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return null;
}
