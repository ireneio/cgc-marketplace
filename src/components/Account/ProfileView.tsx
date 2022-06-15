import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import EditProfileForm from './EditProfileForm';
import Menu from './Menu';

const SIDE_BAR_ITEMS = [
  {
    text: 'Edit Profile',
    value: 'edit_profile',
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
  const [sidebar, setSidebar] = useState('edit_profile');
  const form = useForm({
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
    <FormProvider {...form}>
      <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-6">
        <div className="mb-[24px] md:mb-0 md:mr-[40px] 2xl:cols-span-2">
          <Menu
            items={SIDE_BAR_ITEMS}
            currentValue={sidebar}
            onItemClick={(item) => setSidebar(item.value)}
          />
        </div>
        <div className="nd:border-l-[2px] border-[#290030] md:pl-[40px] col-span-2 border-0 2xl:cols-span-4">
          {sidebar === 'edit_profile' && <EditProfileForm />}
        </div>
      </div>
    </FormProvider>
  );
};

export default ProfileView;
