import React from "react";

import { Typography } from "neetoui";
import { useTable } from "react-table";

import { COLUMNS } from "./constants";

const Table = ({ reports }) => {
  const data = React.useMemo(
    () => [
      ...reports.map(report => {
        return {
          col1: <Typography style="body2">{report.title} Quiz</Typography>,
          col2: (
            <Typography style="body2">
              {`${report.first_name} ${report.last_name}`}
            </Typography>
          ),
          col3: <Typography style="body2">{report.email}</Typography>,
          col4: (
            <Typography style="body2">
              {report.correct_answers_count}
            </Typography>
          ),
          col5: (
            <Typography style="body2">
              {report.incorrect_answers_count}
            </Typography>
          ),
        };
      }),
    ],
    [reports]
  );

  const columns = React.useMemo(() => COLUMNS, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      className="min-w-full divide-y divide-gray-200 border"
    >
      <thead className="bg-gray-50">
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, index) => (
              <th
                key={index}
                {...column.getHeaderProps()}
                className="px-6 py-3 text-left text-sm  border-gray-200 border-2 border-collapse font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        {...getTableBodyProps()}
        className="bg-white divide-y divide-gray-200"
      >
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr
              key={index}
              {...row.getRowProps()}
              className={index % 2 ? "bg-gray-300" : "bg-gray-100"}
            >
              {row.cells.map((cell, index) => {
                return (
                  <td
                    key={index}
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-gray-700 border-gray-200 border-2 border-collapse"
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
