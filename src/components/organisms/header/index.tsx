import { Button } from "@components/atoms";
import { Modal, SearchBar } from "@components/molecules";
import { Plus } from "phosphor-react";
import { useRef } from "react";

export const Header = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <header>
      <h1 className="text-4xl my-8 font-bold">Contatos</h1>
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
