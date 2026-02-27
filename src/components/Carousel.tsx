"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import Image from "next/image";

export function Carousel() {
  const isMobile = useIsMobile();
  const slides = isMobile
    ? ["/mobile/Group_110.png", "/mobile/Group_1212.png"]
    : [
        "/desktop/bg_1.png",
        "/desktop/bg_3.png",
        "/desktop/bg_5.png",
        "/desktop/bg_2.png",
        "/desktop/bg_6.png",
        "/desktop/bg_4.png",
      ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((src, index) => (
        <Image
          key={index}
          src={src}
          fill
          alt={`Slide ${index + 1}`}
          className={`object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </section>
  );
}
