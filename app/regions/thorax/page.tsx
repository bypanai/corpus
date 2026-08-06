import { ThoraxRegionViewer } from "@/components/anatomy/ThoraxRegionViewer";
import { PrimaryNav } from "@/components/PrimaryNav";

export const metadata = { title: "Thorax region" };

export default function ThoraxRegionPage() {
  return <div className="min-h-screen bg-[#f3f6fb]"><PrimaryNav active="/regions" /><main className="atelier-shell region-page"><ThoraxRegionViewer /></main></div>;
}
