import Logo from "../../assets/logo.webp";
import { useEffect, useState } from "react";
import { Heart, House, ShoppingBasket, ShoppingCart, User } from "lucide-react";
import SearchBar from "../layouts/SearchBar";
import {Link} from "react-router-dom"

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [enterHeart, setEnterHeart] = useState(false);

  function handleMouseEnter() {
    setEnterHeart(true);
  }

  function handleMouseLeave() {
    setEnterHeart(false);
  }

  useEffect(() => {
    function changeMobile() {
      setIsMobile(window.innerWidth < 767);
    }
    changeMobile();
    window.addEventListener("resize", changeMobile);
    return () => window.removeEventListener("resize", changeMobile);
  }, []);

  return (
    <header>
    <nav className="sticky top-0 left-0 z-[100] w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full items-center justify-between px-2 py-2 md:px-4 lg:px-6 xl:px-16">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
          />
        </div>

        {!isMobile && (
          <ul className="mx-auto items-center gap-4 lg:gap-8  text-[15px] font-medium text-gray-700 flex">
            <li className="cursor-pointer border-b-2 border-transparent pb-1 transition hover:border-gray-900 hover:text-gray-900">
              <Link to={"/"} >Home</Link>
            </li>
            <li className="cursor-pointer border-b-2 border-transparent pb-1 transition hover:border-gray-900 hover:text-gray-900">
              <Link to={"/products"} >Products</Link>
            </li>
            <li className="cursor-pointer border-b-2 border-transparent pb-1 transition hover:border-gray-900 hover:text-gray-900">
              <Link  to={"/categories"}>Categories</Link>
            </li>
            <li className="cursor-pointer border-b-2 border-transparent pb-1 transition hover:border-gray-900 hover:text-gray-900">
              <Link to={"/Register"}>Sign Up</Link>
            </li>
          </ul>
        )}

        <div className="flex items-center gap-2 lg:gap-3">
          <SearchBar />

          {!isMobile && (
            <div className="flex items-center gap-1">
              <Link
                to={"/wishlist"}
                type="button"
                className="rounded-md p-1 lg:p-2 text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                aria-label="Wishlist"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Heart
                  className="h-5 w-5"
                  fill={enterHeart ? "red" : "none"}
                  stroke={enterHeart ? "red" : "currentColor"}
                />
              </Link>

              <Link
                to={"/cart"}
                type="button"
                className="rounded-md p-1 lg:p-2 text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </div>

     
    </nav>
    {isMobile && (
        <nav className="fixed bottom-0 left-0 z-[100] w-full border-t border-gray-200 bg-white">
          <ul className="flex items-center justify-around py-1 text-sm font-medium text-gray-700">
            <li>
              <Link
                to={"/"}
                type="button"
                className="rounded-md p-2 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                aria-label="Home"
              >
                <House className="h-6 w-6" />
              </Link>
            </li>
            <li>
              <Link
                to={"/products"}
                type="button"
                className="rounded-md p-2 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                aria-label="Products"
              >
                <ShoppingBasket className="h-6 w-6" />
              </Link>
            </li>
            <li>
              <Link
                to={"/cart"}
                type="button"
                className="rounded-md p-2 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                aria-label="Cart"
              >
                <ShoppingCart className="h-6 w-6" />
              </Link>
            </li>
            <li>
              <Link
                to={"/profile"}
                type="button"
                className="rounded-md p-2 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                aria-label="Account"
              >
                <User className="h-6 w-6" />
              </Link>
            </li>
          </ul>
        </nav>
      )}
  </header>
  );
}