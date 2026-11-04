export const ButtonVariants = {
  primary:
    "h-10 shrink-0 bg-[#193247] px-5 text-[12px] text-white transition-colors duration-300 hover:bg-white/85 hover:text-[#193247]",
};

type ButtonProps = {
  children: React.ReactNode;
  variant?: keyof typeof ButtonVariants;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const Button = ({ children, variant = "primary", onClick, type, disabled }: ButtonProps) => {
  return (
    <button
      className={`${ButtonVariants[variant]} cursor-pointer`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
