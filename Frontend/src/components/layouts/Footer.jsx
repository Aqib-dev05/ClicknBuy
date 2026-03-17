import Logo from "../../assets/logo.webp";
import Button from "./Button";
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"

export default function Footer() {
   
   const {isAuthenticated} = useSelector(state => state.auth)
  

  return (
    <footer className=" w-full bg-black text-gray-200">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8 ">
        {/* Col 1 */}
        <div className="space-y-4 ">
         <Link to={"/"}>
          <div className="flex items-center bg-white p-1  w-fit">
            <img src={Logo} alt="Logo" className="h-15 w-15 object-contain" />
          </div>
         </Link>
         {/* my links like github, linkedIn, */}
         <div>

         </div>
       

        
        </div>
        {/* Col 2 */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-white">Account</p>
          <ul className="space-y-2 text-sm text-gray-400">
           {isAuthenticated ? (
              <li>
                <Link className="transition hover:text-white" to="/profile">
                  Profile
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link className="transition hover:text-white" to="/login">Login</Link>
                </li>
                <li>
                  <Link className="transition hover:text-white" to="/register">Sign Up</Link>
                </li>
              </>
            )}
            <li>
              <Link className="transition hover:text-white" to="/cart">
                Cart
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" to="/wishlist">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-white">Important Links</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link className="transition hover:text-white" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" to="/products">
                Products
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" to="/categories">
                Categories
              </Link>
            </li>
            <li>
              <a className="transition hover:text-white" href="/subcategories">
                Sub Categories
              </a>
            </li>
           
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-white">Quick Links</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link className="transition hover:text-white" to="/faq">
                FAQ
              </Link>
            </li>
            
            <li>
              <Link className="transition hover:text-white" to="/terms-and-conditions">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" to="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
             <li>
              <Link className="transition hover:text-white" to="/about">
                About Us
              </Link>
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
