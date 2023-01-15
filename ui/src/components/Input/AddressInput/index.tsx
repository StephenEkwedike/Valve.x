interface IProps {
  value: string;
  onChange: (_: string) => void;
  label: string;
}

export const AddressInput = (props: IProps) => {
  return (
    <div className="component__address_input">
      <input
        inputMode="decimal"
        title="Recipient Address"
        autoComplete="off"
        autoCorrect="off"
        type="text"
        placeholder="Enter Recipient Address"
        spellCheck={false}
        className="w-full bg-transparent border border-gray-500 rounded-2xl p-4 text-primary text-left flex-auto flex-grow overflow-hidden overflow-ellipsis placeholder-low-emphesis focus:placeholder-primary focus:placeholder:text-low-emphesis"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};
