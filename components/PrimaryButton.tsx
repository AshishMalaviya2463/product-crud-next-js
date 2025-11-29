import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const PrimaryButton = ({ children, className = "", ...rest }: Props) => {
  return (
    <button
      className={`relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none rounded-lg outline-none cursor-pointer ${className}`}
      {...rest}
    >
      <span className=" relative px-4 py-2.5 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5 text-white! font-bold text-xl">
        {children}
      </span>
    </button>
  );
};

export default PrimaryButton;
