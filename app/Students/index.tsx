import React from "react";
import StudentsTable from "./components/StudentsTable";
import { StudetsPageWrapper } from "./Students.styles"; // 'StudentsPageWrapper' to'g'ri
import { Button } from "@/components";
import { useRouter } from "next/router";

const Students = () => {
  const router = useRouter();
  const { classId } = router.query;

  const navigateToCreate = () => router.push("/students/create");

  return (
    <StudetsPageWrapper>
      {!classId && ( // Faqat barcha o'quvchilar sahifasida ko'rsatilsin
        <div className="title-side">
          <h1>O'quvchilar</h1>
          <Button onClick={navigateToCreate} title="O'quvchi qo'shish" />
        </div>
      )}
      <StudentsTable />
    </StudetsPageWrapper>
  );
};

export default Students;
