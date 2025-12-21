import React, { useEffect, useState } from "react";

const banners = [
  "https://designatheme.net/wp-content/uploads/2022/03/beyond-snack1.jpg",
  "https://pushponline.com/wp-content/uploads/2025/12/New-Year-Sale-Website-Banner-899-Offer-25-2.webp",
  "https://www.bisleri.com/on/demandware.static/-/Sites/default/dwe8d1ed76/images/slot/bisleri/Shop-Page-Bisleri-Brand-Banner.jpg",
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mb-8 overflow-hidden bg-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((img, index) => (
          <div
            key={index}
            className="min-w-full flex items-center justify-center bg-gray-900 h-48 sm:h-64 md:h-80 lg:h-96"
          >
            <img
              src={img}
              alt={`banner-${index}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 ${
              index === current 
                ? "bg-white w-6 sm:w-8 h-2 sm:h-3" 
                : "bg-gray-400 w-2 sm:w-3 h-2 sm:h-3 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Left/Right Navigation Arrows (Optional) */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all backdrop-blur-sm"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all backdrop-blur-sm"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default BannerSlider;