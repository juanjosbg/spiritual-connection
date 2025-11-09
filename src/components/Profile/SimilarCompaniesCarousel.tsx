"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Item = { name: string; value: string };

export default function SimilarCompaniesCarousel({
  items,
  title = "Similar Companies",
  autoScroll = true,
  interval = 3500,
}: {
  items: Item[];
  title?: string;
  autoScroll?: boolean;
  interval?: number;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const updateArrows = () => {
    const el = viewportRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 0);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    const el = viewportRef.current;
    if (!el) return;

    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  const scrollByAmount = (dir: "left" | "right") => {
    const el = viewportRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    if (!autoScroll) return;
    const el = viewportRef.current;
    if (!el) return;

    const auto = setInterval(() => {
      if (isHovered) return; 
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;

      if (scrollLeft >= maxScroll - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: clientWidth * 0.5, behavior: "smooth" });
      }
    }, interval);

    return () => clearInterval(auto);
  }, [autoScroll, interval, isHovered]);

  return (
    <section
      className="mt-10 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scrollByAmount("left")}
            disabled={!canPrev}
            aria-label="Anterior"
            className={`rounded-full p-2 border transition
              ${
                canPrev
                  ? "bg-white backdrop-blur-sm rounded-2xl shadow-sm border-none"
                  : "opacity-40 cursor-not-allowed"
              }
              bg-white backdrop-blur-sm rounded-2xl shadow-sm border-none`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollByAmount("right")}
            disabled={!canNext}
            aria-label="Siguiente"
            className={`rounded-full p-2 border transition
              ${
                canNext
                  ? "bg-white backdrop-blur-sm rounded-2xl shadow-sm border-none"
                  : "opacity-40 cursor-not-allowed"
              }
              bg-white backdrop-blur-sm rounded-2xl shadow-sm border-none`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-linear-to-r from-gray-40 to-transparent dark:from-[#111827]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-5 bg-linear-to-l from-gray-40 to-transparent dark:from-[#111827]" />

      <div
        ref={viewportRef}
        className="relative overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory
                   [-ms-overflow-style:none] [scrollbar-width:none]
                   [&::-webkit-scrollbar]:hidden"
        onScroll={updateArrows}
      >

        <div className="flex gap-4 pr-2">
          {items.map((c, idx) => (
            <article
              key={`${c.name}-${idx}`}
              className="snap-start shrink-0 w-[70%] sm:w-[42%] md:w-[30%] lg:w-[22%]
                         bg-white backdrop-blur-sm border-none p-4 rounded-xl text-center -z-1
                         shadow-sm border border-white/40 dark:border-gray-700
                         transition-transform duration-300 hover:-translate-y-1
                         hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <p className="font-semibold">{c.name}</p>
              <p
                className={`text-sm mt-1 ${
                  c.value.startsWith("-") ? "text-red-500" : "text-emerald-500"
                }`}
              >
                {c.value}
              </p>
              <button
                className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 hover:underline"
                onClick={() => console.log("Compare", c.name)}
              >
                Compare
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
