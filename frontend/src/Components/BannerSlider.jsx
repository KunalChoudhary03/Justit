import React, { useEffect, useState } from "react";

const banners = [
  "https://cdn.zeptonow.com/production/tr:w-1280,ar-2560-640,pr-true,f-auto,q-80/inventory/banner/257473f7-74bb-439a-915f-6c18d1545cd1.png",
  "https://imgs.search.brave.com/kT35LCgWoGJ2gllRlLgNKaba2sN2PwirEzGph5YgTpc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RzLzQwNC9h/MmVjNWQyMjIxNTEy/ODEuWTNKdmNDd3hN/RGt6TERnMU5TdzRO/VGNzTUEucG5n",
  "https://cdn.zeptonow.com/production/tr:w-1280,ar-2560-640,pr-true,f-auto,q-80/inventory/banner/257473f7-74bb-439a-915f-6c18d1545cd1.png",
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
    <div className="mb-8 overflow-hidden rounded-3xl shadow-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="banner"
            className="
              w-full
              h-40
              sm:h-56
              md:h-72
              lg:h-80
              object-cover
              flex-shrink-0
            "
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
