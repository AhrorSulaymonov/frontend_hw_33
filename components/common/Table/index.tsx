import React, { FC } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { TableProps } from "./types";

interface TableWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  isClass?: boolean;
}

const TableWrapper = styled.div<TableWrapperProps>`
  width: 100%;
  border: 1px solid #f0f0f0;
  border-radius: 10px 10px 0 0;
  overflow: hidden;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  table tbody tr,
  table tr th,
  table tr td {
    border: 1px solid #f0f0f0;
  }

  th,
  td {
    padding: 6px 14px;
  }

  th {
    text-align: left;
    background-color: #f0f0f060;
  }

  tr {
    cursor: ${(props) => (props.isClass ? "pointer" : "default")};
    &:hover {
      background-color: ${(props) =>
        props.isClass ? "#f9f9f9" : "transparent"};
    }
  }
`;

const Table: FC<TableProps> = (props) => {
  const router = useRouter();
  const {
    columns = [],
    dataSrc = [],
    loading = false, // Odatda hook dan keladi, boshlang'ich qiymat false
    isClass,
    actionsCol = () => null,
  } = props;

  const loadingContent =
    loading && dataSrc.length === 0 ? ( // loading true va data yo'q bo'lsa
      <tr>
        <td colSpan={columns.length} style={{ textAlign: "center" }}>
          Yuklanmoqda...
        </td>
      </tr>
    ) : null;

  const emptyContent =
    !loading && dataSrc.length === 0 ? ( // loading false va data yo'q bo'lsa
      <tr>
        <td colSpan={columns.length} style={{ textAlign: "center" }}>
          Ma'lumotlar mavjud emas
        </td>
      </tr>
    ) : null;

  const handleRowClick = (data: any) => {
    if (isClass && data.id) {
      router.push(`/students?classId=${data.id}`);
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
          {dataSrc.map(
            (
              data,
              index // data da unique id bo'lmasa index ishlatish mumkin, lekin id afzal
            ) => (
              <tr
                key={data.id || `row-${index}`} // Har bir data elementi uchun 'id' bo'lishi kerak
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
            )
          )}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default Table;
