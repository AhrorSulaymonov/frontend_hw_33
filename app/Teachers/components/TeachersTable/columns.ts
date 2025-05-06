export const teacherTableCols = [
  {
    title: "Ism",
    dataIndex: "firstName",
    width: 30,
  },
  {
    title: "Familiya",
    dataIndex: "lastName",
    width: 30,
  },
  {
    title: "Tug'ilgan sana",
    dataIndex: "birthDate",
    width: 25, // Moslashtirildi
  },
  // Sinf(lar)ni ko'rsatish foydali bo'lishi mumkin
  // {
  //   title: "Biriktirilgan sinflar",
  //   dataIndex: "classes", // Buni formatlash kerak bo'ladi (masalan, ID larni join qilish)
  //   width: 20,
  // },
  {
    title: "Amallar",
    dataIndex: "actions",
    width: 15, // Moslashtirildi
  },
];
