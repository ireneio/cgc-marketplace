interface Props {
  title: string;
  itemList: { name: string; href: string }[];
}

const FooterVerticalList = ({ title, itemList }: Props) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[#FFFFFF] tracking-wider uppercase">
        {title}
      </h3>
      <ul role="list" className="mt-4 space-y-4">
        {itemList.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              rel={'noreferrer'}
              target={'_blank'}
              className="text-base text-[#9497AA] hover:text-[#FC1F8E]"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterVerticalList;
