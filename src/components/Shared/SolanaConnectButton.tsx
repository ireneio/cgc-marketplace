import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const SolanaConnectButton = () => {
  return (
    <div className="flex">
      <div
        style={{
          background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
        }}
        className="relative px-[2px] py-[2px] rounded-[5px] cursor-pointer wallet-solana flex justify-center items-center"
      >
        <WalletMultiButton />
      </div>
    </div>
  );
};

export default SolanaConnectButton;
