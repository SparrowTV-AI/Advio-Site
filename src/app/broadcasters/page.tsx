import type { Metadata } from "next";
import AudiencePage from "@/components/sections/AudiencePage";
import { broadcasters } from "@/lib/content";

export const metadata: Metadata = { title: "Broadcasters" };

export default function Page() {
  return <AudiencePage data={broadcasters} />;
}
