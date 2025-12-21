import React, { useEffect, useState } from "react";

const banners = [
  "https://imgs.search.brave.com/_avl6ib_xI5KxGy1ylcUH2Q3YGubUDI0ctxRMtwz13k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wdXNo/cG9ubGluZS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjUv/MTIvV2ludGVyLVNh/bGUtV2Vic2l0ZS1C/YW5uZXItNDk5LU9m/ZmVyLTI1LTIud2Vi/cA",
  "https://imgs.search.brave.com/-96ofbMS48FB7_ArvgkmAVMXSpiZjEVd-Pzy2pn3eaI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Ym9hdC1saWZlc3R5/bGUuY29tL2Nkbi9z/aG9wL2FydGljbGVz/L0Jhbm5lcl8yLnBu/Zz92PTE2NTMxMjA1/MjU",
  "https://designatheme.net/wp-content/uploads/2022/03/beyond-snack1.jpg",
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
        style={{ width: `${banners.length * 100}%`, transform: `translateX(-${current * (100 / banners.length)}%)` }}
      >
        {banners.map((img, index) => (
          <div
            key={index}
            className="w-full flex items-center justify-center"
          >
            <img
              src={img}
              alt="banner"
              className="
                w-full
                h-40
                sm:h-56
                md:h-72
                lg:h-80
                object-contain
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
