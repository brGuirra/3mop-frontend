import { Field, Form, Formik, FormikHelpers } from "formik";
import { X } from "phosphor-react";
import { forwardRef } from "react";
import { object, string, InferType } from "yup";
import { useContacts } from "hooks";
import { Input, Label, Button } from "@components/atoms";

const newContactSchema = object({
  firstName: string().required("Nome é um campo obrigatório"),
  lastName: string().required("Sobrenome é um campo obrigatório"),
  email: string()
    .email("O valor informado não é um e-mail válido")
    .required("E-mail é um campo obrigatório"),
  cellphone: string()
    .matches(/\d{11}/, "Informar apenas números")
    .required("Celular é um campo obrigatório"),
  zipCode: string()
    .matches(/\d{8}/, "Informar apenas números")
    .required("Cep é um campo obrigatório"),
  street: string().required("Rua é um campo obrigatório"),
  streetAddress: string().required("Bairro é um campo obrigatório"),
  buildingNumber: string().required("Número é um campo obrigatório"),
  city: string().required("Cidade é um campo obrigatório"),
  state: string().required("Estado é um campo obrigatório"),
});

type NewContactSchema = InferType<typeof newContactSchema>;

export const Modal = forwardRef<HTMLDialogElement>((_, ref) => {
  const { newContact } = useContacts();
  const initialValues: NewContactSchema = {
    firstName: "",
    lastName: "",
    email: "",
    cellphone: "",
    zipCode: "",
    street: "",
    streetAddress: "",
    buildingNumber: "",
    city: "",
    state: "",
  };
  const onSubmit = async (
    {
      firstName,
      lastName,
      cellphone,
      email,
      street,
      streetAddress,
      city,
      buildingNumber,
      state,
      zipCode,
    }: NewContactSchema,
    { resetForm }: FormikHelpers<NewContactSchema>,
  ) => {
    await newContact({
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
    });

    resetForm();
  };

  return (
    <dialog className="modal px-4" ref={ref}>
      <div className="modal-box w-full max-w-full">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label text="Nome:" htmlFor="firstName" />
                <Field
                  as={
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="w-full"
                    />
                  }
                />
              </div>
              <div className="flex-1">
                <Label text="Sobrenome:" htmlFor="lastName" />
                <Field
                  as={
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="w-full"
                    />
                  }
                />
              </div>
            </div>
          </Form>
        </Formik>
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
