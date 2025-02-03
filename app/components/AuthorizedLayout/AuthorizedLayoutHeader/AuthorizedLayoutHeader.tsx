import { Link, useNavigate } from "@remix-run/react";
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
  const navigate = useNavigate();

  return (
    <header className="bg-orange-300 text-xl flex flex-wrap items-center px-4 py-3 sm:px-6">
      <NavLink
        to="/overview"
        className="font-bold items-center flex text-slate-700 pr-4"
      >
        <span className="bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text text-6xl font-extrabold">
          C
        </span>
        <p>orzhify</p>
      </NavLink>
      <Navigation items={navigationItems} activePage={activePage} />
      {children}

      {/* // TODO implement login/signup buttons, when implemented auth */}

      <div className="flex items-center gap-3 ml-auto">
        <Link
          to={"/cart"}
          className="hover:rounded hover:bg-orange-200 transition-all p-2"
        >
          <Icon.Cart className="h-6 w-6 relative" />
          {cartAmount && (
            <span className="absolute top-5 right-48 bg-white text-sm rounded-full flex items-center justify-center h-[18px] w-[18px]">
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
    </header>
  );
};
