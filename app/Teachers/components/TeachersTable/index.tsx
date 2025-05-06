import { Button, Table } from "@/components";
import React from "react";
import { teacherTableCols } from "./columns";
import { deleteTeacherMutation, useTeachers } from "@/hooks";
import { ActionsWrapper } from "./TrTable.style";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const TeachersTable = () => {
  const { data: teachers } = useTeachers();
  const queryClient = useQueryClient();
  const deleteMutation = deleteTeacherMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
      toast.success("O'qituvchi muvaffaqiyatli o'chirildi!");
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(`Xatolik yuz berdi! ${err?.status}`);
    },
  });

  const handleDelete = async (teacher: any) => {
    if (window.confirm("Bu o'qituvchini o'chirishga ishonchingiz komilmi?")) {
      deleteMutation.mutate(teacher.id);
    }
  };

  return (
    <div>
      <Table
        actionsCol={(teacher) => {
          return (
            <ActionsWrapper>
              <Button onClick={() => handleDelete(teacher)}>O'chirish</Button>
              <Button href={`/teachers/edit/${teacher.id}`}>Yangilash</Button>
            </ActionsWrapper>
          );
        }}
        columns={teacherTableCols}
        dataSrc={teachers}
      />
    </div>
  );
};

export default TeachersTable;
