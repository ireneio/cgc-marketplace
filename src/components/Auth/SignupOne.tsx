import { useFormContext } from 'react-hook-form';
import Button from '../Shared/Button';

const SignupOne = ({
  onNextStep,
  onCancel,
}: {
  onNextStep: () => Promise<void>;
  onCancel: () => void;
}) => {
  const { register, watch } = useFormContext();
  const username = watch('username');
  const email = watch('email');

  return (
    <div>
      <div className="py-8 space-y-6 px-[24px] min-h-full w-full flex flex-col justify-center">
        <div>
          <div className="mt-1">
            <input
              placeholder="Username"
              id="username"
              type="text"
              required
              {...register('username')}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md
              shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FFFFFF]
              focus:border-[#FFFFFF] sm:text-sm font-circularstdbook bg-[#0C001C] text-[#FFFFFF]"
            />
          </div>
        </div>
        <div>
          <div className="mt-1">
            <input
              placeholder="Email"
              id="email"
              type="email"
              autoComplete="email"
              required
              {...register('email')}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md
              shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FFFFFF]
              focus:border-[#FFFFFF] sm:text-sm font-circularstdbook bg-[#0C001C] text-[#FFFFFF]"
            />
          </div>
        </div>
      </div>
      <div className="mt-3 px-[24px] pb-[24px]">
        <Button
          onClick={() => onNextStep()}
          disabled={username === '' || email === ''}
        >
          Next
        </Button>
        <div className="mt-[12px]">
          <Button onClick={() => onCancel()}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default SignupOne;
