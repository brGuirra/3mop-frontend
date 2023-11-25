import { MagnifyingGlass } from "phosphor-react";

type SearchBarProps = {
  placeholder: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const SearchBar = ({
  placeholder,
  className,
  ...rest
}: SearchBarProps) => {
  return (
    <div className={`relative ${className}`} {...rest}>
      <div className="text-gray-600 absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
        <MagnifyingGlass size={20} weight="bold" />
      </div>
      <input
        type="search"
        className="input input-bordered w-full max-w-xs block p-4 ps-10"
        placeholder={placeholder}
      />
    </div>
  );
};
