import { HomeTab } from "utils/enums";

interface IProps {
  tab: HomeTab;
  onChange: (_: HomeTab) => void;
}

export const TabBar = (props: IProps) => {
  return (
    <div className="px-1 md:px-4 flex flex-row items-center justify-between">
      <div className="flex gap-2">
        {["Transfer", "History", "Contact"].map((tab) => {
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
            
            case HomeTab.Contact:
              isSelected = tab === "Contact";
              break;
              
            default:
              isSelected = true;
          }

          return (
            <div
              key={tab}
              onClick={() => {
                let hometab: HomeTab = HomeTab.Transfer;
                switch (tab) {
                  case "Transfer":
                    hometab = HomeTab.Transfer;
                    break;

                  case "History":
                    hometab = HomeTab.Sent;
                    break;

                  case "Contact":
                    hometab = HomeTab.Contact;
                    break;
                }
                props.onChange(hometab);
              }}
              className={`leading-5 px-3 py-1 rounded-full cursor-pointer select-none text-white ${
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
