import React from "react";
import type { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import InputField from "../../../components/input-field";
import type { ContactFieldsType } from "../constants/contact-fields";
import type { FormValues } from "../types";

type Props = {
  fields: ContactFieldsType;
  errors: Partial<FieldErrorsImpl<FormValues>>;
  register: UseFormRegister<FormValues>;
};

const ContactFields = ({ fields, errors, register }: Props) => {
  return (
    <>
      {fields.map((field) => {
        if (Array.isArray(field)) {
          const arrKey = field.map(({ name }) => name).join(", ");
          return (
            <div
              className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-3 [&_input]:w-full"
              key={arrKey}
            >
              <ContactFields
                fields={field}
                errors={errors}
                register={register}
              />
            </div>
          );
        }

        const { name, ...fieldProps } = field;
        return (
          <InputField
            key={name}
            error={errors[name]?.message}
            {...fieldProps}
            {...register(name, { required: fieldProps.required })}
          />
        );
      })}
    </>
  );
};

export default ContactFields;
