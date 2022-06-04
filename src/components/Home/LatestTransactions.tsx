import { useState } from 'react';
import Pagination from '../Shared/Pagination';
import SectionTitle from '../Shared/SectionTitle';
import TransactionTable from './TransactionTable';

const LatestTransactions = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div>
      <div className="flex justify-between items-center">
        <SectionTitle>latest transactions</SectionTitle>
        <div>
          <Pagination
            totalPages={15}
            currentPage={currentPage}
            onPageChange={(val) => setCurrentPage(val)}
            onPreviousPage={() => setCurrentPage((prev) => prev - 1)}
            onNextPage={() => setCurrentPage((prev) => prev + 1)}
          />
        </div>
      </div>
      <div className="mt-[24px]">
        <TransactionTable
          rows={[
            [
              {
                icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8j3hXRK5rdoZ2vSpGLRmXtWmW6iYaRUw5xVk4Kzmc9Hp/logo.png',
                text: 'shards',
              },
              'AC95124da74ca921wdpk1134',
              new Date().toISOString(),
              'AC95124da74ca921wdpk1134',
              'AC95124da74ca921wdpk1134',
              '123.45678',
            ],
            [
              {
                icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/cxxShYRVcepDudXhe7U62QHvw8uBJoKFifmzggGKVC2/logo.png',
                text: 'chicks',
              },
              'AC95124da74ca921wdpk1134',
              new Date().toISOString(),
              'AC95124da74ca921wdpk1134',
              'AC95124da74ca921wdpk1134',
              '12345678.45678',
            ],
            [
              {
                icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8j3hXRK5rdoZ2vSpGLRmXtWmW6iYaRUw5xVk4Kzmc9Hp/logo.png',
                text: 'shards',
              },
              'AC95124da74ca921wdpk1134',
              new Date().toISOString(),
              'AC95124da74ca921wdpk1134',
              'AC95124da74ca921wdpk1134',
              '123.45678',
            ],
            [
              {
                icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/cxxShYRVcepDudXhe7U62QHvw8uBJoKFifmzggGKVC2/logo.png',
                text: 'chicks',
              },
              'AC95124da74ca921wdpk1134',
              new Date().toISOString(),
              'AC95124da74ca921wdpk1134',
              'AC95124da74ca921wdpk1134',
              '12345678.45678',
            ],
            [
              {
                icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/cxxShYRVcepDudXhe7U62QHvw8uBJoKFifmzggGKVC2/logo.png',
                text: 'chicks',
              },
              'AC95124da74ca921wdpk1134',
              new Date().toISOString(),
              'AC95124da74ca921wdpk1134',
              'AC95124da74ca921wdpk1134',
              '12345678.45678',
            ],
          ]}
          headers={['item', 'signature', 'time', 'from', 'to', 'amount($USD)']}
        />
      </div>
    </div>
  );
};

export default LatestTransactions;
