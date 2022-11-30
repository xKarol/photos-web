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
      {fields.map((field) => {
        const isArray = Array.isArray(field);
        if (isArray)
          return (
            <div className="flex space-x-3">
              <ContactFields
                fields={field}
                errors={errors}
                register={register}
              />
            </div>
          );

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
