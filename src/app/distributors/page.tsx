import type { Metadata } from "next";
import AudiencePage from "@/components/sections/AudiencePage";
import { distributors } from "@/lib/content";

export const metadata: Metadata = { title: "Distributors" };

export default function Page() {
  return <AudiencePage data={distributors} />;
}
