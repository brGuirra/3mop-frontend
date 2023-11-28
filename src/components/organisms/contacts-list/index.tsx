import { ContactActions } from "@components/molecules";
import { useContacts } from "hooks";

type ContactListProps = {
  showContactForm: (contact?: API.Contact) => void;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export const ContactsList = ({
  showContactForm,
  ...rest
}: ContactListProps) => {
  const { contacts } = useContacts();

  return (
    <main {...rest}>
      {contacts && contacts?.length > 0 ? (
        <div className="overflow-x-auto h-full">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Celular</th>
                <th>Endereço</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => {
                const {
                  id,
                  firstName,
                  lastName,
                  email,
                  cellphone,
                  address: {
                    street,
                    streetAddress,
                    buildingNumber,
                    city,
                    state,
                    zipCode,
                  },
                } = contact;

                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{`${firstName} ${lastName}`}</td>
                    <td>
                      <a
                        href="mailto:br.guirra@email.com"
                        target="_blank"
                        className="link"
                      >
                        {email}
                      </a>
                    </td>
                    <td>
                      <a href="tel:16992186636" className="link">
                        {cellphone}
                      </a>
                    </td>
                    <td>
                      <div>
                        <p>{`${street}, ${buildingNumber} - ${streetAddress}`}</p>
                        <p>{`${city} - ${state}`}</p>
                        <p>{zipCode}</p>
                      </div>
                    </td>
                    <td>
                      <ContactActions
                        contact={contact}
                        onClick={() => showContactForm(contact)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </main>
  );
};
