import React from "react";
import TeachersTable from "./components/TeachersTable"; // To'g'ri komponent import qilinadi
import { TeachersPageWrapper } from "./Teachers.styles"; // Wrapper nomi o'zgartirildi
import { Button } from "@/components";
import { useRouter } from "next/router";

const Teachers = () => {
  const router = useRouter();

  const navigateToCreate = () => router.push("/teachers/create"); // O'qituvchi yaratish sahifasiga yo'naltirish

  return (
    <TeachersPageWrapper>
      <div className="title-side">
        <h1>O'qituvchilar</h1>
        <Button onClick={navigateToCreate}>O'qituvchi qo'shish</Button>
      </div>
      <TeachersTable />
    </TeachersPageWrapper>
  );
};

export default Teachers;
