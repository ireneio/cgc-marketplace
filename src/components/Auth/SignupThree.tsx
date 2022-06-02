import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import Button from '../Shared/Button';
import FormInput from './FormInput';

const SignupThree = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: () => Promise<void>;
  onCancel: () => void;
}) => {
  const { register, watch } = useFormContext();
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  return (
    <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }}>
      <div className="py-8 space-y-6 px-[24px] min-h-full w-full flex flex-col justify-center">
        <div>
          <div className="mt-1">
            <FormInput
              placeholder="Password"
              id="password"
              type="password"
              required
              {...register('password')}
            />
          </div>
        </div>
        <div>
          <div className="mt-1">
            <FormInput
              placeholder="Confirm Password"
              id="confirmPassword"
              type="password"
              required
              {...register('confirmPassword')}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 px-[24px] pb-[24px]">
        <Button
          onClick={() => onSubmit()}
          disabled={password === '' || confirmPassword === ''}
        >
          Create Account
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

export default SignupThree;
