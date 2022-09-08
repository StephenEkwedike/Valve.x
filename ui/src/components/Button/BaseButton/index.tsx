interface IProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const BaseButton = (props: IProps) => {
  return (
    <button
      className={`text-center button__base ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
};
