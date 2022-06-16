import AppDialog from '../Shared/AppDialog';
import SectionTitle from '../Shared/SectionTitle';

const ListingHintDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const Title = () => {
    return <div></div>;
  };

  const Content = () => {
    return (
      <div className="text-[#FFFFFF] py-[24px]">
        <div className="text-[#AAAAAA] text-[14px] mb-[24px] flex items-center">
          <div>
            <img src="/img/icon_save_sign.svg" alt="" />
          </div>
          <div className="ml-[12px]">Do Not Close this Window!</div>
        </div>
        <div className="mb-[24px]">
          <SectionTitle>Listing NFT</SectionTitle>
        </div>
        <div className="text-[14px]">
          After wallet approval, your transaction will be finished in about 3s.
        </div>
      </div>
    );
  };

  return (
    <AppDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={<Title />}
      content={<Content />}
    />
  );
};

export default ListingHintDialog;
