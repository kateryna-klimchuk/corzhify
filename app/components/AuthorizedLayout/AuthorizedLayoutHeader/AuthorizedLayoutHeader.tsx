import { NavLink } from "react-router-dom";
import { Button } from "../../Button/Button";
import { Icon } from "../../Icon/Icon";
import {
  Navigation,
  NavigationItemInterface,
} from "../../Navigation/Navigation";
export interface AuthorizedLayoutHeaderInterface {
  navigationItems: NavigationItemInterface[];
  children?: React.ReactNode;
}
export const AuthorizedLayoutHeader: React.FunctionComponent<
  AuthorizedLayoutHeaderInterface
> = ({ navigationItems, children }) => {
  const LoginButton = () => {
    return (
      <div className="flex items-center gap-1">
        <p>Log in</p>
        <Icon.Login className="w-4 h-4" />
      </div>
    );
  };
  return (
    <header className="bg-orange-300 text-xl flex flex-wrap items-center px-4 py-3 sm:px-6">
      <NavLink
        to="/"
        className="font-bold items-center flex text-slate-700 pr-4"
      >
        <span className="bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text text-6xl font-extrabold">
          C
        </span>
        <p>orzhify</p>
      </NavLink>
      {/* <div className="flex-1"> */}
      <Navigation items={navigationItems} />
      {/* </div> */}
      {children}
      <div className="flex items-center gap-3 ml-auto">
        <Button label={<LoginButton />} color="transparent" />
        <Button label="Sign up" color="transparent" />
      </div>
    </header>
  );
};
