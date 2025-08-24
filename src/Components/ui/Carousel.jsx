import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Carousel = ({ options, children }) => {
  const autoplay = Autoplay({ delay: 3000 });
  const [emblaRef] = useEmblaCarousel(options, [autoplay]);

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex">{children}</div>
    </div>
  );
};

export default Carousel;
