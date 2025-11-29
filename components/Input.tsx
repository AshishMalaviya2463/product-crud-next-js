"use client";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  containerClassName?: string;
}

export default function Input({
  label,
  error,
  className = "",
  containerClassName = "",
  ...rest
}: Props) {
  return (
    <div
      className={`mb-3 w-full${
        containerClassName ? ` ${containerClassName}` : ""
      }`}
    >
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <input
        {...rest}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      {error && <p className="text-red-500! text-sm mt-1">{error}</p>}
    </div>
  );
}
