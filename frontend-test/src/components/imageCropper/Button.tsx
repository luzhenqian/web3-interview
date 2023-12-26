type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  [x: string]: any;
};

export default function Button({
  onClick,
  children,
  className,
  as,
  ...props
}: ButtonProps) {
  const Component = as || "button";
  return (
    <Component
      className={`px-3 py-2 m-2 text-black bg-yellow-300 hover:bg-yellow-500 rounded-3xl text-sm ${className}`}
      onClick={(e: any) => onClick?.(e)}
      {...props}
    >
      {children}
    </Component>
  );
}
