import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14 lg:py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-100">
            Contact Us
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            We’d love to hear from you
          </h1>
          <p className="mt-3 max-w-2xl text-green-100/90">
            Questions, feedback, or support - reach us anytime.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Info cards */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Visit us</h3>
              <p className="mt-2 text-sm text-gray-600">
                JustIT HQ <br />
                Vijay Nagar <br />
                Indore, M.P., India
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
              <p className="mt-2 text-sm text-gray-600">
                Email:{" "}
                <a
                  className="text-green-600 hover:underline"
                  href="mailto:kunalchoudharyhack@gmail.com"
                >
                  kunalchoudharyhack@gmail.com
                </a>
                <br />
                Phone:{" "}
                <a
                  className="text-green-600 hover:underline"
                  href="tel:+9101125532553"
                >
                  +91 01125532553
                </a>
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Hours</h3>
              <p className="mt-2 text-sm text-gray-600">
                Mon–Fri: 9:00 AM – 7:00 PM <br />
                Sat: 10:00 AM – 5:00 PM <br />
                Sunday & Holidays: Closed
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Quick support</h3>
              <p className="mt-2 text-sm text-gray-600">
                For order issues, share your order ID. For returns, mention product
                name and purchase date.
              </p>
            </div>
          </div>

          {/* Empty Space Instead of Form */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-gray-100 text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Need help?
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Contact us directly using email or phone.  
                We reply within one business day.
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Prefer talking?</h3>
            <p className="mt-2 text-sm text-gray-600">
              Call us at{" "}
              <a
                className="text-green-600 hover:underline"
                href="tel:+9101125532553"
              >
                +91 01125532553
              </a>{" "}
              or email{" "}
              <a
                className="text-green-600 hover:underline"
                href="mailto:kunalchoudharyhack@gmail.com"
              >
                kunalchoudharyhack@gmail.com
              </a>
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
              <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">
                Orders & Delivery
              </span>
              <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">
                Returns & Refunds
              </span>
              <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">
                Product Support
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4208.112128575939!2d75.86491477583454!3d22.694769879404824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fce47dec0805%3A0x331b298a7dc1d08e!2sVijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452001!5e1!3m2!1sen!2sin!4v1765546913285!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
