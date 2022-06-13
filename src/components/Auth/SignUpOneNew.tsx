import Button from '../Shared/Button';
import { motion } from 'framer-motion';
import SolanaConnectButton from '../Web3/SolanaConnectButton';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';

const SignupOneNew = ({
  onNextStep,
  onCancel,
}: {
  onNextStep: () => Promise<void>;
  onCancel: () => void;
}) => {
  const wallet = useWallet();

  const checkWhitelist = async () => {
    return true;
  };

  const setCheck = async () => {
    const result = await checkWhitelist();
    if (result) {
      onNextStep();
    }
  };

  useEffect(() => {
    if (wallet.connected) {
      setCheck();
    }
  }, [wallet.connected]);

  return (
    <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }}>
      <div className="py-8 space-y-6 px-[24px] min-h-full w-full flex flex-col justify-center">
        <div className="text-[#FFFFFF] mb-[80px] flex justify-center">
          Please connect your wallet to continue
        </div>
      </div>
      <div className="mt-3 px-[24px] pb-[24px]">
        <div className="flex w-full justify-center">
          <SolanaConnectButton />
        </div>
        <div className="mt-[24px]">
          <Button
            link
            style={{ backgroundColor: '#181818' }}
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
        </div>
        {/* {!wallet.connected && (
          <div className="mt-[24px]">
            <Button
              link
              style={{ backgroundColor: '#181818' }}
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          </div>
        )} */}
      </div>
    </motion.div>
  );
};

export default SignupOneNew;
