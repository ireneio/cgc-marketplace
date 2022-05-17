import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

interface Props {
  rows: React.ReactNode[][] | string[][] | number[][] | any[][];
  headers: string[] | number[] | React.ReactNode[];
}

const DefaultTable = ({ rows, headers }: Props) => {
  return (
    <div className="rounded-[5px] border-solid border-[2px] border-[#290030] px-[12px]">
      <Table>
        <Thead>
          <Tr>
            {headers.map((header, index) => {
              return <Th key={index}>{header}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, index) => {
            return (
              <Tr key={index}>
                {row.map((col, _index) => {
                  return Object.keys(col).length ? (
                    <Td key={_index}>
                      <div>{col}</div>
                    </Td>
                  ) : (
                    <Td key={_index}>{String(col)}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
};

export default DefaultTable;
