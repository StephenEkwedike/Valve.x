interface IProps {
  value: string;
  onChange: (_: string) => void;
  label: string;
}

export const AddressInput = (props: IProps) => {
  return (
    <div className="border-dark-700 hover:border-dark-600 rounded-[14px] border bg-dark-900 p-3 flex flex-col gap-4 component__token_input">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center">
          <div className="bg-dark-800 hover:bg-dark-700 flex items-center gap-2 px-2 py-1 rounded-full shadow-md text-high-emphesis">
            <div className="text-sm leading-5 font-bold !text-xl">
              &nbsp;{props.label}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-1 justify-between items-baseline px-1.5">
        <div className="text-lg leading-5 tracking-[-0.01em] font-bold relative flex items-baseline flex-grow gap-3 overflow-hidden">
          <input
            inputMode="decimal"
            title="Token Amount"
            autoComplete="off"
            autoCorrect="off"
            type="text"
            placeholder="0xA..."
            spellCheck={false}
            className="text-primary relative font-bold outline-none border-none flex-auto overflow-hidden overflow-ellipsis placeholder-low-emphesis focus:placeholder-primary leading-[28px] focus:placeholder:text-low-emphesis flex-grow w-full text-left bg-transparent text-inherit disabled:cursor-not-allowed"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
