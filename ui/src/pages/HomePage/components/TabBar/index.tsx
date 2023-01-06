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
          let isSelected = true;
          
          switch (props.tab) {
            case HomeTab.Token:
              isSelected = tab === "Transfer";
              break;

            case HomeTab.NFT:
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
                  tab === "Transfer" ? HomeTab.Token : HomeTab.Sent
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
