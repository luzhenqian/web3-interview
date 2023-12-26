type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children: React.ReactNode;
};

export default function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button
      className={`px-3 py-2 m-2 text-black bg-yellow-300 hover:bg-yellow-500 rounded-3xl text-sm ${className}`}
      onClick={(e) => onClick?.(e)}
    >
      {children}
    </button>
  );
}
