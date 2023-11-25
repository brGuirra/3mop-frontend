type InputProps = {
  errorMessage?: string | false;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = ({ className, errorMessage, ...rest }: InputProps) => {
  return (
    <>
      <input
        className={`input input-bordered ${className} ${
          errorMessage && "input-error"
        }`}
        {...rest}
      />
      {errorMessage && (
        <span className="text-error block mt-2">{errorMessage}</span>
      )}
    </>
  );
};
