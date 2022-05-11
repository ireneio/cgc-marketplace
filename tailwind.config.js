module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        circularstdbold: 'CircularStd-Bold, sans-serif',
        circularstdmedium: 'CircularStd-Medium, sans-serif',
        circularstdbook: 'CircularStd-Book, sans-serif',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
};
