import Logo from "../../assets/logo.webp";
import Button from "./Button";
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import MyLinks from "../../data/myInfo"

export default function Footer() {

  const { isAuthenticated } = useSelector(state => state.auth)


  return (
    <footer className=" w-full bg-black text-gray-200">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8 ">
        {/* Col 1 */}
        <div className="space-y-4 flex flex-col ">
          <NavLink to={"/"}>
            <div className="flex items-center bg-white rounded-2xl p-1 ml-12 w-fit">
              <img src={Logo} alt="Logo" className="h-15 w-15  object-contain" />
            </div>
          </NavLink>
          <div className="flex  items-center gap-3 mt-2 ">
            {MyLinks.map((link, index) => (
              <span key={index + 1} className="w-12 h-12 rounded-full hover:bg-red-600 transition-colors duration-200 hover:text-white bg-gray-800 flex items-center justify-center ">
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              </span>
            ))}
          </div>



        </div>
        {/* Col 2 */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-white">Account</p>
          <ul className="space-y-2 text-sm text-gray-400">
            {isAuthenticated ? (
              <li>
                <NavLink className="transition hover:text-white" to="/profile">
                  Profile
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink className="transition hover:text-white" to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink className="transition hover:text-white" to="/register">Sign Up</NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink className="transition hover:text-white" to="/cart">
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink className="transition hover:text-white" to="/wishlist">
                Wishlist
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-white">Important NavLinks</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <NavLink className="transition hover:text-white" to="/contact">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink className="transition hover:text-white" to="/products">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink className="transition hover:text-white" to="/categories">
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink className="transition hover:text-white" to="/subcategories">
                Sub Categories
              </NavLink>
            </li>

          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-white">Quick NavLinks</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <NavLink className="transition hover:text-white" to="/faq">
                FAQ
              </NavLink>
            </li>

            <li>
              <NavLink className="transition hover:text-white" to="/terms-and-conditions">
                Terms &amp; Conditions
              </NavLink>
            </li>
            <li>
              <NavLink className="transition hover:text-white" to="/privacy-policy">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink className="transition hover:text-white" to="/about">
                About Us
              </NavLink>
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
