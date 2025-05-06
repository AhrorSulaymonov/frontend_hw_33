import React, { FC } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { TableProps } from "./types";

// TypeScript uchun styled-component'ni kengaytirish
interface TableWrapperProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  isClass?: boolean;
}

const TableWrapper = styled.table<TableWrapperProps>`
  tr {
    cursor: ${(props) => (props.isClass ? "pointer" : "default")};
  }
`;

const Table: FC<TableProps> = (props) => {
  const router = useRouter();
  const {
    columns = [],
    dataSrc = [],
    loading = true,
    isClass,
    actionsCol = () => null,
  } = props;

  const loadingContent =
    dataSrc.length === 0 && !!loading ? (
      <tr>
        <td colSpan={columns.length} style={{ textAlign: "center" }}>
          Loading...
        </td>
      </tr>
    ) : null;

  const emptyContent =
    dataSrc.length === 0 && !loading ? (
      <tr>
        <td colSpan={columns.length} style={{ textAlign: "center" }}>
          No Data
        </td>
      </tr>
    ) : null;

  const handleRowClick = (data: any) => {
    if (isClass) {
      const classId = data.id; // classId ni aniqlash
      router.push(`/students?classId=${classId}`);
    }
  };

  return (
    <TableWrapper isClass={isClass}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th style={{ width: `${column.width}%` }} key={column.dataIndex}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loadingContent}
          {emptyContent}
          {dataSrc.map((data) => (
            <tr
              key={data[columns[0]?.dataIndex]}
              onClick={() => handleRowClick(data)}
            >
              {columns.map((col) => {
                return col.dataIndex === "actions" ? (
                  <td style={{ width: `${col.width}%` }} key={col.dataIndex}>
                    {actionsCol(data)}
                  </td>
                ) : (
                  <td style={{ width: `${col.width}%` }} key={col.dataIndex}>
                    {data[col.dataIndex]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default Table;
