import { Disclosure } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AccountMenu from '@/components/Shared/AccountMenu';
import { classNames } from '@/utils/cgcConsts';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import EvmConnectButton from '@/components/Shared/EvmConnectButton';

export default function Navbar() {
  const router = useRouter();
  const navigation = [
    {
      name: 'Explore',
      href: '/explore',
      current: router.pathname == '/explore',
    },
    {
      name: 'Sell',
      href: '/sell',
      current: router.pathname == '/sell',
    },
    {
      name: 'Launchpad',
      href: '/launchpad',
      current: router.pathname == '/launchpad',
    },
    { name: 'Cart', href: '/cart', current: router.pathname == '/cart' },
  ];

  return (
    <div>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="relative bg-[#141414]">
              <div className="mx-auto px-2 sm:px-4 lg:px-8 z-50 bg-opacity-70 fixed w-full bg-[#141414]">
                <div className="relative flex items-center justify-between h-16">
                  <div className="flex items-center px-2 lg:px-0">
                    <div className="flex-shrink-0 hover:cursor-pointer hover:opacity-50">
                      <Link href={'/'} passHref>
                        <img
                          className="block lg:hidden h-8 w-auto"
                          src={'/img/cgc_icon.png'}
                          alt="Catheon Gaming"
                        />
                      </Link>
                      <Link href={'/'} passHref>
                        <img
                          className="hidden lg:block h-8 w-auto"
                          src={'/img/cgc_logo_white.png'}
                          alt="Catheon Gaming"
                        />
                      </Link>
                    </div>
                    <div className="hidden lg:block lg:ml-6">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <Link href={item.href} key={item.name}>
                            <a
                              key={item.name}
                              className={classNames(
                                item.current
                                  ? 'text-white font-bold'
                                  : 'text-gray-300',
                                'px-3 py-2 rounded-md text-md font-circularstdbold hover:bg-indigo-800 hover:text-white',
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                    <div className="max-w-lg w-full lg:max-w-xs">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                          <SearchIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5
                      bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white
                      focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm font-circularstdbold"
                          placeholder="Search"
                          type="search"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:hidden">
                    <Disclosure.Button
                      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400
                hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="connect-solana-wallet-button px-2 hidden lg:block">
                    <WalletMultiButton />
                  </div>
                  <EvmConnectButton />
                  <AccountMenu />
                </div>
              </div>
              <Disclosure.Panel className="lg:hidden fixed z-10 bg-[#141414] w-full">
                <div className="px-2 mt-16 pb-3 space-y-1 font-circularstdbold">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
}
