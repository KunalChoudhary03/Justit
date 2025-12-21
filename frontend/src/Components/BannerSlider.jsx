import React, { useEffect, useState } from "react";

const banners = [
  "https://designatheme.net/wp-content/uploads/2022/03/beyond-snack1.jpg",
  "https://imgs.search.brave.com/_avl6ib_xI5KxGy1ylcUH2Q3YGubUDI0ctxRMtwz13k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wdXNo/cG9ubGluZS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjUv/MTIvV2ludGVyLVNh/bGUtV2Vic2l0ZS1C/YW5uZXItNDk5LU9m/ZmVyLTI1LTIud2Vi/cA",
  "https://imgs.search.brave.com/-96ofbMS48FB7_ArvgkmAVMXSpiZjEVd-Pzy2pn3eaI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Ym9hdC1saWZlc3R5/bGUuY29tL2Nkbi9z/aG9wL2FydGljbGVz/L0Jhbm5lcl8yLnBu/Zz92PTE2NTMxMjA1/MjU",
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
    <div className="mb-8 overflow-hidden rounded-xl shadow-lg bg-gray-100">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((img, index) => (
          <div
            key={index}
            className="min-w-full flex items-center justify-center bg-gray-100"
          >
            <img
              src={img}
              alt={`banner-${index}`}
              className="w-full h-auto max-h-80 sm:max-h-96 md:max-h-[24rem] lg:max-h-[28rem] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
