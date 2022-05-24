import { CollectionInfo } from '@/pages/launchpad/[id]';
import { useEffect, useMemo, useState } from 'react';
import Divider from '../Shared/Divider';
import Tag from '../Shared/Tag';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

const getRandomHex = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

const AllocationPanel = ({ info }: { info: CollectionInfo }) => {
  const [currentSelected, setCurrentSelected] = useState({
    name: '',
    percentage: 0,
    chartColor: '#181818',
  });

  const [chartData, setChartData] = useState({
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  });

  const data = useMemo(() => {
    return info.allocation.map((item) => ({
      ...item,
      chartColor: `#${getRandomHex()}`,
    }));
  }, [info.allocation]);

  useEffect(() => {
    setChartData({
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: '',
          data: data.map((item) => item.percentage),
          backgroundColor: data.map((item) => item.chartColor),
          hoverOffset: 4,
        },
      ],
    });
    if (data.length) {
      setCurrentSelected(data[0]);
    }
  }, [data]);

  return (
    <Tag className="mt-[30px] px-[28px] py-[24px]">
      <div>
        <div className="text-[#FFFFFF] font-bold text-[16px]">Allocation</div>
        <div className="mt-[14px]">
          <Divider />
        </div>
        <div className="mt-[24px] flex items-center flex-wrap">
          <div
            style={{ flexBasis: '25%' }}
            className="relative w-[180px] h-[180px] flex justify-center items-center text-[#FFFFFF] mb-[24px]"
          >
            <div className="absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <div className="text-[12px]">{currentSelected.name}</div>
              <div className="mt-[0px] font-bold text-[18px]">
                {currentSelected.percentage}%
              </div>
            </div>
            <div className="w-[180px] h-[180px]">
              <Doughnut data={chartData} />
            </div>
          </div>
          <div
            style={{ flexBasis: '75%' }}
            className="pl-[48px] grid grid-cols-3 gap-y-[12px]"
          >
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => setCurrentSelected(item)}
                >
                  <div
                    className="rounded-[5px] bg-[#FFFFFF] w-[15px] h-[15px]"
                    style={{ backgroundColor: item.chartColor }}
                  ></div>
                  <div className="ml-[14px] text-[#FFFFFF] text-[14px]">
                    {item.name}:
                  </div>
                  <div className="ml-[8px] font-bold">{item.percentage}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default AllocationPanel;
