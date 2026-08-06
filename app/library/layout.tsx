import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anatomy Atlas Library",
  description: "Browse nine interactive 3D human anatomy specimens by body system or region.",
};

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
