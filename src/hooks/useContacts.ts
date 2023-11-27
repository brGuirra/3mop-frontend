import { EmailAlreadyInUseError, UnexpectedError } from "errors";
import useSWR from "swr";

type NewContactInput = {
  payload: API.CreateContact;
  onSuccess: () => void;
  onError: (error: unknown) => void;
};

export const useContacts = () => {
  const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/v1/contacts`;
  const fecther = async (url: string) => {
    return fetch(url).then<API.Contact[]>((res) => res.json());
  };

  const { data, isLoading, mutate, error } = useSWR(BASE_URL, fecther);

  const newContact = async ({
    payload,
    onSuccess,
    onError,
  }: NewContactInput) => {
    if (!data) return;

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      if (res.status === 409) {
        onError(new EmailAlreadyInUseError());
      } else {
        onError(new UnexpectedError());
      }
    } else {
      const contact = await res.json();

      mutate([...data, contact]);

      onSuccess();
    }
  };

  const updateContact = async (
    contactId: string,
    payload: API.UpdateContact,
  ) => {
    if (!data) return;

    await fetch(`${BASE_URL}/${contactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    mutate(
      data.map((contact) => {
        if (contact.id === contactId) {
          contact = { ...contact, ...payload };
        }

        return contact;
      }),
    );
  };

  const deleteContact = async (contactId: string) => {
    if (!data) return;

    await fetch(`${BASE_URL}/${contactId}`, {
      method: "DELETE",
    });

    mutate(data.filter((contact) => contact.id === contactId));
  };

  return {
    contacts: data,
    isLoading,
    isError: error,
    newContact,
    updateContact,
    deleteContact,
  };
};
