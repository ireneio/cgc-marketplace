interface Props {
  id: string;
  image: string;
  onClick: (id: string) => void | Promise<void>;
}

const CollectionsCard = ({ image, onClick, id }: Props) => {
  return (
    <div
      className="w-auto h-[253px] bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${image})` }}
      onClick={() => onClick && onClick(id)}
    ></div>
  );
};

export default CollectionsCard;
