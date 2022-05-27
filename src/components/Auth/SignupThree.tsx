import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import Button from '../Shared/Button';

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
            <input
              placeholder="Password"
              id="password"
              type="password"
              required
              {...register('password')}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md
                shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FFFFFF]
                focus:border-[#FFFFFF] sm:text-sm font-circularstdbook bg-[#0C001C] text-[#FFFFFF]"
            />
          </div>
        </div>
        <div>
          <div className="mt-1">
            <input
              placeholder="Confirm Password"
              id="confirmPassword"
              type="password"
              required
              {...register('confirmPassword')}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md
                shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FFFFFF]
                focus:border-[#FFFFFF] sm:text-sm font-circularstdbook bg-[#0C001C] text-[#FFFFFF]"
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
        <div className="mt-[12px]">
          <Button onClick={() => onCancel()}>Cancel</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupThree;
