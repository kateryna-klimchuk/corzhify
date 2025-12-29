export type ButtonColorType =
  | "red"
  | "white"
  | "blue"
  | "green"
  | "primary"
  | "transparent";
export type ButtonSizeType = "small" | "medium" | "large";
export interface ButtonInterface {
  size?: ButtonSizeType;
  color?: ButtonColorType;
  label?: string | React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
export const Button: React.FunctionComponent<ButtonInterface> = ({
  size = "small",
  color = "green",
  label = "Submit",
  onClick,
  disabled = false,
  type = "submit",
}) => {
  const colorClasses: Record<ButtonColorType, string> = {
    red: "bg-red-500 hover:bg-red-600 text-white shadow-sm",
    white: "bg-white border border-gray-300 hover:bg-gray-50 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-gray-100",
    blue: "bg-blue-500 hover:bg-blue-600 text-white shadow-sm",
    green: "bg-primary-500 hover:bg-primary-600 text-white shadow-sm",
    primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-sm",
    transparent: "border border-gray-300 dark:border-gray-600 hover:bg-orange-200/50 dark:hover:bg-gray-700 text-base dark:text-gray-100 backdrop-blur",
  };

  const sizeClasses: Record<ButtonSizeType, string> = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-2.5 text-lg w-full",
  };
  return (
    <button
      type={type}
      className={`rounded-lg ${colorClasses[color]} ${sizeClasses[size]} transition-all duration-200 font-medium ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
