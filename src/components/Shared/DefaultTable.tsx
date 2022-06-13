import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

interface Props {
  rows: React.ReactNode[][] | string[][] | number[][] | any[][];
  headers: string[] | number[] | React.ReactNode[];
}

const DefaultTable = ({ rows, headers }: Props) => {
  return (
    <div className="rounded-[5px] border-solid border-[2px] border-[#290030] px-[0] overflow-auto">
      <Table>
        <Thead>
          <Tr>
            {headers.map((header, index) => {
              return (
                <Th key={index} className="px-[10px] py-[12px]">
                  {header}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {!rows.length && (
            <Tr className="text-[#FFFFFF] text-[18px] w-full flex items-center justify-center">
              No Data Available.
            </Tr>
          )}
          {rows.length &&
            rows.map((row, index) => {
              return (
                <Tr key={index} style={{ padding: 0, margin: 0 }}>
                  {row.map((col, _index) => {
                    return Object.keys(col).length ? (
                      <Td
                        key={_index}
                        style={{ padding: 0, margin: 0 }}
                        className="no_line_break"
                      >
                        <div>{col}</div>
                      </Td>
                    ) : (
                      <Td key={_index} className="no_line_break">
                        {String(col)}
                      </Td>
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
