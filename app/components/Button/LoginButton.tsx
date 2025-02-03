import { Icon } from "../Icon/Icon";
import { Button } from "./Button";
import { useNavigate } from "@remix-run/react";

export const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      label={<LoginButtonLabel />}
      color="transparent"
      onClick={() => navigate("/login")}
    />
  );
};

const LoginButtonLabel = () => {
  return (
    <div className="flex items-center gap-1">
      <p>Log in</p>
      <Icon.Login className="w-4 h-4" />
    </div>
  );
};
