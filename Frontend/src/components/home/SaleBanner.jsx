import Button from "../layouts/Button";
import heroImage from "../../assets/Frame 694.png";

export default function HeroSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-10 sm:px-6 md:flex-row md:py-16 lg:px-8">
        {/* Left: Text */}
        <div className="flex-1 space-y-5 text-center md:text-left">
          <p className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[rgb(219,68,68)]">
            New Season · New Deals
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Discover Products
            <span className="block text-[rgb(219,68,68)]">You’ll Love to Use</span>
          </h1>

          <p className="max-w-xl text-sm text-gray-600 sm:text-base md:max-w-md">
            Shop curated collections, best-selling categories, and exclusive offers.
            Fast delivery, secure checkout, and smart filters to find exactly what you
            need.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
            <Button text="Shop Now" varient="default" className="w-full sm:w-auto" />
            <Button
              text="Browse Categories"
              varient="outlined"
              className="w-full sm:w-auto text-sm sm:text-base"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 sm:text-sm md:justify-start">
            <div>
              <span className="font-semibold text-gray-900">Free Shipping</span>
              <span className="ml-1">on orders over $50</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Secure Payments</span>
              <span className="ml-1">with trusted providers</span>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1">
          <div className="relative mx-auto max-w-sm rounded-3xl bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6 shadow-xl sm:p-8">
            <div className="absolute -left-6 -top-6 h-16 w-16 rounded-full bg-[rgb(219,68,68)]/80 blur-2xl" />
            <div className="absolute -right-8 bottom-0 h-20 w-20 rounded-full bg-red-400/60 blur-2xl" />

            <img
              src={heroImage}
              alt="Featured products"
              className="relative z-10 mx-auto h-52 w-full max-w-xs object-contain sm:h-64"
            />

            <div className="relative z-10 mt-4 rounded-2xl bg-white/5 p-3 text-xs text-gray-100 sm:text-sm">
              <p className="font-semibold">Today’s Highlight</p>
              <p className="text-gray-300">
                Up to <span className="font-bold text-yellow-300">40% OFF</span> on
                selected categories. Limited time only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

