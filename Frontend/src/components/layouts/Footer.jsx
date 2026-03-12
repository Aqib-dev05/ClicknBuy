import Logo from "../../assets/logo.webp";
import Button from "./Button";

export default function Footer() {
  function handleSubscribe(e) {
    e.preventDefault();
  }

  return (
    <footer className="mt-10 w-full bg-black text-gray-200">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8 ">
        {/* Col 1 */}
        <div className="space-y-4 ">
          <div className="flex items-center bg-white p-1  w-fit">
            <img src={Logo} alt="Logo" className="h-15 w-15 object-contain" />
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold text-white">
              Subscribe to our newsletter
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full items-center gap-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="h-10 w-full rounded-md border border-white/15 bg-white/5 px-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-white/30 focus:ring-2 focus:ring-white/20"
              />
              <Button
                text="Subscribe"
                type="submit"
                varient="blacked"
                className="h-10  text-sm"
              />
            </form>
          </div>
        </div>
        {/* Col 2 */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-white">Account</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a className="transition hover:text-white" href="/login">
                Login
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="/signup">
                Sign Up
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="/cart">
                Cart
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="/wishlist">
                Wishlist
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-white">Important Links</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a className="transition hover:text-white" href="/products">
                Products
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="/categories">
                Categories
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="/subcategories">
                Sub Categories
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="/orders">
                Orders
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-white">Quick Links</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a className="transition hover:text-white" href="/faq">
                FAQ
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="/contact">
                Contact
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="/terms">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="/privacy">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-gray-400 sm:flex-row sm:px-6 lg:px-8">
          <p className=" mx-auto">
            © {new Date().getFullYear()} Ecommerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
