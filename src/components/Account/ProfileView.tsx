import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Shared/Button';
import Input from '../Shared/Input';
import Menu from './Menu';

const SIDE_BAR_ITEMS = [
  {
    text: 'Edit Profile',
    value: 'Edit Profile',
    icon: '/img/icon_profile.svg',
  },
  // {
  //   text: 'Notifications',
  //   value: 'Notifications',
  //   icon: '/img/icon_bell.png',
  // },
  // { text: 'Choose Plan', value: 'Choose Plan', icon: '/img/icon_plan.png' },
  // {
  //   text: 'Security',
  //   value: 'Security',
  //   icon: '/img/icon_shield.png',
  // },
];

const ProfileView = () => {
  const [sidebar, setSidebar] = useState('Edit Profile');
  const { register } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      city: '',
      country: '',
      zipCode: '',
      state: '',
      password: '',
    },
  });

  const handleSave = async () => {
    console.log('handleSave');
  };

  return (
    <div className="flex">
      <div>
        <Menu
          items={SIDE_BAR_ITEMS}
          currentValue={sidebar}
          onItemClick={(value) => setSidebar(value)}
        />
      </div>
      <div className="ml-[40px] border-l-[2px] border-[#290030] pl-[40px]">
        {sidebar === 'Edit Profile' && (
          <div>
            <div className="flex items-center">
              <div>
                <Input
                  id="firstName"
                  label="First Name"
                  {...register('firstName')}
                />
              </div>
              <div className="ml-[40px]">
                <Input
                  id="lastName"
                  label="Last Name"
                  {...register('lastName')}
                />
              </div>
            </div>
            <div className="mt-[36px]">
              <Input
                id="email"
                type="email"
                label="Email"
                {...register('email')}
              />
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
        )}
      </div>
    </div>
  );
};

export default ProfileView;
