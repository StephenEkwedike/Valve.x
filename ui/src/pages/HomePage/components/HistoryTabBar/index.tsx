import { HomeTab } from "utils/enums";

interface IProps {
  tab: string;
  onChange: (_: HomeTab) => void;
}

export const HistoryTabBar = (props: IProps) => {
  return (
    <div className="md:px-8 px-4">
      <div className="flex gap-4">
        {["Sent", "Received"].map((tab) => {
          const isSelected = tab === props.tab;

          return (
            <div
              key={tab}
              onClick={() => {
                props.onChange(tab as HomeTab);
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
