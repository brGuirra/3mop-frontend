import { Button } from "@components/atoms";
import { DotsThree, PencilSimple, TrashSimple } from "phosphor-react";

export const ContactActions = () => {
  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <label
        tabIndex={0}
        className="m-1 btn btn-ghost"
        aria-label="Edit or delete contact"
      >
        <DotsThree weight="bold" size={20} />
      </label>
      <ul
        tabIndex={0}
        className="shadow menu dropdown-content z-[1] bg-base-300 rounded-lg w-52"
      >
        <li className="">
          <div className="p-0 flex-1 flex hover:bg-inherit">
            <Button
              className="btn-ghost flex flex-1 justify-start"
              text="Editar"
              icon={<PencilSimple weight="bold" size={20} />}
            />
          </div>
        </li>
        <li>
          <div className="p-0 flex-1 flex hover:bg-inherit">
            <Button
              className="btn-ghost flex flex-1 justify-start"
              text="Excluir"
              icon={<TrashSimple weight="bold" size={20} />}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};
