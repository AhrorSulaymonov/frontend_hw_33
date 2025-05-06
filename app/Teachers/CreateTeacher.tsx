import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TeacherCreateWrapper } from "./Teachers.styles";
import { Button, Input, Select } from "@/components";
import {
  createTeacherMutation,
  updateTeacherMutation,
  useClasses,
  useOneTeacher,
} from "@/hooks";
import { getOptionFromDataAdapter } from "@/utils";

export interface Teacher {
  id: number | string;
  firstName: string;
  lastName: string;
  birthDate: string;
  classes: number[];
}

const CreateUpdateTeacher = () => {
  const router = useRouter();
  const { id } = router.query;

  const isEditMode = !!id;

  const [teacherValues, setTeacherValues] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    classes: [] as number[],
  });

  const { data: teacher, isLoading: isTeacherLoading } = useOneTeacher({
    id: id as string,
  });
  const { data: classes = [], isLoading: isClassesLoading } = useClasses();

  useEffect(() => {
    if (teacher && isEditMode) {
      setTeacherValues({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        birthDate: teacher.birthDate,
        classes: teacher.classes || [], // Ensure array
      });
    }
  }, [teacher, isEditMode]);

  useEffect(() => {
    if (
      classes.length > 0 &&
      teacherValues.classes.length === 0 &&
      !isEditMode
    ) {
      setTeacherValues((prev) => ({
        ...prev,
        classes: [Number(classes[0].id)], // Default to first class as number
      }));
    }
  }, [classes]);

  const teacherMutation = createTeacherMutation({
    onSuccess: () => {
      router.push("/teachers");
    },
    onError: (err) => {
      alert("O'qituvchi yaratishda xatolik!");
      console.error(err);
    },
  });

  const teacherUpdateMutation = updateTeacherMutation({
    onSuccess: () => {
      router.push("/teachers");
    },
    onError: (err) => {
      alert("O'qituvchi yangilashda xatolik!");
      console.error(err);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("handleChange:", name, value); // Debugging
    setTeacherValues((prev) => ({
      ...prev,
      [name]: name === "classes" ? [Number(value)] : value, // Single select for simplicity
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !teacherValues.firstName ||
      !teacherValues.lastName ||
      !teacherValues.birthDate ||
      teacherValues.classes.length === 0
    ) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const newTeacher: Teacher = {
      id: isEditMode ? (id as string) : String(Date.now()),
      firstName: teacherValues.firstName,
      lastName: teacherValues.lastName,
      birthDate: teacherValues.birthDate,
      classes: teacherValues.classes, // Array of numbers
    };

    console.log("newTeacher", newTeacher);

    isEditMode
      ? teacherUpdateMutation.mutate(newTeacher)
      : teacherMutation.mutate(newTeacher);
  };

  if (isTeacherLoading || isClassesLoading) {
    return <div>Ma'lumotlar yuklanmoqda...</div>;
  }

  return (
    <TeacherCreateWrapper>
      <h1>{isEditMode ? "O'qituvchini yangilash" : "O'qituvchi yaratish"}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={teacherValues.firstName}
          name="firstName"
          type="text"
          onChange={handleChange}
          placeholder="Ism"
        />
        <Input
          value={teacherValues.lastName}
          name="lastName"
          type="text"
          onChange={handleChange}
          placeholder="Familiya"
        />
        <Input
          value={teacherValues.birthDate}
          name="birthDate"
          type="date"
          onChange={handleChange}
          placeholder="Tug'ilgan sana"
        />
        <Select
          value={teacherValues.classes[0]?.toString() || ""} // Show first class
          name="classes"
          onChange={handleChange}
          options={getOptionFromDataAdapter(classes, "name")}
        />
        <Button type="submit">Saqlash</Button>
      </form>
    </TeacherCreateWrapper>
  );
};

export default CreateUpdateTeacher;
