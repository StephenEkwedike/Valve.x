import { HomeTab } from "utils/enums";

interface IProps {
  tab: HomeTab;
  onChange: (_: HomeTab) => void;
}

export const TabBar = (props: IProps) => {
  return (
    <div className="px-4 flex flex-row items-center justify-between">
      <div className="flex gap-4">
        {["Transfer", "History"].map((tab) => {
          let isSelected = true;
          
          switch (props.tab) {
            case HomeTab.Transfer:
              isSelected = tab === "Transfer";
              break;

            case HomeTab.Sent:
              isSelected = tab === "History";
              break;

            case HomeTab.Received:
              isSelected = tab === "History";
              break;
              
            default:
              isSelected = true;
          }

          return (
            <div
              key={tab}
              onClick={() => {
                props.onChange(
                  tab === "Transfer" ? HomeTab.Transfer : HomeTab.Sent
                );
              }}
              className={`leading-5 px-3 py-2 rounded-full cursor-pointer select-none text-white ${
                isSelected && "bg-blue-600"
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
