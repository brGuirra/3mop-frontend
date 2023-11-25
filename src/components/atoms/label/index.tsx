type LabelProps = {
  text?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ text, className, ...rest }: LabelProps) => {
  return (
    <label className={`label cursor-pointer ${className}`} {...rest}>
      {text}
    </label>
  );
};
