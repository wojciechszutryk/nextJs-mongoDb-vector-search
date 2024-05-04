import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

const TextInput = ({
  value,
  onChange,
  label,
  name,
  required,
  min,
  max,
}: Props) => {
  return (
    <div>
      <label htmlFor={name} className="block">
        {label}
      </label>
      <input
        min={min}
        max={max}
        required={required}
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2 invalid:border-pink-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      />
    </div>
  );
};

export default TextInput;
