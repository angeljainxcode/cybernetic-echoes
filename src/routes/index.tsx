import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { ProgressRail } from "@/components/site/ProgressRail";
import { Hero } from "@/components/site/Hero";
import { Augment } from "@/components/site/Augment";
import { Intelligence } from "@/components/site/Intelligence";
import { Creation } from "@/components/site/Creation";
import { Convergence } from "@/components/site/Convergence";
import { Footer } from "@/components/site/Footer";

const TITLE = "Techfest IIT Bombay — Human // Machine";
const DESCRIPTION =
  "An interactive Human // Machine exhibition from Techfest, IIT Bombay. The future isn't coming. It's being built.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-[#050505]">
      <ProgressRail />
      <Nav />
      <Hero />
      <Augment />
      <Intelligence />
      <Creation />
      <Convergence />
      <Footer />
    </main>
  );
}
