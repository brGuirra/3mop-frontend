import { Button } from "@components/atoms/button";
import { NewContactForm } from "@components/molecules";
import { X } from "phosphor-react";
import { forwardRef } from "react";

export const Modal = forwardRef<HTMLDialogElement>((_, ref) => {
  return (
    <dialog className="modal px-4" ref={ref}>
      <div className="modal-box w-full max-w-full">
        <NewContactForm />
        <form method="dialog">
          <Button
            className="btn-sm btn-circle btn-ghost absolute right-2 top-2"
            icon={<X weight="bold" size={20} />}
          />
        </form>
      </div>
    </dialog>
  );
});
