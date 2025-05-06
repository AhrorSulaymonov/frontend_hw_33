import React from "react";
import TeachersTable from "./components/TeachersTable";
import { TeachersPageWrapper } from "./Teachers.styles";
import { Button } from "@/components";
import { useRouter } from "next/router";

const Teachers = () => {
  const router = useRouter();
  const navigateToCreate = () => router.push("/teachers/create");

  return (
    <TeachersPageWrapper>
      <div className="title-side">
        <h1>O'qituvchilar</h1>
        <Button onClick={navigateToCreate} title="O'qituvchi qo'shish" />
      </div>
      <TeachersTable />
    </TeachersPageWrapper>
  );
};

export default Teachers;
