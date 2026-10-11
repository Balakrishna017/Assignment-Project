import { createFileRoute } from "@tanstack/react-router";
import { CarScene } from "@/components/car/CarScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Welcome Itzfizz — Scroll Car Animation" },
      { name: "description", content: "A McLaren 720S drives across the screen as you scroll, revealing key stats." },
      { property: "og:title", content: "Welcome Itzfizz — Scroll Car Animation" },
      { property: "og:description", content: "A McLaren 720S drives across the screen as you scroll, revealing key stats." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CarScene,
});
