import { TextField as MuiTextField } from "@mui/material";
import { RefObject } from "react";

type Props = {
  formRef: RefObject<HTMLFormElement>
  id: string
  label: string
  value: string
  onChange: () => void
  [x: string]: unknown;
}

export default function TextField({ formRef, id, label, value, onChange, ...other }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputElement = formRef.current?.elements[id as any] as HTMLInputElement;
  const error = inputElement ? inputElement.validationMessage : '';

  return (
    <MuiTextField
      id={id}
      name={id}
      label={label}
      required
      error={!!(error)}
      helperText={error}
      InputLabelProps={{ required: false }}
      value={value}
      onChange={onChange}
      {...other} />
  )
}