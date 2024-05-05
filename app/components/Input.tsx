import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

const TextInput = ({ name, label, ...rest }: Props) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block">
          {label}
        </label>
      )}
      <input
        type="text"
        name={name}
        id={name}
        className="w-full border rounded px-3 py-2 invalid:outline-pink-500 invalid:text-pink-600
        focus:invalid:outline-pink-500 focus:invalid:ring-pink-500"
        {...rest}
      />
    </div>
  );
};

export default TextInput;
