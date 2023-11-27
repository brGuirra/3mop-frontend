import { Button, Input, Label } from "@components/atoms";
import { EmailAlreadyInUseError } from "errors";
import { FormikHelpers, useFormik } from "formik";
import { useContacts } from "hooks";
import { X } from "phosphor-react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { object, string, InferType } from "yup";

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

export const NewContactForm = forwardRef<HTMLDialogElement>((_, outerRef) => {
  const { newContact } = useContacts();
  const innerRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(outerRef, () => innerRef.current!, []);
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
    { resetForm, setErrors, setSubmitting }: FormikHelpers<NewContactSchema>,
  ) => {
    const onSuccess = () => {
      setSubmitting(false);
      resetForm();

      innerRef?.current?.close();
    };

    const onError = (error: unknown) => {
      if (error instanceof EmailAlreadyInUseError) {
        setErrors({
          email: "E-mail já está em uso",
        });
      }
    };

    await newContact({
      payload: {
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
      },
      onSuccess,
      onError,
    });
  };
  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    errors,
    touched,
    isValid,
  } = useFormik<NewContactSchema>({
    initialValues,
    onSubmit,
    validationSchema: newContactSchema,
  });

  return (
    <dialog className="modal px-4" ref={innerRef}>
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
                errorMessage={touched?.buildingNumber && errors?.buildingNumber}
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
            text="Cadastrar"
            className="btn-bloc btn-primary mt-2"
            disabled={!isValid}
          />
        </form>
        <form method="dialog" onSubmit={() => resetForm()}>
          <Button
            className="btn-sm btn-circle btn-ghost absolute right-2 top-2"
            icon={<X weight="bold" size={20} />}
            type="submit"
          />
        </form>
      </div>
    </dialog>
  );
});
