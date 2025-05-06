export const studentTableCols = [
  {
    title: "Ism",
    dataIndex: "firstName",
    width: 25, // Umumiy width 100% bo'lishi uchun moslashtiring
  },
  {
    title: "Familiya",
    dataIndex: "lastName",
    width: 25,
  },
  {
    title: "Tug'ilgan sana",
    dataIndex: "birthDate",
    width: 25,
  },
  // Sinf ID sini ko'rsatish foydali bo'lishi mumkin
  {
    title: "Sinf ID",
    dataIndex: "classId",
    width: 15,
  },
  {
    title: "Amallar",
    dataIndex: "actions",
    width: 10,
  },
];
