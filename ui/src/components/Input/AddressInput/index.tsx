import { BaseInput } from "../BaseInput";

interface IProps {
  className?: string;
  value: string;
  onChange: (_: string) => void;
  placeholder?: string;
  label?: string;
}

export const AddressInput = (props: IProps) => {
  const { value, onChange, placeholder, className, label } = props;

  return (
    <BaseInput
      StartIcon={<img src="/assets/icons/wallet.svg" />}
      value={value}
      onChange={onChange as any}
      className={className}
      placeholder={placeholder}
      label={label}
    />
  );
};
