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
import { toast } from "react-toastify";
import { Student as StudentType } from "@/types"; // Interfeys nomini o'zgartirdim

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

  const { data: studentData, isLoading: isStudentLoading } = useOneStudent(
    id ? { id: id as string } : {}
  );
  const { data: classes = [], isLoading: isClassesLoading } = useClasses();

  useEffect(() => {
    if (studentData && isEditMode) {
      setStudentValues({
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        birthDate: studentData.birthDate,
        classId: String(studentData.classId),
      });
    }
  }, [studentData, isEditMode]);

  useEffect(() => {
    if (classes.length > 0 && !studentValues.classId && !isEditMode && !id) {
      setStudentValues((prev) => ({
        ...prev,
        classId: String(classes[0].id),
      }));
    }
  }, [classes, isEditMode, id, studentValues.classId]);

  const commonMutationOptions = {
    onSuccess: () => {
      toast.success(
        `O'quvchi muvaffaqiyatli ${isEditMode ? "yangilandi" : "yaratildi"}!`
      );
      router.push("/students");
    },
    onError: (err: any) => {
      toast.error(`Xatolik: ${err?.message || "Noma'lum xatolik"}`);
    },
  };

  const studentCreateMut = createStudentMutation(commonMutationOptions);
  const studentUpdateMut = updateStudentMutation(commonMutationOptions);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
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
      toast.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const newStudentData: StudentType = {
      id: isEditMode ? (id as string) : String(Date.now()),
      firstName: studentValues.firstName,
      lastName: studentValues.lastName,
      birthDate: studentValues.birthDate,
      classId: studentValues.classId, // Backend number kutsa: Number(studentValues.classId)
    };

    if (isEditMode) {
      studentUpdateMut.mutate(newStudentData);
    } else {
      studentCreateMut.mutate(newStudentData);
    }
  };

  if (isClassesLoading || (isEditMode && isStudentLoading)) {
    return <div>Ma'lumotlar yuklanmoqda...</div>;
  }

  return (
    <StudentCreateWrapper>
      <h1>{isEditMode ? "O'quvchini yangilash" : "Yangi o'quvchi qo'shish"}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={studentValues.firstName}
          name="firstName"
          type="text"
          onChange={handleChange}
          placeholder="Ism"
          required
        />
        <Input
          value={studentValues.lastName}
          name="lastName"
          type="text"
          onChange={handleChange}
          placeholder="Familiya"
          required
        />
        <Input
          value={studentValues.birthDate}
          name="birthDate"
          type="date"
          onChange={handleChange}
          placeholder="Tug'ilgan sana"
          required
        />
        <Select
          value={studentValues.classId}
          name="classId"
          onChange={handleChange}
          options={getOptionFromDataAdapter(classes, "name", "id")}
          required
        >
          <option value="" disabled>
            Sinfni tanlang
          </option>
        </Select>
        <Button type="submit" title="Saqlash" />
      </form>
    </StudentCreateWrapper>
  );
};

export default CreateUpdateStudent;
