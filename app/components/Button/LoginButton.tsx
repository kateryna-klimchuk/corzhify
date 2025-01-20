import { Icon } from "../Icon/Icon";
import { Button } from "./Button";

export const LoginButton = () => {
  return <Button label={<LoginButtonLabel />} color="transparent" />;
};

const LoginButtonLabel = () => {
  return (
    <div className="flex items-center gap-1">
      <p>Log in</p>
      <Icon.Login className="w-4 h-4" />
    </div>
  );
};
