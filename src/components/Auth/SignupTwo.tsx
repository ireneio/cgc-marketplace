import { useAppDispatch } from '@/store';
import { motion } from 'framer-motion';
import Button from '../Shared/Button';
import PrimaryGradientText from '../Shared/PrimaryGradientText';

const SignupTwo = ({
  onNextStep,
  onCancel,
}: {
  onNextStep: () => Promise<void>;
  onCancel: () => void;
}) => {
  const dispatch = useAppDispatch();

  const handleResendLink = () => {
    dispatch({
      type: 'SHOW_SNACKBAR',
      payload: { title: 'success', text: 'Link Sent!' },
    });
  };
  return (
    <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }}>
      <div className="mb-[135px] flex justify-center">
        <PrimaryGradientText
          className="hover:underline cursor-pointer"
          onClick={() => handleResendLink()}
        >
          Resend Link
        </PrimaryGradientText>
      </div>
      <div className="mt-3 px-[24px] pb-[24px]">
        <Button onClick={() => onNextStep()}>Next</Button>
        <div className="mt-[24px]">
          <Button
            link
            style={{ backgroundColor: '#181818' }}
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupTwo;
