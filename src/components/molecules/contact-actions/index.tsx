import { Button } from "@components/atoms";
import { useContacts } from "hooks";
import { DotsThree, PencilSimple, TrashSimple } from "phosphor-react";

type ContactActionProps = {
  contact: API.Contact;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const ContactActions = ({ contact, ...rest }: ContactActionProps) => {
  const { deleteContact } = useContacts();

  const handleDelete = async (contactId: string) => {
    await deleteContact(contactId);
  };

  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div tabIndex={0} className="m-1 btn btn-ghost" role="button">
        <DotsThree weight="bold" size={20} />
      </div>
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
              {...rest}
            />
          </div>
        </li>
        <li>
          <div className="p-0 flex-1 flex hover:bg-inherit">
            <Button
              className="btn-ghost flex flex-1 justify-start"
              text="Excluir"
              onClick={() => handleDelete(contact.id)}
              icon={<TrashSimple weight="bold" size={20} />}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};
