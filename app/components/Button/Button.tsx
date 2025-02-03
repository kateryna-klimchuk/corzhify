export type ButtonColorType =
  | "red"
  | "white"
  | "blue"
  | "green"
  | "transparent";
export type ButtonSizeType = "small" | "medium" | "large";
export interface ButtonInterface {
  size?: ButtonSizeType;
  color?: ButtonColorType;
  label?: string | React.ReactNode;
  onClick?: () => void;
}
export const Button: React.FunctionComponent<ButtonInterface> = ({
  size = "small",
  color = "green",
  label = "Submit",
  onClick,
}) => {
  const colorClasses: Record<ButtonColorType, string> = {
    red: "bg-red-500 text-white",
    white: "bg-white border border-gray-300 hover:bg-gray-100",
    blue: "bg-blue-500 text-white",
    green: "bg-green-500 text-white",
    transparent: "border border-gray-300 hover:bg-orange-200 text-lg",
  };

  const sizeClasses: Record<ButtonSizeType, string> = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-1 text-base",
    large: "px-6 py-2 text-lg",
  };
  return (
    <button
      className={`rounded ${colorClasses[color]} ${sizeClasses[size]} hover:opacity-90 transition-all cursor-pointer`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
