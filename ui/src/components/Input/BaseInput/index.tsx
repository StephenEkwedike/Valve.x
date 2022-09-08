interface IProps {
  StartIcon?: React.ReactNode;
  EndIcon?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  value: string | number;
  onChange?: (_: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  label?: string;
}

export const BaseInput = (props: IProps) => {
  const {
    StartIcon,
    EndIcon,
    value,
    onChange,
    placeholder,
    disabled,
    helperText,
    label,
    innerClassName,
  } = props;
  return (
    <div className={`my-8 w-full component__base_input ${props.className}`}>
      <div
        className={`rounded-2xl bg-base py-3 px-6 flex items-center bg-base1 relative ${innerClassName}`}
      >
        {value && label ? (
          <span className="absolute component__base_input__label text-gray text-xs">
            {label}
          </span>
        ) : null}
        {StartIcon ? StartIcon : null}
        <input
          disabled={disabled}
          value={value}
          onChange={(e) => (onChange ? onChange(e.target.value) : () => {})}
          className={`flex-1 outline-none	bg-transparent text-gray py-2 text-sm ${
            StartIcon ? "ml-2" : ""
          } ${EndIcon ? "mr-2" : ""}`}
          placeholder={placeholder}
        />
        {EndIcon ? EndIcon : null}
      </div>
      {helperText ? (
        <p className="text-sm text-gray mx-4">{helperText}</p>
      ) : null}
    </div>
  );
};
