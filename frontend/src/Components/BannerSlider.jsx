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
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-8 overflow-hidden bg-gray-900">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((img, index) => (
          <div
            key={index}
            className="min-w-full flex items-center justify-center bg-gray-900 h-96 md:h-[28rem] lg:h-[32rem]"
          >
            <img
              src={img}
              alt={`banner-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-white w-8" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;