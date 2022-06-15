interface Props {
  options?: { text: string; value: string; disabled?: boolean }[];
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (val: string) => void | Promise<void>;
}

const Select = ({ options, onChange, value }: Props) => {
  return (
    <select
      className="appearance-none block py-2.5 px-4 border-[2px] border-[#290030] rounded-md
   shadow-sm sm:text-sm font-circularstdbook bg-[#13002B] min-w-[120px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#FC1F8E] focus:border-white focus:placeholder-gray-400"
      // placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value)}
      value={value}
    >
      {options &&
        options.map((option, index) => {
          return (
            <option
              key={index}
              value={String(option.value)}
              disabled={option.disabled}
            >
              {option.text}
            </option>
          );
        })}
    </select>
  );
};

export default Select;
