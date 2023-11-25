import { ContactsList, Header } from "@components/organisms";

export const App = () => {
  return (
    <div className="container flex flex-col gap-12">
      <Header />
      <ContactsList />
    </div>
  );
};
