import { Button } from "@components/atoms";
import { Modal, SearchBar, ThemeController } from "@components/molecules";
import { Plus } from "phosphor-react";
import { useRef } from "react";

export const Header = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <header>
      <div className="py-8 flex justify-between">
        <h1 className="text-4xl font-bold">Contatos</h1>
        <ThemeController />
      </div>
      <div className="flex justify-between">
        <SearchBar placeholder="Buscar contatos..." className="w-3/6" />
        <Button
          text="Novo contato"
          type="button"
          icon={<Plus weight="bold" size={20} />}
          onClick={() => modalRef.current?.showModal()}
          className="btn-primary"
        />
      </div>
      <Modal ref={modalRef} />
    </header>
  );
};
