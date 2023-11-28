import { ContactForm, ContactsList, Header } from "@components/organisms";
import { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [currentContact, setCurrentContact] = useState<API.Contact | null>(
    null,
  );

  const showContactForm = (contact?: API.Contact) => {
    setCurrentContact(contact ?? null);

    modalRef.current?.showModal();
  };

  return (
    <div className="container flex flex-col gap-12 h-screen">
      <Header showContactForm={showContactForm} />
      <ContactsList showContactForm={showContactForm} className="flex-1" />
      <ContactForm ref={modalRef} contact={currentContact} />
      <ToastContainer />
    </div>
  );
};
