import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { Input } from "@/components/ui/input"
interface Props<T extends FieldValues> extends React.ComponentProps<typeof Input> {
  name: FieldPath<T>
  control: Control<T>
}

export function InputField<T extends FieldValues>(props: Props<T>) {
  const { name, control, ...inputProps } = props

  return <Controller name={name} control={control} render={({ field }) => <Input {...field} {...inputProps} />} />
}
