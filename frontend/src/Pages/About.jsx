import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white text-gray-800 px-4 sm:px-6 lg:px-12 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Hero */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1 space-y-4">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-600" /> Trusted shopping
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Your everyday essentials, delivered with care.
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              We’re building a smoother, safer, and more delightful shopping journey so you can focus on what matters—great products at honest prices.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-semibold">Secure payments</span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-semibold">Fast delivery</span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-semibold">24/7 support</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            {["Fresh picks", "Daily deals", "Curated sets", "Top rated"].map((item) => (
              <div key={item} className="rounded-2xl border border-green-100 bg-gradient-to-br from-white to-green-50 p-4 shadow-sm text-center text-sm font-semibold text-green-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Stats + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6 sm:p-8 space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Why we started</h3>
            <p className="text-gray-600 leading-relaxed">
              Founded by <span className="font-semibold text-green-700">Kunal Choudhary</span>, our mission is simple: make online shopping as friendly and reliable as your neighborhood store. We obsess over quality, transparency, and responsive support so you always feel taken care of.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
                <p className="text-sm font-semibold text-green-700">Curated catalog</p>
                <p className="text-gray-600 text-sm mt-1">We handpick products to keep quality high and choices clear.</p>
              </div>
              <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
                <p className="text-sm font-semibold text-green-700">Customer-first</p>
                <p className="text-gray-600 text-sm mt-1">From checkout to delivery, we prioritize your peace of mind.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col justify-center gap-4">
            <div>
              <p className="text-3xl font-bold text-green-700">50K+</p>
              <p className="text-gray-600 text-sm">Orders delivered with care</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-700">4.8/5</p>
              <p className="text-gray-600 text-sm">Average customer rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-700">24/7</p>
              <p className="text-gray-600 text-sm">Support that listens</p>
            </div>
          </div>
        </div>

        {/* Promise */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-1 space-y-2">
            <h3 className="text-2xl font-bold">Our promise</h3>
            <p className="text-white/90 leading-relaxed text-sm sm:text-base">
              Clear pricing, reliable delivery, and responsive support. If something isn’t right, we make it right—fast.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <span className="px-4 py-2 rounded-full bg-white text-green-700 font-semibold text-sm">Easy returns</span>
            <span className="px-4 py-2 rounded-full bg-white text-green-700 font-semibold text-sm">Order tracking</span>
            <span className="px-4 py-2 rounded-full bg-white text-green-700 font-semibold text-sm">Secure checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
