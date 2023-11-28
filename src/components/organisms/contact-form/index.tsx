import { Button, Input, Label } from "@components/atoms";
import {
  ContactNotFound,
  EmailAlreadyInUseError,
  UnexpectedError,
} from "errors";
import { FormikHelpers, useFormik } from "formik";
import { useContacts } from "hooks";
import { X } from "phosphor-react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { toast } from "react-toastify";
import { object, string, InferType } from "yup";

type ContactFormProps = {
  contact?: API.Contact | null;
};

const contactSchema = object({
  firstName: string().required("Nome é um campo obrigatório"),
  lastName: string().required("Sobrenome é um campo obrigatório"),
  email: string()
    .email("O valor informado não é um e-mail válido")
    .required("E-mail é um campo obrigatório"),
  cellphone: string()
    .matches(/^\d{11}$/, "Formato de celular inválido")
    .required("Celular é um campo obrigatório"),
  zipCode: string()
    .matches(/^\d{8}$/, "Formato de CEP inválido")
    .required("Cep é um campo obrigatório"),
  street: string().required("Rua é um campo obrigatório"),
  streetAddress: string().required("Bairro é um campo obrigatório"),
  buildingNumber: string().required("Número é um campo obrigatório"),
  city: string().required("Cidade é um campo obrigatório"),
  state: string().required("Estado é um campo obrigatório"),
});

type ContactSchema = InferType<typeof contactSchema>;

export const ContactForm = forwardRef<HTMLDialogElement, ContactFormProps>(
  ({ contact }, modalOuterRef) => {
    const modalInnerRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(modalOuterRef, () => modalInnerRef.current!, []);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const { newContact, updateContact } = useContacts();
    const initialValues: ContactSchema = {
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
      }: ContactSchema,
      { resetForm, setErrors, setSubmitting }: FormikHelpers<ContactSchema>,
    ) => {
      const onSuccess = () => {
        setSubmitting(false);

        resetForm();

        modalInnerRef?.current?.close();
      };

      const onError = (error: unknown) => {
        if (error instanceof EmailAlreadyInUseError) {
          if (emailInputRef?.current) {
            emailInputRef.current.focus();
          }

          setErrors({
            email: "E-mail já está em uso",
          });
        } else if (error instanceof ContactNotFound) {
          toast("Contato não encontrado", {
            type: "error",
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else if (error instanceof UnexpectedError) {
          toast("Um erro inesperado ocorreu, tente novamente", {
            type: "error",
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      };

      const payload = {
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
      };

      if (contact) {
        await updateContact({
          contactId: contact.id,
          payload,
          onSuccess,
          onError,
        });
      } else {
        await newContact({
          payload,
          onSuccess,
          onError,
        });
      }
    };

    const {
      values,
      handleSubmit,
      handleChange,
      handleBlur,
      resetForm,
      setValues,
      errors,
      touched,
      isValid,
    } = useFormik<ContactSchema>({
      initialValues,
      onSubmit,
      validationSchema: contactSchema,
    });

    useEffect(() => {
      setValues({
        firstName: contact?.firstName || "",
        lastName: contact?.lastName || "",
        email: contact?.email || "",
        cellphone: contact?.cellphone || "",
        zipCode: contact?.address?.zipCode || "",
        street: contact?.address?.street || "",
        streetAddress: contact?.address.streetAddress || "",
        buildingNumber: contact?.address.buildingNumber || "",
        city: contact?.address?.city || "",
        state: contact?.address?.state || "",
      });
    }, [contact, setValues]);

    const handleModalClose = () => {
      resetForm();

      modalInnerRef.current?.close();
    };

    return (
      <dialog className="modal px-4" ref={modalInnerRef}>
        <div className="modal-box w-full max-w-full">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label text="Nome:" htmlFor="firstName" />
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="w-full"
                  errorMessage={touched?.firstName && errors?.firstName}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex-1">
                <Label text="Sobrenome:" htmlFor="lastName" />
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="w-full"
                  errorMessage={touched?.lastName && errors?.lastName}
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label text="Email:" htmlFor="email" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  ref={emailInputRef}
                  className="w-full"
                  autoComplete="email"
                  errorMessage={touched?.email && errors?.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex-1">
                <Label text="Celular:" htmlFor="cellphone" />
                <Input
                  id="cellphone"
                  name="cellphone"
                  type="tel"
                  className="w-full"
                  errorMessage={touched?.cellphone && errors?.cellphone}
                  value={values.cellphone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="w-1/2 max-w-full">
              <Label text="Cep:" htmlFor="zipCode" />
              <Input
                id="zipCode"
                name="zipCode"
                type="text"
                className="w-full"
                errorMessage={touched?.zipCode && errors?.zipCode}
                value={values.zipCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="flex-1">
              <Label text="Rua:" htmlFor="street" />
              <Input
                id="street"
                name="street"
                type="text"
                className="w-full"
                errorMessage={touched?.street && errors?.street}
                value={values.street}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label text="Número:" htmlFor="buildingNumber" />
                <Input
                  id="buildingNumber"
                  name="buildingNumber"
                  type="text"
                  className="w-full"
                  errorMessage={
                    touched?.buildingNumber && errors?.buildingNumber
                  }
                  value={values.buildingNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex-1">
                <Label text="Bairro:" htmlFor="streetAddress" />
                <Input
                  id="streetAddress"
                  name="streetAddress"
                  type="text"
                  className="w-full"
                  errorMessage={
                    touched?.streetAddress && errors?.streetAddress
                      ? errors.streetAddress
                      : ""
                  }
                  value={values.streetAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label text="Cidade:" htmlFor="city" />
                <Input
                  id="city"
                  name="city"
                  type="text"
                  className="w-full"
                  errorMessage={touched?.city && errors?.city}
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex-1">
                <Label text="Estado:" htmlFor="state" />
                <Input
                  id="state"
                  name="state"
                  type="state"
                  className="w-full"
                  errorMessage={touched?.state && errors?.state}
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <Button
              type="submit"
              text={contact ? "Atualizar" : "Cadastrar"}
              className="btn-bloc btn-primary  mt-2 flex-1"
              disabled={!isValid}
            />
          </form>
          <Button
            className="btn-sm btn-circle btn-ghost absolute right-2 top-2"
            icon={<X weight="bold" size={20} />}
            onClick={handleModalClose}
            onFocus={handleModalClose}
            type="submit"
          />
        </div>
      </dialog>
    );
  },
);
