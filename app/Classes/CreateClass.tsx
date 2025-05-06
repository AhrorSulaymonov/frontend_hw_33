import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ClassCreateWrapper } from "./Classes.styles";
import { Button, Input, Select } from "@/components";
import { createClassMutation, updateClassMutation, useOneClass } from "@/hooks";
import { getOptionFromDataAdapter } from "@/utils";
import { useTeachers } from "../../hooks/useTeachers";

export interface Class {
  id: number | string;
  name: string;
  studentCount: number;
  teacherId: number | string;
}

const CreateUpdateClass = () => {
  const router = useRouter();
  const { id } = router.query;

  const isEditMode = !!id;

  const [classValues, setClassValues] = useState({
    name: "",
    studentCount: 0,
    teacherId: "",
  });

  const { data: classData, isLoading: isClassLoading } = useOneClass({
    id: id as string,
  });
  const { data: teachers = [], isLoading: isTeachersLoading } = useTeachers();

  useEffect(() => {
    if (classData && isEditMode) {
      setClassValues({
        name: classData.name,
        studentCount: classData.studentCount,
        teacherId: String(classData.teacherId), // Convert to string
      });
    }
  }, [classData, isEditMode]);

  useEffect(() => {
    if (teachers.length > 0 && !classValues.teacherId && !isEditMode) {
      setClassValues((prev) => ({
        ...prev,
        teacherId: String(teachers[0].id), // Convert to string
      }));
    }
  }, [teachers]);

  const classMutation = createClassMutation({
    onSuccess: () => {
      router.push("/classes");
    },
    onError: (err) => {
      alert("Sinf yaratishda xatolik!");
      console.error(err);
    },
  });

  const classUpdateMutation = updateClassMutation({
    onSuccess: () => {
      router.push("/classes");
    },
    onError: (err) => {
      alert("Sinf yangilashda xatolik!");
      console.error(err);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("handleChange:", name, value); // Debugging
    setClassValues((prev) => ({
      ...prev,
      [name]: name === "studentCount" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!classValues.teacherId) {
      alert("Iltimos, o'qituvchi tanlang!");
      return;
    }

    const newClass: Class = {
      id: isEditMode ? (id as string) : String(Date.now()),
      name: classValues.name,
      studentCount: classValues.studentCount,
      teacherId: classValues.teacherId, // Backend ga moslashtiring (agar number kerak bo'lsa Number() qo'shing)
    };

    console.log("newClass", newClass);

    isEditMode
      ? classUpdateMutation.mutate(newClass)
      : classMutation.mutate(newClass);
  };

  if (isTeachersLoading || isClassLoading) {
    return <div>Ma'lumotlar yuklanmoqda...</div>;
  }

  return (
    <ClassCreateWrapper>
      <h1>{isEditMode ? "Sinfni yangilash" : "Sinf yaratish"}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={classValues.name}
          name="name"
          type="text"
          onChange={handleChange}
          placeholder="Sinf nomi"
        />
        <Input
          value={classValues.studentCount.toString()}
          name="studentCount"
          type="number"
          onChange={handleChange}
          placeholder="O'quvchilar soni"
        />
        <Select
          value={classValues.teacherId}
          name="teacherId"
          onChange={handleChange}
          options={getOptionFromDataAdapter(teachers, "firstName")}
        />
        <Button type="submit">Saqlash</Button>
      </form>
    </ClassCreateWrapper>
  );
};

export default CreateUpdateClass;
