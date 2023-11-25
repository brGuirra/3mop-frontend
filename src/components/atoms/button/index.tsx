import { IconProps } from "phosphor-react";
import { ReactElement } from "react";

type ButtonProps = {
  icon?: ReactElement<IconProps & React.RefAttributes<SVGSVGElement>>;
  text?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ text, icon, className, ...rest }: ButtonProps) => {
  return (
    <button className={`btn ${className}`} {...rest}>
      {icon}
      {text}
    </button>
  );
};
