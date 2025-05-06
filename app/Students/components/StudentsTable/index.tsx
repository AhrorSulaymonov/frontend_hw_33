import { Button, Table } from "@/components";
import React from "react";
import { studentTableCols } from "./columns";
import { deleteStudentMutation, useStudents } from "@/hooks";
import { ActionsWrapper } from "./StTable.style";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const StudentsTable = () => {
  const { data: users } = useStudents();
  const queryClient = useQueryClient();
  const deleteMutation = deleteStudentMutation({
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      toast.success("user.remote");
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(`Something went wrong ! ${err?.status}`);
    },
  });

  const handleDelete = async (student: any) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteMutation.mutate(student.id);
    }
  };

  return (
    <div>
      <Table
        actionsCol={(student) => {
          return (
            <ActionsWrapper>
              <Button onClick={() => handleDelete(student)}>Delete</Button>
              <Button href={`/students/edit/${student.id}`}>Update</Button>
            </ActionsWrapper>
          );
        }}
        columns={studentTableCols}
        dataSrc={users}
      />
    </div>
  );
};

export default StudentsTable;
