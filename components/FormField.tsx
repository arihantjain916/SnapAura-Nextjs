import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  [x: string]: any;
}

export const FormField = ({
  label,
  id,
  type = "text",
  placeholder = "",
  ...rest
}: FormFieldProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} {...rest} />
    </div>
  );
};
