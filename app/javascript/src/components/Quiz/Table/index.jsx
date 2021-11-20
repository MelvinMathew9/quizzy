import React from "react";

import { Highlight, Delete } from "neetoicons";
import { Button } from "neetoui";
import { useTable } from "react-table";

import { COLUMNS } from "./constants";

const Table = ({ quizzes, setShowModal, setQuiz }) => {
  const handleDelete = quiz => {
    setQuiz(quiz);
    setShowModal(true);
  };
  const data = React.useMemo(
    () => [
      ...quizzes.map(quiz => {
        return {
          col1: (
            <div className="flex">
              <Button
                style="link"
                to={`/quizzes/${quiz.id}/show`}
                label={quiz.title}
                className="flex-grow"
              />
              <div className="flex space-x-2 justify-end">
                <Button
                  style="secondary"
                  icon={Highlight}
                  to={`/quizzes/${quiz?.id}/edit`}
                  iconPosition="left"
                  label="Edit"
                ></Button>
                <Button
                  style="primary"
                  icon={Delete}
                  onClick={() => handleDelete(quiz)}
                  iconPosition="left"
                  label="Delete"
                ></Button>
              </div>
            </div>
          ),
        };
      }),
    ],
    [quizzes]
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
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
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
                    className="px-6 py-4 whitespace-nowrap text-gray-700"
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
