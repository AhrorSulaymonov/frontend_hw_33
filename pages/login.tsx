import { Login } from "@/app";
import React from "react";

const LoginPage = () => {
  return <Login />;
};

// Agar login sahifasida MainLayout ishlatilmasligi kerak bo'lsa:
// LoginPage.getLayout = function getLayout(page: React.ReactElement) {
//   return page;
// };

export default LoginPage;
