import { RadioButton } from "../RadioButton";

interface IProps {
  value: string;
  data: {
    label: string;
    value: string;
  }[];
  className?: string;
  onChange: (_: string) => void;
}

export const RadioGroup = (props: IProps) => {
  return (
    <div className={`flex items-center my-8 ${props.className}`}>
      {props.data.map((item) => {
        return (
          <RadioButton
            label={item.label}
            selected={item.value === props.value}
            onCheck={() => props.onChange(item.value)}
            key={item.label}
          />
        );
      })}
    </div>
  );
};
