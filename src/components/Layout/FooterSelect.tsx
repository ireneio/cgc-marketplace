interface Props {
  options: { text: string; value: string }[];
  id: string;
  name?: string;
  defaultValue?: string;
  onChange?: (e: any) => void;
}

const FooterSelect = ({ options, id, name, onChange }: Props) => {
  return (
    <select
      id={id}
      name={name || id}
      className="custom_select appearance-none block w-full bg-none bg-[#0C001C] border-[2px] border-[#290030] rounded-md py-2 pl-3 pr-10 text-base text-white focus:outline-none focus:ring-[#FC1F8E] focus:border-[#FC1F8E] sm:text-sm"
      defaultValue="English"
      onChange={(e) => onChange && onChange(e.target.value)}
    >
      {options.map((option) => {
        return (
          <option
            key={option.value}
            className="px-[12px] py-[12px]"
            value={option.value}
          >
            {option.text}
          </option>
        );
      })}
    </select>
  );
};

export default FooterSelect;
