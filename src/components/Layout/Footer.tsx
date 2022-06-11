import { SVGProps } from 'react';
import Button from '../Shared/Button';
import FooterVerticalList from './FooterVerticalList';

export default function Footer() {
  const footerNavigation = {
    collections: [
      {
        name: `SolChicks`,
        href: `https://catheongaming.com/projects/solchicks`,
      },
      {
        name: `Seoul Stars`,
        href: `https://catheongaming.com/projects/seoul-stars`,
      },
      {
        name: `Angrymals`,
        href: `https://catheongaming.com/projects/angrymals`,
      },
      {
        name: `Voyagers In Paradise`,
        href: `https://catheongaming.com/projects/voyageip`,
      },
    ],
    company: [
      { name: `About`, href: `https://catheongaming.com/about` },
      { name: `Services`, href: `https://catheongaming.com/services` },
      { name: `People`, href: `https://catheongaming.com/people` },
      { name: `Careers`, href: `https://catheongaming.com/careers` },
    ],
    support: [
      { name: `Media`, href: `https://catheongaming.com/media` },
      { name: `Press Kit`, href: `https://catheongaming.com/media/#press-kit` },
      {
        name: `Terms of Service`,
        href: `https://catheongaming.com/terms-of-service`,
      },
      {
        name: `Privacy Policy`,
        href: `https://catheongaming.com/privacy-policy`,
      },
    ],
    social: [
      {
        name: `Facebook`,
        href: `#`,
        icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: `Instagram`,
        href: `#`,
        icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: `Twitter`,
        href: `#`,
        icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        ),
      },
      {
        name: `YouTube`,
        href: `#`,
        icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
          <svg
            fill="currentColor"
            viewBox="0 0 48 48"
            {...props}
            width="24"
            height="24"
          >
            <path d="M 23.857422 8.5 C 17.504717 8.5 11.602344 8.9526234 8.234375 9.65625 A 1.50015 1.50015 0 0 0 8.2128906 9.6621094 C 5.6754768 10.230693 3.2861897 12.048234 2.7832031 14.894531 A 1.50015 1.50015 0 0 0 2.78125 14.90625 C 2.394836 17.200265 2 20.190694 2 24.5 C 2 28.801151 2.3961903 31.712324 2.8847656 34.126953 C 3.4000756 36.889296 5.7342165 38.761817 8.3105469 39.337891 A 1.50015 1.50015 0 0 0 8.3476562 39.347656 C 11.86271 40.040284 17.598467 40.5 23.951172 40.5 C 30.303877 40.5 36.042686 40.04028 39.558594 39.347656 A 1.50015 1.50015 0 0 0 39.595703 39.337891 C 42.133117 38.769306 44.522404 36.951766 45.025391 34.105469 A 1.50015 1.50015 0 0 0 45.029297 34.083984 C 45.409789 31.743169 45.902812 28.755621 46 24.439453 A 1.50015 1.50015 0 0 0 46 24.40625 C 46 20.087697 45.50571 17.078675 45.023438 14.695312 C 44.512192 11.927074 42.175378 10.049478 39.595703 9.4726562 A 1.50015 1.50015 0 0 0 39.476562 9.4511719 C 36.0464 8.9689502 30.211115 8.5 23.857422 8.5 z M 20.15625 17.001953 C 20.526656 16.994297 20.909531 17.081906 21.269531 17.285156 L 29.873047 22.146484 C 31.324047 22.966484 31.324047 25.035469 29.873047 25.855469 L 21.269531 30.716797 C 19.830531 31.528797 18.037109 30.500328 18.037109 28.861328 L 18.037109 19.138672 C 18.037109 17.909422 19.045031 17.024922 20.15625 17.001953 z" />
          </svg>
        ),
      },
    ],
  };

  const handleSubscribe = () => {
    console.log('handleSubscribe');
  };

  return (
    <footer className="bg-[#0C001C]" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-8xl mx-auto pt-8 pb-8 px-4 sm:px-6 lg:pt-12 lg:px-8 border-t border-[#290030]">
        <div className="xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="xl:mt-0">
            <img
              className="block h-16 w-auto mb-4"
              src={'/img/cgc_logo_white.png'}
              alt="CGC Logo"
            />
            <span className="text-gray-500 text-sm">
              Catheon Gaming is the fastest growing integrated blockchain gaming
              and entertainment company globally.
            </span>
          </div>
          <div className="xl:mt-0 mt-12">
            <FooterVerticalList
              title="Collections"
              itemList={footerNavigation.collections}
            />
          </div>
          <div className="xl:mt-0 mt-12">
            <div>
              <FooterVerticalList
                title="Company"
                itemList={footerNavigation.company}
              />
            </div>
          </div>
          <div className="xl:mt-0 mt-12">
            <FooterVerticalList
              title="Support"
              itemList={footerNavigation.support}
            />
          </div>
          <div className="xl:mt-0 mt-12">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Get In Touch
            </h3>
            <p className="mt-4 text-gray-500 text-sm">
              Subscribe to our newsletter in order to receive the latest
              updates.
            </p>
            <div className="mt-6 rounded-md sm:flex-shrink-0">
              <Button onClick={() => handleSubscribe()}>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-[#290030] pt-8 md:flex md:items-center md:justify-between lg:mt-12">
          <div className="flex space-x-6 md:order-2">
            {footerNavigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-[#9497AA] md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} Catheon Gaming. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
