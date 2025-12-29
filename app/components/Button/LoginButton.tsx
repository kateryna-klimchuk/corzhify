import { Icon } from "../Icon/Icon";
import { Button } from "./Button";
import { useNavigate } from "@remix-run/react";
import { useAuth } from "~/contexts/AuthContext";

export const LoginButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/50 dark:bg-gray-700/50 rounded-lg">
          {user.image ? (
            <img
              src={user.image}
              alt={user.firstName}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <Icon.User className="w-5 h-5 dark:text-gray-200" />
          )}
          <span className="text-sm font-medium text-slate-700 dark:text-gray-100">
            {user.firstName}
          </span>
        </div>
        <Button
          label={<LogoutButtonLabel />}
          color="transparent"
          onClick={logout}
          type="button"
        />
      </div>
    );
  }

  return (
    <Button
      label={<LoginButtonLabel />}
      color="transparent"
      onClick={() => navigate("/login")}
      type="button"
    />
  );
};

const LoginButtonLabel = () => {
  return (
    <div className="flex items-center gap-1 dark:text-gray-100">
      <p className="hidden md:block">Log in</p>
      <Icon.Login className="w-4 h-4" />
    </div>
  );
};

const LogoutButtonLabel = () => {
  return (
    <div className="flex items-center gap-1 dark:text-gray-100">
      <p className="hidden md:block">Log out</p>
      <Icon.LogOut className="w-4 h-4" />
    </div>
  );
};
