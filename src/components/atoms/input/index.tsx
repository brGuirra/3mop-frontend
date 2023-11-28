import { forwardRef } from "react";

type InputProps = {
  errorMessage?: string | false;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, errorMessage, ...rest }: props, ref) => {
    return (
      <>
        <input
          className={`input input-bordered ${className} ${
            errorMessage && "input-error"
          }`}
          ref={ref}
          {...rest}
        />
        {errorMessage && (
          <span className="text-error block mt-2">{errorMessage}</span>
        )}
      </>
    );
  },
);
