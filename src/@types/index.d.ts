declare namespace API {
  type Contact = {
    id: string;

    firstName: string;

    lastName: string;

    email: string;

    cellphone: string;

    address: {
      street: string;

      buildingNumber: string;

      streetAddress: string;

      city: string;

      state: string;

      zipCode: string;
    };
  };

  type CreateContact = Omit<Contact, "id">;

  type UpdateContact = Partial<CreateContact>;

  type Address = {
    street: string;

    buildingNumber: string;

    streetAddress: string;

    city: string;

    state: string;

    zipCode: string;
  };
}
