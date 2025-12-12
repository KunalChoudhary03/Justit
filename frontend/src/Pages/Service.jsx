import React from "react";

const Service = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14 lg:py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-100">
            Our Services
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Great products, better experience
          </h1>
          <p className="mt-3 max-w-2xl text-green-100/90">
            From doorstep delivery to easy returns, we make shopping simple and reliable.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12 lg:py-14 space-y-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Fast Delivery",
              desc: "Pan-India shipping with real-time tracking and reliable partners.",
            },
            {
              title: "Easy Returns",
              desc: "Hassle-free returns within the policy window—no complicated steps.",
            },
            {
              title: "Secure Payments",
              desc: "Encrypted checkout with cards, UPI, wallets, and COD where available.",
            },
            {
              title: "Quality Assurance",
              desc: "Curated products with multiple quality checks before dispatch.",
            },
            {
              title: "Customer Support",
              desc: "Friendly support for orders, returns, and product guidance.",
            },
            {
              title: "Deals & Offers",
              desc: "Seasonal sales, coupons, and member-only price drops.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Why shop with us?</h3>
            <p className="mt-3 text-sm text-gray-600">
              We focus on trustworthy delivery, transparent pricing, and quick support so your shopping
              stays smooth from browse to doorstep.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• Curated catalog with vetted suppliers</li>
              <li>• On-time delivery with proactive updates</li>
              <li>• Clear return and refund policies</li>
              <li>• Secure payments and data protection</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Service coverage</h3>
            <p className="mt-3 text-sm text-gray-600">
              We’re expanding rapidly across metros and tier-2 cities. Check availability at checkout
              for precise delivery estimates in your area.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-700">
              <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">
                Metro delivery
              </span>
              <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">
                Tier-2 coverage
              </span>
              <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">
                COD eligible zones
              </span>
              <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">
                Priority slots
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-green-600 px-6 py-7 text-white shadow-sm sm:px-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Need help with an order?</h3>
            <p className="mt-2 text-sm text-green-100">
              Reach out for order status, returns, or product questions. We’re here to assist.
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <a
              href="/contact"
              className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-green-600"
            >
              Contact support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
