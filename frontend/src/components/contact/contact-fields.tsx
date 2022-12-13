import React from "react";
import InputField from "../input-field";
import { fields } from "./fields";
import type { FormValues } from "./contact";
import type { FieldErrorsImpl, UseFormRegister } from "react-hook-form";

type Props = {
  fields: typeof fields;
  errors: Partial<FieldErrorsImpl<FormValues>>;
  register: UseFormRegister<FormValues>;
};

const ContactFields = ({ fields, errors, register }: Props) => {
  return (
    <>
      {fields.map((field, index) => {
        const isArray = Array.isArray(field);
        if (isArray) {
          const arrKey = field.map(({ name }) => name).join(", ");
          return (
            <div
              className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-3"
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
            error={errors[name]?.message}
            key={name}
            {...fieldProps}
            {...register(name, { required: fieldProps.required })}
          />
        );
      })}
    </>
  );
};

export default ContactFields;
