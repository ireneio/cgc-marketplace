/* eslint-disable @typescript-eslint/no-explicit-any,no-console */
const ConsoleHelper = (...args: any[]) => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === `production`) return;
  console.log(...args);
};

export default ConsoleHelper;
