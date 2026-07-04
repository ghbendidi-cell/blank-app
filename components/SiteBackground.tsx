"use client";

import { usePathname } from "@/i18n/navigation";
import CloudSky from "./CloudSky";

export default function SiteBackground() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <CloudSky />;
}
