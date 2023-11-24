import { Plus } from "phosphor-react";
import { Button } from "../../atoms";
import { SearchBar } from "../../molecules";

export const Header = () => {
  return (
    <header className="p-8">
      <h1 className="text-4xl mb-8 font-bold">Contatos</h1>
      <div className="flex justify-between">
        <SearchBar placeholder="Buscar contatos..." className="w-96" />
        <Button
          text="Novo contato"
          type="button"
          icon={<Plus weight="bold" />}
        />
      </div>
    </header>
  );
};
