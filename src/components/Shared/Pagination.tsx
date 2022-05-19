import { useMemo } from 'react';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void | Promise<void>;
  onPreviousPage: () => void | Promise<void>;
  onNextPage: () => void | Promise<void>;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  onPreviousPage,
  onNextPage,
}: Props) => {
  const pagesMap = useMemo(() => {
    if (totalPages <= 5) {
      return Array(totalPages)
        .fill(0)
        .map((item, index) => index);
    }
    const arr = [];
    if (currentPage + 3 >= totalPages - 1) {
      arr.push('...');
      arr.push(totalPages - 4);
      arr.push(totalPages - 3);
      arr.push(totalPages - 2);
      arr.push(totalPages - 1);
      return arr;
    }

    if (currentPage !== 0) {
      arr.push(currentPage - 1);
      arr.push(currentPage);
    } else {
      arr.push(currentPage);
      arr.push(currentPage + 1);
    }
    arr.push('...');
    arr.push(totalPages - 2);
    arr.push(totalPages - 1);
    return arr;
  }, [totalPages, currentPage]);

  return (
    <div className="flex items-center border-solid border-1px">
      <button
        className="w-[38px] h-[38px] flex items-center justify-center  border-solid border-[1px] border-[#290030] hover:bg-[#FC1F8E] rounded-tl-[5px] rounded-bl-[5px] cursor-pointer disabled:cursor-not-allowed disabled:bg-[#181818]"
        onClick={() => {
          if (currentPage !== 0) {
            onPreviousPage && onPreviousPage();
          }
        }}
        disabled={currentPage === 0}
        style={{
          background:
            currentPage === 0
              ? '#181818'
              : 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
        }}
      >
        <img src="/img/chevron_left.png" alt="arrow left" />
      </button>
      {pagesMap.map((item) => {
        return (
          <div key={item}>
            <button
              className="text-[#FFFFFF] w-[38px] h-[38px] flex items-center justify-center border-solid border-[1px] border-[#290030] hover:bg-[#FC1F8E]"
              style={{
                background:
                  currentPage === item
                    ? 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)'
                    : 'transparent',
              }}
              onClick={() => {
                if (item !== '...') {
                  onPageChange && onPageChange(Number(item));
                }
              }}
            >
              {isNaN(Number(item)) ? item : Number(item) + 1}
            </button>
          </div>
        );
      })}
      <button
        className="w-[38px] h-[38px] flex items-center justify-center border-solid border-[1px] border-[#290030] hover:bg-[#FC1F8E] rounded-tr-[5px] rounded-br-[5px] cursor-pointer disabled:cursor-not-allowed disabled:bg-[#181818]"
        onClick={() => {
          if (currentPage !== totalPages - 1) {
            onNextPage && onNextPage();
          }
        }}
        disabled={currentPage === totalPages - 1}
        style={{
          background:
            currentPage === totalPages - 1
              ? '#181818'
              : 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
        }}
      >
        <img src="/img/chevron_right.png" alt="arrow right" />
      </button>
    </div>
  );
};

export default Pagination;
