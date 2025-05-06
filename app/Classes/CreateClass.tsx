import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ClassCreateWrapper } from "./Classes.styles";
import { Button, Input, Select } from "@/components";
import {
  createClassMutation,
  updateClassMutation,
  useOneClass,
  useTeachers,
} from "@/hooks";
import { getOptionFromDataAdapter } from "@/utils";
import { toast } from "react-toastify";
import { Class as ClassType } from "@/types"; // Interfeys nomini o'zgartirdim

const CreateUpdateClass = () => {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = !!id;

  const [classValues, setClassValues] = useState({
    name: "",
    studentCount: 0,
    teacherId: "",
  });

  const { data: classData, isLoading: isClassLoading } = useOneClass(
    id ? { id: id as string } : {}
  );
  const { data: teachers = [], isLoading: isTeachersLoading } = useTeachers();

  useEffect(() => {
    if (classData && isEditMode) {
      setClassValues({
        name: classData.name,
        studentCount: classData.studentCount,
        teacherId: String(classData.teacherId),
      });
    }
  }, [classData, isEditMode]);

  useEffect(() => {
    if (teachers.length > 0 && !classValues.teacherId && !isEditMode && !id) {
      // Faqat yangi yaratishda va id yo'q bo'lsa
      setClassValues((prev) => ({
        ...prev,
        teacherId: String(teachers[0].id),
      }));
    }
  }, [teachers, isEditMode, id, classValues.teacherId]); // classValues.teacherId ni dependencylarga qo'shdim

  const commonMutationOptions = {
    onSuccess: () => {
      toast.success(
        `Sinf muvaffaqiyatli ${isEditMode ? "yangilandi" : "yaratildi"}!`
      );
      router.push("/classes");
    },
    onError: (err: any) => {
      toast.error(`Xatolik: ${err?.message || "Noma'lum xatolik"}`);
    },
  };

  const classCreateMut = createClassMutation(commonMutationOptions);
  const classUpdateMut = updateClassMutation(commonMutationOptions);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setClassValues((prev) => ({
      ...prev,
      [name]:
        name === "studentCount" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !classValues.name ||
      classValues.studentCount < 0 ||
      !classValues.teacherId
    ) {
      toast.error(
        "Iltimos, barcha maydonlarni to'g'ri to'ldiring va o'qituvchi tanlang!"
      );
      return;
    }

    const newClassData: ClassType = {
      // O'zgartirilgan interfeys nomidan foydalandim
      id: isEditMode ? (id as string) : String(Date.now()), // Yangi ID generatsiya qilish
      name: classValues.name,
      studentCount: classValues.studentCount,
      teacherId: classValues.teacherId, // Backend number kutsa, Number(classValues.teacherId)
    };

    if (isEditMode) {
      classUpdateMut.mutate(newClassData);
    } else {
      classCreateMut.mutate(newClassData);
    }
  };

  if (isTeachersLoading || (isEditMode && isClassLoading)) {
    return <div>Ma'lumotlar yuklanmoqda...</div>;
  }

  return (
    <ClassCreateWrapper>
      <h1>{isEditMode ? "Sinfni yangilash" : "Yangi sinf yaratish"}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={classValues.name}
          name="name"
          type="text"
          onChange={handleChange}
          placeholder="Sinf nomi"
          required
        />
        <Input
          value={classValues.studentCount.toString()} // Inputga string berish kerak
          name="studentCount"
          type="number"
          onChange={handleChange}
          placeholder="O'quvchilar soni"
          min="0" // Minimal qiymat
          required
        />
        <Select
          value={classValues.teacherId}
          name="teacherId"
          onChange={handleChange}
          options={getOptionFromDataAdapter(teachers, "firstName", "id")} // valueKey "id"
          required
        >
          <option value="" disabled>
            O'qituvchini tanlang
          </option>{" "}
          {/* Placeholder option */}
        </Select>
        <Button type="submit" title="Saqlash" />
      </form>
    </ClassCreateWrapper>
  );
};

export default CreateUpdateClass;
