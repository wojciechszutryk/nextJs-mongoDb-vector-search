interface Props extends Omit<React.HTMLProps<HTMLButtonElement>, "type"> {
  type?: "submit" | "reset" | "button";
  variant?: "primary" | "secondary";
}

const Button = (props: Props): JSX.Element => {
  return (
    <button
      {...props}
      className={
        `px-4 py-2 rounded font-semi-bold ${
          props.variant === "secondary"
            ? "bg-gray-100 "
            : "bg-blue-500 text-white "
        } ` + props.className
      }
    ></button>
  );
};

export default Button;
