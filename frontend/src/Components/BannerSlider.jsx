import React, { useEffect, useState } from "react";

const banners = [
    "https://cdn.zeptonow.com/production/tr:w-1280,ar-2560-640,pr-true,f-auto,q-80/inventory/banner/257473f7-74bb-439a-915f-6c18d1545cd1.png",
  "https://imgs.search.brave.com/8twfEGvhZtH7SMWijgfoZ3m8yJY_ew6xij0DcekSW2w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/YnJhbmRmZXRjaC5p/by9iYWxhaml3YWZl/cnMuY29tL2ZhbGxi/YWNrL3RyYW5zcGFy/ZW50L3cvNjAwL2gv/MjAwL2Jhbm5lcj9j/PTFiZndzbUVIMjB6/ekVmU05UZWQ",
  "https://imgs.search.brave.com/xEfJ3NbAQSmYWqUmu0IRh5fbeAjBAtGi9Cd8ymJx2JE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YmV5b25kc25hY2su/aW4vY2RuL3Nob3Av/ZmlsZXMvU29jaWFs/X0Jhbm5lcl81Lmpw/Zz92PTE3NDU5MjQ3/OTkmd2lkdGg9MTY0/MA",
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
    <div className="mb-8 overflow-hidden rounded-2xl shadow-lg bg-gray-100">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((img, index) => (
          <div
            key={index}
            className="
              w-full
              h-40
              sm:h-56
              md:h-72
              lg:h-80
              flex
              items-center
              justify-center
              flex-shrink-0
            "
          >
            <img
              src={img}
              alt="banner"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
