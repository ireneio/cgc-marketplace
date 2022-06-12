import { useFormContext } from 'react-hook-form';
import Button from '../Shared/Button';
import { motion } from 'framer-motion';
import FormInput from './FormInput';

const SignUpTwoNew = ({
  onNextStep,
  onCancel,
}: {
  onNextStep: () => Promise<void>;
  onCancel: () => void;
}) => {
  const { register, watch } = useFormContext();
  // const username = watch('username');
  const email = watch('email');
  const password = watch('password');

  return (
    <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }}>
      <div className="py-8 space-y-6 px-[24px] min-h-full w-full flex flex-col justify-center">
        <div>
          <div className="relative mt-1">
            <FormInput
              placeholder="Email"
              id="email"
              type="email"
              autoComplete="email"
              required
              {...register('email')}
            />
          </div>
        </div>
        <div>
          <div className="relative mt-1">
            <FormInput
              placeholder="password"
              id="password"
              type="password"
              autoComplete="password"
              required
              {...register('password')}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 px-[24px] pb-[24px]">
        <Button
          onClick={() => onNextStep()}
          disabled={email === '' || password === ''}
        >
          Next
        </Button>
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

export default SignUpTwoNew;
