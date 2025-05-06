import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { StudentCreateWrapper } from "./Students.styles";
import { Button, Input, Select } from "@/components";
import {
  createStudentMutation,
  updateStudentMutation,
  useClasses,
  useOneStudent,
} from "@/hooks";
import { getOptionFromDataAdapter } from "@/utils";

export interface Student {
  id: number | string;
  firstName: string;
  lastName: string;
  birthDate: string;
  classId: number | string;
}

const CreateUpdateStudent = () => {
  const router = useRouter();
  const { id } = router.query;

  const isEditMode = !!id;

  const [studentValues, setStudentValues] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    classId: "",
  });

  const { data: student, isLoading: isStudentLoading } = useOneStudent({
    id: id as string,
  });
  const { data: classes = [], isLoading: isClassesLoading } = useClasses();

  useEffect(() => {
    if (student && isEditMode) {
      setStudentValues({
        firstName: student.firstName,
        lastName: student.lastName,
        birthDate: student.birthDate,
        classId: String(student.classId), // Convert to string for consistency
      });
    }
  }, [student, isEditMode]);

  useEffect(() => {
    if (classes.length > 0 && !studentValues.classId && !isEditMode) {
      setStudentValues((prev) => ({
        ...prev,
        classId: String(classes[0].id), // Default to first class
      }));
    }
  }, [classes]);

  const studentMutation = createStudentMutation({
    onSuccess: () => {
      router.push("/students");
    },
    onError: (err) => {
      alert("O'quvchi yaratishda xatolik!");
      console.error(err);
    },
  });

  const studentUpdateMutation = updateStudentMutation({
    onSuccess: () => {
      router.push("/students");
    },
    onError: (err) => {
      alert("O'quvchi yangilashda xatolik!");
      console.error(err);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("handleChange:", name, value); // Debugging
    setStudentValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !studentValues.firstName ||
      !studentValues.lastName ||
      !studentValues.birthDate ||
      !studentValues.classId
    ) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const newStudent: Student = {
      id: isEditMode ? (id as string) : String(Date.now()),
      firstName: studentValues.firstName,
      lastName: studentValues.lastName,
      birthDate: studentValues.birthDate,
      classId: studentValues.classId, // Backend number talab qilsa Number() qo'shing
    };

    console.log("newStudent", newStudent);

    isEditMode
      ? studentUpdateMutation.mutate(newStudent)
      : studentMutation.mutate(newStudent);
  };

  if (isStudentLoading || isClassesLoading) {
    return <div>Ma'lumotlar yuklanmoqda...</div>;
  }

  return (
    <StudentCreateWrapper>
      <h1>{isEditMode ? "O'quvchini yangilash" : "O'quvchi yaratish"}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={studentValues.firstName}
          name="firstName"
          type="text"
          onChange={handleChange}
          placeholder="Ism"
        />
        <Input
          value={studentValues.lastName}
          name="lastName"
          type="text"
          onChange={handleChange}
          placeholder="Familiya"
        />
        <Input
          value={studentValues.birthDate}
          name="birthDate"
          type="date"
          onChange={handleChange}
          placeholder="Tug'ilgan sana"
        />
        <Select
          value={studentValues.classId}
          name="classId"
          onChange={handleChange}
          options={getOptionFromDataAdapter(classes, "name")}
        />
        <Button type="submit">Saqlash</Button>
      </form>
    </StudentCreateWrapper>
  );
};

export default CreateUpdateStudent;
