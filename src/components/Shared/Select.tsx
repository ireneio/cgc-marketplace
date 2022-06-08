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
      className="appearance-none block px-3 py-2 border-[2px] border-[#290030] rounded-md
   shadow-sm focus:outline-none focus:ring-indigo-500
   focus:border-indigo-500 sm:text-sm font-circularstdbook bg-[#13002B] min-w-[120px]"
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
