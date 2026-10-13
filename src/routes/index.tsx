import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/ui/Header";
import { HeroSection } from "@/components/hero/HeroSection";
import { SelectedWorkSection } from "@/components/work/SelectedWorkSection";
import { AboutScene, ContactScene, TechScene } from "@/components/scenes/ClosingScenes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prakash Mannam — Portfolio" },
      {
        name: "description",
        content:
          "Prakash Mannam builds backend systems and full-stack products with Java, Spring Boot, and React.",
      },
      { property: "og:title", content: "Prakash Mannam — Portfolio" },
      {
        property: "og:description",
        content: "Portfolio of Prakash Mannam — Java Backend & Full-Stack Engineer.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-x-clip bg-background">
      <Header />
      <HeroSection />
      <SelectedWorkSection />
      <TechScene />
      <AboutScene />
      <ContactScene />
    </main>
  );
}
