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
    red: "bg-red-500 hover:bg-red-600 text-white shadow-sm",
    white: "bg-white border border-gray-300 hover:bg-gray-50 shadow-sm",
    blue: "bg-blue-500 hover:bg-blue-600 text-white shadow-sm",
    green: "bg-primary-500 hover:bg-primary-600 text-white shadow-sm",
    transparent: "border border-gray-300 hover:bg-orange-200/50 text-base backdrop-blur",
  };

  const sizeClasses: Record<ButtonSizeType, string> = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-2.5 text-lg",
  };
  return (
    <button
      className={`rounded-lg ${colorClasses[color]} ${sizeClasses[size]} transition-all duration-200 cursor-pointer font-medium`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
