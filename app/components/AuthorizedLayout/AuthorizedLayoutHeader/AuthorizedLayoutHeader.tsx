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
    <header className="bg-orange-300 sm:text-xl px-4 sm:py-3 sm:px-6">
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

        <div className="hidden sm:flex items-center ml-auto space-x-4">
          <Navigation items={navigationItems} activePage={activePage} />
        </div>

        {children}

        {/* // TODO: Implemented auth */}

        <div className="flex items-center ml-auto space-x-4">
          <Link
            to={"/cart"}
            className="hover:rounded hover:bg-orange-200 transition-all p-2"
          >
            <Icon.Cart className="h-5 w-5 sm:h-6 sm:w-6 relative" />
            {cartAmount && (
              <span className="absolute top-3 right-48 sm:top-5 bg-white text-xs sm:text-sm rounded-full flex items-center justify-center h-[14px] w-[14px]">
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
        <div className="sm:hidden flex flex-col mt-2 border-t-2 pb-2">
          <button className="pt-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Icon.Close className="h-4 w-4 ml-auto hover:rounded hover:bg-orange-200 transition-all" />
          </button>

          <Navigation items={navigationItems} activePage={activePage} />
        </div>
      )}
    </header>
  );
};
