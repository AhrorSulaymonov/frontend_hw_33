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

  // URL'dan classId ni tekshirish
  const { classId } = router.query;
  console.log("classId:", classId); // Debug uchun log

  // classId mavjud bo'lsa useStudentsByClassId, aks holda useStudents
  const {
    data: students,
    isLoading,
    isError,
    error,
  } = classId ? useStudentsByClassId(classId as string) : useStudents();

  console.log("Students data:", students); // Ma'lumotlarni tekshirish
  console.log("Loading state:", isLoading); // Loading holatini tekshirish
  console.log("Error state:", isError, error); // Xatolarni tekshirish

  const deleteMutation = deleteStudentMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("O'quvchi muvaffaqiyatli o'chirildi!");
    },
    onError: (err: any) => {
      console.error("O'chirishda xatolik:", err);
      toast.error(
        `O'quvchini o'chirishda xatolik: ${err?.message || "Noma'lum xatolik"}`
      );
    },
  });

  const handleDelete = (student: any) => {
    if (
      window.confirm(`O'quvchi ${student.name} ni o'chirishni xohlaysizmi?`)
    ) {
      deleteMutation.mutate(student.id);
    }
  };

  if (isLoading)
    return (
      <p>O'quvchilar yuklanmoqda... (Agar uzoq tursa, konsolni tekshiring)</p>
    );
  if (isError)
    return (
      <p>
        O'quvchilarni yuklashda xatolik yuz berdi. Xatolik: {error?.message}
      </p>
    );

  return (
    <Table
      dataSrc={students}
      columns={studentTableCols}
      actionsCol={(student) => (
        <ActionsWrapper>
          <Button onClick={() => handleDelete(student)}>O'chirish</Button>
          <Button href={`/students/edit/${student.id}`}>Yangilash</Button>
        </ActionsWrapper>
      )}
    />
  );
};

export default StudentsTable;
