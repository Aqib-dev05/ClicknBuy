import { useState } from "react";

import hero1 from "../../assets/shoe.avif";
import hero2 from "../../assets/headphone.avif";
import hero3 from "../../assets/makeup.avif";
import hero4 from "../../assets/otherThings.avif";

const slides = [
  { id: 1, src: hero1, alt: "Featured collection 1" },
  { id: 2, src: hero2, alt: "Featured collection 2" },
  { id: 3, src: hero3, alt: "Featured collection 3" },
  { id: 4, src: hero4, alt: "Featured collection 4" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const goPrev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-black">
          {/* Slides */}
          <div className="relative h-64 w-full sm:h-80 md:h-100 lg:h-[75vh]">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === current ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="h-full w-full object-fill"
                />
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 px-2 py-1 text-sm font-medium text-gray-800 shadow hover:bg-white"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 px-2 py-1 text-sm font-medium text-gray-800 shadow hover:bg-white"
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-2.5 w-2.5 rounded-full border border-white/60 transition ${
                  index === current ? "bg-white" : "bg-white/20"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

