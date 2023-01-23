interface IProps {
  checked: boolean;
  onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DirectCheck = (props: IProps) => {
  const { checked, onChange } = props;

  return (
    <div className="flex items-center">
      <input 
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
        checked={checked} 
        id="checkbox-directly" 
        type="checkbox" 
        onChange={onChange}
      />
      <label 
        htmlFor="checkbox-directly" 
        className="ml-2 text-sm font-medium text-white"
      >
        2FA
      </label>
    </div>
  );
}