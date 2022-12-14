import { HomeTab } from "utils/enums";

interface IProps {
  tab: HomeTab;
  onChange: (_: HomeTab) => void;
}

export const TabBar = (props: IProps) => {
  return (
    <div className="px-2">
      <div className="flex gap-4">
        {["Transfer", "History"].map((tab) => {
          const isSelected =
            tab === "Transfer"
              ? props.tab === HomeTab.Transfer
              : props.tab !== HomeTab.Transfer;

          return (
            <div
              key={tab}
              onClick={() => {
                props.onChange(
                  tab === "Transfer" ? HomeTab.Transfer : HomeTab.Sent
                );
              }}
              className={`leading-5 font-bold cursor-pointer select-none text-secondary hover:text-white ${
                isSelected && "text-high-emphesis"
              }`}
            >
              {tab}
            </div>
          );
        })}
      </div>
    </div>
  );
};
