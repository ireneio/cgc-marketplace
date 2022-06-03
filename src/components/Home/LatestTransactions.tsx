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
              { icon: '/img/icon_shards.png', text: 'shards' },
              'AC95124da74ca921wdpk1134',
              new Date().toISOString(),
              'AC95124da74ca921wdpk1134',
              'AC95124da74ca921wdpk1134',
              '123.45678',
            ],
            [
              { icon: '/img/icon_chicks.png', text: 'chicks' },
              'AC95124da74ca921wdpk1134',
              new Date().toISOString(),
              'AC95124da74ca921wdpk1134',
              'AC95124da74ca921wdpk1134',
              '12345678.45678',
            ],
            [
              { icon: '/img/icon_sol.png', text: 'chicks' },
              'AC95124da74ca921wdpk1134',
              new Date().toISOString(),
              'AC95124da74ca921wdpk1134',
              'AC95124da74ca921wdpk1134',
              '12399999999.45678',
            ],
          ]}
          headers={['item', 'signature', 'time', 'from', 'to', 'amount($USD)']}
        />
      </div>
    </div>
  );
};

export default LatestTransactions;
