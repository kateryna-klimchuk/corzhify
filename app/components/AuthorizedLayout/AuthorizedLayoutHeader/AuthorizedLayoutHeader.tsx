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

  return (
    <header className="bg-orange-300/95 backdrop-blur-md sm:text-xl px-6 sm:py-2 sm:px-24 fixed top-0 left-0 w-full shadow-lg z-50 border-b border-orange-400/20">
      <div className="flex items-center">
        <NavLink
          to="/overview"
          className="font-bold items-center flex text-slate-700 pr-4 hover:opacity-80 transition-opacity"
          aria-label="Home - Corzhify"
        >
          <span className="bg-gradient-to-r from-secondary-500 to-yellow-500 text-transparent bg-clip-text text-6xl font-extrabold">
            C
          </span>
          <p>orzhify</p>
        </NavLink>

        <button
          className="sm:hidden p-2 rounded-lg hover:bg-orange-200 transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {!isMenuOpen && <Icon.Menu className="h-6 w-6" />}
        </button>

        <div className="hidden sm:flex items-center space-x-4">
          <Navigation items={navigationItems} activePage={activePage} />
        </div>

        {children}

        {/* // TODO: Implemented auth */}

        <div className="flex items-center ml-auto space-x-2 sm:space-x-4">
          <Link
            to={"/cart"}
            className="relative p-2 rounded-lg hover:bg-orange-200/80 transition-all flex items-center justify-center"
            aria-label={`Shopping cart${cartAmount && cartAmount > 0 ? ` with ${cartAmount} items` : ""}`}
          >
            <Icon.Cart className="h-5 w-5 sm:h-6 sm:w-6" />
            {cartAmount !== undefined && cartAmount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px] px-1 shadow-md">
                {cartAmount > 99 ? '99+' : cartAmount}
              </span>
            )}
          </Link>
          <LoginButton />
          <Button
            label="Sign up"
            color="transparent"
            onClick={() => navigate("/signup")}
          />
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden flex flex-col mt-2 border-gray-300 border-t-[1px] py-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Close menu"
          >
            <Icon.Close className="h-6 w-6 p-1 ml-auto rounded-lg hover:bg-orange-200 transition-all" />
          </button>

          <Navigation items={navigationItems} activePage={activePage} />
        </div>
      )}
    </header>
  );
};
