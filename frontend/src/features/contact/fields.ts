import type { InputFieldProps } from "../../components/input-field";
import type { FormValues } from "./contact";

type FieldProps = { name: keyof FormValues } & InputFieldProps;

export const fields: (FieldProps | FieldProps[])[] = [
  [
    {
      name: "firstName",
      label: "First Name",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      required: true,
    },
  ],
  {
    name: "email",
    label: "Email Address",
    required: true,
  },
  {
    name: "subject",
    label: "Subject",
    required: true,
  },
  {
    name: "message",
    label: "Message",
    required: true,
    textarea: true,
  },
];
