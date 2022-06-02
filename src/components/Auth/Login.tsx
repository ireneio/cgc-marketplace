import { useFormContext } from 'react-hook-form';
import Button from '../Shared/Button';
import { motion } from 'framer-motion';
import PrimaryGradientText from '../Shared/PrimaryGradientText';
import FormInput from './FormInput';

const Login = ({
  onLogin,
  onCancel,
  loading,
}: {
  onLogin: () => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}) => {
  const { register, watch } = useFormContext();
  const email = watch('email');
  const password = watch('password');

  const handleForgotPassword = () => {
    // TODO
  };

  return (
    <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }}>
      <div className="py-8 space-y-6 px-[24px] min-h-full justify flex-col justify-center w-full">
        <div>
          <div className="mt-1">
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
              placeholder="Password"
              id="password"
              type="password"
              autoComplete="password"
              required
              {...register('password')}
            />
            <div className="absolute right-0 bottom-[-24px] flex justify-end">
              <div
                className="underline cursor-pointer text-[12px]"
                onClick={() => handleForgotPassword()}
              >
                <PrimaryGradientText underline>
                  Forgot Password
                </PrimaryGradientText>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 px-[24px] pb-[24px]">
        <Button
          onClick={() => onLogin()}
          disabled={email === '' || password === '' || loading}
          filled
        >
          Sign In
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

export default Login;
