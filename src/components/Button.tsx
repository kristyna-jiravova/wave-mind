import { ReactNode, ComponentPropsWithoutRef } from "react";

export const ButtonVariants = {
  primary:
    "h-10 shrink-0 bg-[#193247] px-5 text-[12px] text-white transition-colors duration-300 hover:bg-white/85 hover:text-[#193247]",
};

type ButtonProps = {
  children: ReactNode;
  variant?: keyof typeof ButtonVariants;
  onClick?: () => void;
} & Omit<ComponentPropsWithoutRef<"button">, "onClick" | "children">;

export const Button = ({ children, variant = "primary", onClick, ...props }: ButtonProps) => {
  return (
    <button className={`${ButtonVariants[variant]} cursor-pointer`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
