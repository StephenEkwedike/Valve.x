import { ArrowRightIcon } from "@heroicons/react/solid";

interface IProps {
  disabled: boolean;
  isDirect: boolean;
  onClick: () => void;
}

export const TransferButton = (props: IProps) => {
  const { disabled, isDirect, onClick } = props;

  return (
    <button
      className="text-white bg-blue-600 text-lg rounded-2xl p-2 w-full flex flex-col items-center disabled:bg-[#4F4E57] disabled:text-[#A5A1A1]"
      disabled={disabled}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 text-sm sm:text-md">
        {isDirect ? (
          <>
            <span>Transfer</span>
            <ArrowRightIcon width={20} height={20}/>
          </>
        ) : (
          <>
            <svg width="14" height="17" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 20C1.45 20 0.979 19.8043 0.587 19.413C0.195667 19.021 0 18.55 0 18V4H2V18H13V20H2ZM6 16C5.45 16 4.97933 15.8043 4.588 15.413C4.196 15.021 4 14.55 4 14V2C4 1.45 4.196 0.979 4.588 0.587C4.97933 0.195667 5.45 0 6 0H15C15.55 0 16.021 0.195667 16.413 0.587C16.8043 0.979 17 1.45 17 2V14C17 14.55 16.8043 15.021 16.413 15.413C16.021 15.8043 15.55 16 15 16H6ZM6 14H15V2H6V14ZM6 14V2V14Z" fill="white"/>
            </svg>
            <span>Create confirmation link</span>
          </>
        )}
      </div>
    </button>
  )
}