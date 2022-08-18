// creating table instance

import React, { useMemo } from "react";
// useMemo ensures that table is not getting recreated during each render
import { COLUMNS } from "./columns.js";
import MOCK_DATA from "./MOCK_DATA.json";
import { useTable, useSortBy } from "react-table";

function SortingTable() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  // creating the instance of the table
  const tableInstance = useTable(
    {
      columns: columns,
      data: data
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = tableInstance;
  return (
    // creating basic table structure

    <table {...getTableProps()} className="table table-hover">
      <thead>
        {" "}
        {/* header of the table */}
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {" "}
            {/* row of the table */}
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                scope="col"
              >
                {" "}
                {/* data in header */}
                {column.render("Header")}
                <span>
                  {column.isSorted
                    ? column.isSortedDec
                      ? "Decending"
                      : " Asc"
                    : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {" "}
        {/* get table body props */}
        {rows.map((row) => {
          {
            /* from rows take individual row */
          }
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} scope="row">
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <td {...column.getFooterGroupProps}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}

export default SortingTable;
