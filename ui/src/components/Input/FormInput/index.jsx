import { Controller } from "react-hook-form";

export const FormInput = ({ name, control, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => 
        <div className="flex flex-col w-full">
          <input
            className={`block w-full border border-gray-500 bg-transparent p-2 rounded-xl placeholder-low-emphesis focus:bg-bule-600 ${error && "border-red-400"}`}
            {...rest}
            name={name}
            value={value ?? ''}
            onChange={(ev) => {
                onChange(ev)
                if (typeof rest.onChange === 'function') {
                    rest.onChange(ev)
                }
            }}
            onBlur={onBlur}
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error.message}
            </p>
          )}
        </div>
      }
    />
  );
}