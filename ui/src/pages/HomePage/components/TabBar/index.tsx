import { HomeTab } from "utils/enums";

interface IProps {
  tab: HomeTab;
  onChange: (_: HomeTab) => void;
}

export const TabBar = (props: IProps) => {
  return (
    <div className="px-2">
      <div className="flex gap-4">
        {Object.keys(HomeTab).map((tab) => {
          const isSelected = props.tab === tab;

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
