type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...rest }: InputProps) => {
  return <input className={`input input-bordered ${className}`} {...rest} />;
};
