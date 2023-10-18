import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: "primary" | "secondary" | "accent";
}

export const Button = ({
  color = "primary",
  children,
  ...props
}: ButtonProps) => {
  const colorVariants = {
    primary: "text-primary-400 border-primary-400",
    secondary: "text-secondary-400 border-secondary-400",
    accent: "text-accent-400 border-accent-400",
  };
  return (
    <button
      className={`px-3 py-2 text-xl border ${colorVariants[color]} rounded-md hover:animate-borderFlicker group`}
      {...props}
    >
      <div className="group-hover:animate-flicker flex items-center justify-center gap-2">
        {children}
      </div>
    </button>
  );
};
