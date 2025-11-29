import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

const Radio = ({ label, id = "radio-btn", ...props }: Props) => {
  return (
    <div className="flex items-center">
      <input id={id} type="radio" {...props} />
      {label && (
        <label
          htmlFor={id}
          className="select-none ms-1 text-sm font-medium text-heading"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Radio;
