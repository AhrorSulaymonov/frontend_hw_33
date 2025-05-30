import React from "react";
import ClassesTable from "./components/ClassesTable";
import { ClassesPageWrapper } from "./Classes.styles";
import { Button } from "@/components";
import { useRouter } from "next/router";

const Classes = () => {
  const router = useRouter();
  const navigateToCreate = () => router.push("/classes/create");

  return (
    <ClassesPageWrapper>
      <div className="title-side">
        <h1>Sinflar</h1>
        <Button onClick={navigateToCreate} title="Sinf qo'shish" />
      </div>
      <ClassesTable />
    </ClassesPageWrapper>
  );
};

export default Classes;
