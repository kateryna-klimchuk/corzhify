import { Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "~/components/Button/Button";
import { LoginButton } from "~/components/Button/LoginButton";
import { Icon } from "~/components/Icon/Icon";
import {
  Navigation,
  NavigationItemInterface,
} from "../../Navigation/Navigation";
import { useAuth } from "~/contexts/AuthContext";
import { ThemeToggle } from "~/components/ThemeToggle/ThemeToggle";
import { useWishlist } from "~/contexts/WishlistContext";
export interface AuthorizedLayoutHeaderInterface {
  navigationItems: NavigationItemInterface[];
  activePage: string;
  children?: React.ReactNode;
  cartAmount?: number;
}
export const AuthorizedLayoutHeader: React.FunctionComponent<
  AuthorizedLayoutHeaderInterface
> = ({ navigationItems, children, activePage, cartAmount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { getWishlistCount } = useWishlist();
  const wishlistCount = getWishlistCount();

  return (
    <header className="bg-orange-300/95 dark:bg-gray-800/95 backdrop-blur-md py-2 fixed top-0 left-0 w-full shadow-lg z-50 border-b border-orange-400/20 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo and Navigation grouped together on left */}
        <div className="flex items-center gap-4 sm:gap-6">
          <NavLink
            to="/overview"
            className="font-bold items-center flex text-slate-700 dark:text-gray-100 hover:opacity-80 transition-opacity shrink-0"
            aria-label="Home - Corzhify"
          >
            <span className="bg-gradient-to-r from-secondary-500 to-yellow-500 text-transparent bg-clip-text text-4xl sm:text-6xl font-extrabold">
              C
            </span>
            <p className="text-sm sm:text-xl">orzhify</p>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center">
            <Navigation items={navigationItems} activePage={activePage} />
          </div>
        </div>

        {children}

        {/* Right side icons and buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* TODO: Re-enable search when functionality is ready */}
          {/* <Link
            to="/search"
            className="p-1.5 sm:p-2 rounded-lg hover:bg-orange-200/80 dark:hover:bg-gray-700 transition-all flex items-center justify-center"
            aria-label="Search products"
          >
            <Icon.Search className="h-5 w-5 sm:h-6 sm:w-6 dark:text-gray-200" />
          </Link> */}
          <ThemeToggle />
          <Link
            to="/wishlist"
            className="relative p-1.5 sm:p-2 rounded-lg hover:bg-orange-200/80 dark:hover:bg-gray-700 transition-all flex items-center justify-center"
            aria-label={`Wishlist${wishlistCount > 0 ? ` with ${wishlistCount} items` : ""}`}
          >
            <Icon.Heart className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-500" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-secondary-500 text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] px-0.5 sm:px-1 shadow-md">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative p-1.5 sm:p-2 rounded-lg hover:bg-orange-200/80 dark:hover:bg-gray-700 transition-all flex items-center justify-center"
            aria-label={`Shopping cart${cartAmount && cartAmount > 0 ? ` with ${cartAmount} items` : ""}`}
          >
            <Icon.Cart className="h-5 w-5 sm:h-6 sm:w-6 dark:text-gray-200" />
            {cartAmount !== undefined && cartAmount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] px-0.5 sm:px-1 shadow-md">
                {cartAmount > 99 ? "99+" : cartAmount}
              </span>
            )}
          </Link>

          {/* Desktop auth buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            <LoginButton />
            {!isAuthenticated && (
              <Button
                label="Sign up"
                color="transparent"
                onClick={() => navigate("/signup")}
                type="button"
              />
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-1.5 rounded-lg hover:bg-orange-200 dark:hover:bg-gray-700 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <Icon.Close className="h-5 w-5 dark:text-gray-200" />
            ) : (
              <Icon.Menu className="h-5 w-5 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-full right-3 mt-2 w-48 bg-orange-200 dark:bg-gray-800 rounded-lg shadow-lg border border-orange-300 dark:border-gray-700 p-3">
          <Navigation items={navigationItems} activePage={activePage} />

          {/* Mobile auth buttons */}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-orange-300 dark:border-gray-600">
            {isAuthenticated ? (
              <Button
                label="Log out"
                color="transparent"
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                }}
                type="button"
                size="small"
              />
            ) : (
              <>
                <Button
                  label="Log in"
                  color="transparent"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/login");
                  }}
                  type="button"
                  size="small"
                />
                <Button
                  label="Sign up"
                  color="primary"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/signup");
                  }}
                  type="button"
                  size="small"
                />
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
