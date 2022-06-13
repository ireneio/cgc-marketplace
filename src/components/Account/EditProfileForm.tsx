import { useFormContext } from 'react-hook-form';
import Button from '../Shared/Button';
import Input from '../Shared/Input';

const EditProfileForm = () => {
  const { register } = useFormContext();

  const handleSave = async () => {
    // TODO
  };

  return (
    <div className="mb-[24px]">
      <div className="flex items-center">
        <div>
          <Input id="firstName" label="First Name" {...register('firstName')} />
        </div>
        <div className="ml-[40px]">
          <Input id="lastName" label="Last Name" {...register('lastName')} />
        </div>
      </div>
      <div className="mt-[36px]">
        <Input id="email" type="email" label="Email" {...register('email')} />
      </div>
      <div className="mt-[36px]">
        <Input
          id="password"
          type="password"
          label="Password"
          {...register('password')}
        />
      </div>
      <div className="mt-[36px]">
        <Input
          id="phone"
          type="text"
          label="Contact Number"
          {...register('phoneNumber')}
        />
      </div>
      <div className="mt-[36px]">
        <Input
          id="address"
          type="text"
          label="Address"
          {...register('address')}
        />
      </div>
      <div className="flex items-center mt-[36px]">
        <div>
          <Input id="city" label="City" {...register('city')} />
        </div>
        <div className="ml-[40px]">
          <Input id="state" label="State" {...register('state')} />
        </div>
      </div>
      <div className="flex items-center mt-[36px]">
        <div>
          <Input id="zip" label="Zip Code" {...register('zipCode')} />
        </div>
        <div className="ml-[40px]">
          <Input id="country" label="Country" {...register('country')} />
        </div>
      </div>
      <div className="mt-[36px] w-[180px]">
        <Button onClick={() => handleSave()}>Save Changes</Button>
      </div>
    </div>
  );
};

export default EditProfileForm;
