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
    <header className="bg-orange-300 sm:text-xl px-6 sm:py-2 sm:px-24 fixed top-0 left-0 w-full shadow-md z-50 opacity-95">
      <div className="flex items-center">
        <NavLink
          to="/overview"
          className="font-bold items-center flex text-slate-700 pr-4"
        >
          <span className="bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text text-6xl font-extrabold">
            C
          </span>
          <p>orzhify</p>
        </NavLink>

        <button
          className="sm:hidden p-2 hover:rounded hover:bg-orange-200 transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {!isMenuOpen && <Icon.Menu className="h-6 w-6" />}
        </button>

        <div className="hidden sm:flex items-center space-x-4">
          <Navigation items={navigationItems} activePage={activePage} />
        </div>

        {children}

        {/* // TODO: Implemented auth */}

        <div className="flex items-center ml-auto space-x-4">
          <Link
            to={"/cart"}
            className="relative hover:rounded hover:bg-orange-200 transition-all p-2"
          >
            <Icon.Cart className="h-5 w-5 sm:h-6 sm:w-6" />
            {cartAmount && (
              <span className="absolute -top-1 -right-1 bg-white text-xs sm:text-sm rounded-full flex items-center justify-center h-[14px] w-[14px] sm:h-[18px] sm:w-[18px]">
                {cartAmount}
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
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Icon.Close className="h-6 w-6 p-1 ml-auto hover:rounded hover:bg-orange-200 transition-all" />
          </button>

          <Navigation items={navigationItems} activePage={activePage} />
        </div>
      )}
    </header>
  );
};
