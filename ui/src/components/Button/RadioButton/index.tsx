interface IProps {
  selected: boolean;
  onCheck: () => void;
  className?: string;
  label: string;
}

export const RadioButton = (props: IProps) => {
  const { selected, onCheck, label, className } = props;
  return (
    <button
      className={`flex items-center mr-8 ${className} component__radio_button ${
        selected ? "component__radio_button--active" : ""
      }`}
      onClick={onCheck}
    >
      <span className="mr-3 w-6 h-6 flex items-center justify-center component__radio_button__circle">
        <span className="w-3 h-3 component__radio_button__circle__inner" />
      </span>
      <p className="component__radio_button__label">{label}</p>
    </button>
  );
};
