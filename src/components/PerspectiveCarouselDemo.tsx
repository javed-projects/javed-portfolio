import { PerspectiveCarousel } from "@/components/ui/perspective-carousel"

const items = [
  { src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80", title: "urban exploration" },
  { src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80", title: "night scene" },
  { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", title: "yellow wildflowers" },
  { src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80", title: "street with mount fuji" },
]

export function PerspectiveCarouselDemo() {
  return (
    <PerspectiveCarousel
      items={items}
      defaultActiveIndex={2}
      slideWidth={210}
      className="h-[560px] bg-[#ececec] text-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 rounded-3xl overflow-hidden"
    />
  )
}
