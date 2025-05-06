import React from "react";
import { Button, Table } from "@/components";
import { studentTableCols } from "./columns";
import {
  deleteStudentMutation,
  useStudents,
  useStudentsByClassId,
} from "@/hooks";
import { ActionsWrapper } from "./StTable.style";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const StudentsTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { classId } = router.query;

  const studentsQuery = classId
    ? useStudentsByClassId(classId as string)
    : useStudents();

  const { data: students, isLoading, isError, error } = studentsQuery;

  const deleteMut = deleteStudentMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      if (classId) {
        queryClient.invalidateQueries({
          queryKey: ["students-by-classId", classId],
        });
      }
      toast.success("O'quvchi muvaffaqiyatli o'chirildi!");
    },
    onError: (err: any) => {
      toast.error(
        `O'quvchini o'chirishda xatolik: ${err?.message || "Noma'lum xatolik"}`
      );
    },
  });

  const handleDelete = async (student: any) => {
    if (
      window.confirm(
        `O'quvchi ${student.firstName} ${student.lastName}ni o'chirishni xohlaysizmi?`
      )
    ) {
      deleteMut.mutate(student.id);
    }
  };

  let tableTitle = "Barcha O'quvchilar";
  if (classId && students && students.length > 0) {
    // Sinf nomini olish kerak bo'lsa, qo'shimcha logikani qo'shish mumkin
    // Masalan, useOneClass hookidan foydalanib
    tableTitle = `${classId}-sinf o'quvchilari`;
  } else if (classId) {
    tableTitle = `${classId}-sinf o'quvchilari`;
  }

  if (isError) {
    return (
      <p>
        O'quvchilarni yuklashda xatolik yuz berdi: {error?.message}. Iltimos,
        sahifani yangilang.
      </p>
    );
  }

  return (
    <>
      {classId && <h2 style={{ marginBottom: "15px" }}>{tableTitle}</h2>}
      <Table
        dataSrc={students || []}
        columns={studentTableCols}
        loading={isLoading}
        actionsCol={(student) => (
          <ActionsWrapper>
            <Button onClick={() => handleDelete(student)}>O'chirish</Button>
            <Button href={`/students/edit/${student.id}`}>Yangilash</Button>
          </ActionsWrapper>
        )}
      />
    </>
  );
};

export default StudentsTable;
