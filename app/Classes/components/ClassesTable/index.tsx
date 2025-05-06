import { Button, Table } from "@/components";
import React from "react";
import { classTableCols } from "./columns";
import {
  deleteClassMutation,
  useClasses,
  deleteStudentMutation,
} from "@/hooks";
import { getStudentsByClassId } from "@/api"; // API dan to'g'ridan-to'g'ri import
import { ActionsWrapper } from "./CsTable.style";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Student } from "@/types";

const ClassesTable = () => {
  const { data: classes, isLoading: isLoadingClasses } = useClasses();
  const queryClient = useQueryClient();

  const deleteClassMut = deleteClassMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      queryClient.invalidateQueries({ queryKey: ["students"] }); // O'quvchilar ham yangilanishi mumkin
      toast.success("Sinf muvaffaqiyatli o'chirildi!");
    },
    onError: (err: any) => {
      toast.error(
        `Sinfni o'chirishda xatolik: ${err?.message || "Noma'lum xatolik"}`
      );
    },
  });

  const deleteStudentsMut = deleteStudentMutation({
    onSuccess: () => {
      // Bu yerda alohida toast kerak emas, umumiy jarayon oxirida beriladi
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (err: any) => {
      toast.error(
        `O'quvchini o'chirishda xatolik: ${err?.message || "Noma'lum xatolik"}`
      );
    },
  });

  const handleDelete = async (cls: any) => {
    if (
      window.confirm(
        `"${cls.name}" sinfini va unga biriktirilgan BARCHA o'quvchilarni o'chirishga ishonchingiz komilmi?`
      )
    ) {
      try {
        // 1. Sinfga tegishli o'quvchilarni olish
        const studentsInClass: Student[] | undefined =
          await getStudentsByClassId(cls.id);

        // 2. Agar o'quvchilar mavjud bo'lsa, ularni o'chirish
        if (studentsInClass && studentsInClass.length > 0) {
          await Promise.all(
            studentsInClass.map((student: Student) =>
              deleteStudentsMut.mutateAsync(student.id)
            )
          );
          toast.info(`${studentsInClass.length} ta o'quvchi o'chirildi.`);
        } else {
          // toast.info("Bu sinfda o'quvchilar mavjud emas.");
        }

        // 3. Keyin sinfni o'chirish
        await deleteClassMut.mutateAsync(cls.id);
      } catch (error: any) {
        toast.error(
          `O'chirish jarayonida xatolik: ${error.message || "Noma'lum xatolik"}`
        );
      }
    }
  };

  return (
    <div>
      <Table
        actionsCol={(cls) => (
          <ActionsWrapper>
            <Button onClick={() => handleDelete(cls)}>O'chirish</Button>
            <Button href={`/classes/edit/${cls.id}`}>Yangilash</Button>
          </ActionsWrapper>
        )}
        columns={classTableCols}
        dataSrc={classes || []}
        isClass={true}
        loading={isLoadingClasses}
      />
    </div>
  );
};

export default ClassesTable;
