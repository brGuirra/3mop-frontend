import { Button, Input, Label } from "@components/atoms";
import { useFormik } from "formik";
import { object, string, InferType } from "yup";

const newContactSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email(),
  phone: string().matches(/\d{11}/),
  zipCode: string().matches(/d{8}/),
  street: string().required(),
  streetAddress: string().required(),
  number: string().required(),
  city: string().required(),
  state: string().required(),
});

type NewContactSchema = InferType<typeof newContactSchema>;

export const NewContactForm = () => {
  const { values, handleChange, handleBlur, handleSubmit, errors } =
    useFormik<NewContactSchema>({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        zipCode: "",
        street: "",
        streetAddress: "",
        number: "",
        city: "",
        state: "",
      },
      onSubmit: (values) => {
        console.log(values);
      },
      validationSchema: newContactSchema,
    });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Label text="Nome:" htmlFor="firstName" />
          <Input
            id="firstName"
            name="firstName"
            type="text"
            className="w-full"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors?.firstName ? <div>{errors.firstName}</div> : null}
        </div>
        <div className="flex-1">
          <Label text="Sobrenome:" htmlFor="lastName" />
          <Input
            id="lastName"
            name="lastName"
            type="text"
            className="w-full"
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
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex-1">
          <Label text="Celular:" htmlFor="phone" />
          <Input
            id="phone"
            name="phone"
            type="tel"
            className="w-full"
            value={values.phone}
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
          value={values.street}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <Label text="Número:" htmlFor="number" />
          <Input
            id="number"
            name="number"
            type="text"
            className="w-full"
            value={values.number}
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
      />
    </form>
  );
};
