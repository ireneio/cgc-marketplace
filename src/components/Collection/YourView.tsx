import SolanaConnectButton from '../Shared/SolanaConnectButton';

const YourView = () => {
  return (
    <div className="mb-[32px]">
      <div className="text-[#FFFFFF]">
        Please connect your wallet to view your items.
      </div>
      <div className="mt-[32px]">
        <SolanaConnectButton />
      </div>
    </div>
  );
};

export default YourView;
