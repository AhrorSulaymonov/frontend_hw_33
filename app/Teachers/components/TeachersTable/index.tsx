import { Button, Table } from "@/components";
import React from "react";
import { teacherTableCols } from "./columns";
import { deleteTeacherMutation, useTeachers } from "@/hooks";
import { ActionsWrapper } from "./TrTable.style";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const TeachersTable = () => {
  const { data: teachers, isLoading } = useTeachers();
  const queryClient = useQueryClient();
  const deleteMut = deleteTeacherMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
      toast.success("O'qituvchi muvaffaqiyatli o'chirildi!");
    },
    onError: (err: any) => {
      toast.error(
        `O'qituvchini o'chirishda xatolik: ${
          err?.message || "Noma'lum xatolik"
        }`
      );
    },
  });

  const handleDelete = async (teacher: any) => {
    if (
      window.confirm(
        `O'qituvchi ${teacher.firstName} ${teacher.lastName}ni o'chirishga ishonchingiz komilmi?`
      )
    ) {
      deleteMut.mutate(teacher.id);
    }
  };

  return (
    <div>
      <Table
        actionsCol={(teacher) => (
          <ActionsWrapper>
            <Button onClick={() => handleDelete(teacher)}>O'chirish</Button>
            <Button href={`/teachers/edit/${teacher.id}`}>Yangilash</Button>
          </ActionsWrapper>
        )}
        columns={teacherTableCols}
        dataSrc={teachers || []}
        loading={isLoading}
      />
    </div>
  );
};

export default TeachersTable;
