import { Button } from "@components/atoms";
import { ThemeController } from "@components/molecules";
import { Plus } from "phosphor-react";

type HeaderProps = {
  showContactForm: () => void;
};

export const Header = ({ showContactForm }: HeaderProps) => {
  return (
    <header className="flex flex-col">
      <div className="py-8 flex justify-between">
        <h1 className="text-4xl font-bold">Contatos</h1>
        <ThemeController />
      </div>
      <Button
        text="Novo contato"
        type="button"
        icon={<Plus weight="bold" size={20} />}
        onClick={() => showContactForm()}
        className="btn-primary self-end"
      />
    </header>
  );
};
