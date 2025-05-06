import { Button, Table } from "@/components";
import React from "react";
import { classTableCols } from "./columns";
import { deleteClassMutation, useClasses } from "@/hooks";
import { ActionsWrapper } from "./CsTable.style";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ClassesTable = () => {
  const { data: users } = useClasses();
  const queryClient = useQueryClient();
  const deleteMutation = deleteClassMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast.success("Class deleted successfully!");
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(`Something went wrong! ${err?.status}`);
    },
  });

  const handleDelete = async (cls: any) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      deleteMutation.mutate(cls.id);
    }
  };

  return (
    <div>
      <Table
        actionsCol={(cls) => (
          <ActionsWrapper>
            <Button onClick={() => handleDelete(cls)}>Delete</Button>
            <Button href={`/classes/edit/${cls.id}`}>Update</Button>
          </ActionsWrapper>
        )}
        columns={classTableCols}
        dataSrc={users}
      />
    </div>
  );
};

export default ClassesTable;
