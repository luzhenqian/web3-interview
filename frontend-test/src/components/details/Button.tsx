type ButtonProps = {
  children: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function Button({ children, rightIcon }: ButtonProps) {
  return (
    <button
      className={`flex justify-center items-center bg-[#2081E2] text-white rounded-lg`}
    >
      <span className={`py-2 px-14 font-semibold`}>{children}</span>

      {rightIcon && (
        <span className="w-12 h-10 flex items-center justify-center border-l-[2px] border-white rounded-r-lg">
          {rightIcon}
        </span>
      )}
    </button>
  );
}
