import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TeacherCreateWrapper } from "./Teachers.styles";
import { Button, Input, Select } from "@/components"; // Select ni import qildim
import {
  createTeacherMutation,
  updateTeacherMutation,
  useClasses, // O'qituvchiga sinf biriktirish uchun
  useOneTeacher,
} from "@/hooks";
import { getOptionFromDataAdapter } from "@/utils";
import { toast } from "react-toastify";
import { Teacher as TeacherType } from "@/types";

const CreateUpdateTeacher = () => {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = !!id;

  const [teacherValues, setTeacherValues] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    classes: [] as string[], // Sinf ID larini string massivi sifatida saqlaymiz (Select uchun)
  });

  const { data: teacherData, isLoading: isTeacherLoading } = useOneTeacher(
    id ? { id: id as string } : {}
  );
  const { data: allClasses = [], isLoading: isClassesLoading } = useClasses(); // Barcha sinflar

  useEffect(() => {
    if (teacherData && isEditMode) {
      setTeacherValues({
        firstName: teacherData.firstName,
        lastName: teacherData.lastName,
        birthDate: teacherData.birthDate,
        classes: (teacherData.classes || []).map(String), // Raqamlarni stringga o'tkazamiz
      });
    }
  }, [teacherData, isEditMode]);

  // Yangi o'qituvchi yaratishda default sinf tanlash shart emas,
  // lekin kerak bo'lsa, bu logikani qo'shish mumkin.

  const commonMutationOptions = {
    onSuccess: () => {
      toast.success(
        `O'qituvchi muvaffaqiyatli ${isEditMode ? "yangilandi" : "yaratildi"}!`
      );
      router.push("/teachers");
    },
    onError: (err: any) => {
      toast.error(`Xatolik: ${err?.message || "Noma'lum xatolik"}`);
    },
  };

  const teacherCreateMut = createTeacherMutation(commonMutationOptions);
  const teacherUpdateMut = updateTeacherMutation(commonMutationOptions);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "classes") {
      // Agar select multiple bo'lsa, shunday ishlanadi:
      // const options = (e.target as HTMLSelectElement).options;
      // const selectedClasses: string[] = [];
      // for (let i = 0, l = options.length; i < l; i++) {
      //   if (options[i].selected) {
      //     selectedClasses.push(options[i].value);
      //   }
      // }
      // setTeacherValues((prev) => ({ ...prev, classes: selectedClasses }));

      // Hozircha bitta sinf tanlash (agar kerak bo'lsa)
      setTeacherValues((prev) => ({ ...prev, classes: [value] }));
    } else {
      setTeacherValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !teacherValues.firstName ||
      !teacherValues.lastName ||
      !teacherValues.birthDate
      // teacherValues.classes.length === 0 // Sinf tanlash majburiy bo'lsa
    ) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const newTeacherData: TeacherType = {
      id: isEditMode ? (id as string) : String(Date.now()),
      firstName: teacherValues.firstName,
      lastName: teacherValues.lastName,
      birthDate: teacherValues.birthDate,
      // classes: teacherValues.classes.map(Number), // Backend number massivini kutsa
      classes:
        teacherValues.classes.length > 0
          ? teacherValues.classes.map(Number)
          : [], // Agar sinf tanlanmagan bo'lsa bo'sh massiv
    };

    if (isEditMode) {
      teacherUpdateMut.mutate(newTeacherData);
    } else {
      teacherCreateMut.mutate(newTeacherData);
    }
  };

  if (isClassesLoading || (isEditMode && isTeacherLoading)) {
    return <div>Ma'lumotlar yuklanmoqda...</div>;
  }

  return (
    <TeacherCreateWrapper>
      <h1>
        {isEditMode ? "O'qituvchini yangilash" : "Yangi o'qituvchi qo'shish"}
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={teacherValues.firstName}
          name="firstName"
          type="text"
          onChange={handleChange}
          placeholder="Ism"
          required
        />
        <Input
          value={teacherValues.lastName}
          name="lastName"
          type="text"
          onChange={handleChange}
          placeholder="Familiya"
          required
        />
        <Input
          value={teacherValues.birthDate}
          name="birthDate"
          type="date"
          onChange={handleChange}
          placeholder="Tug'ilgan sana"
          required
        />
        {/* Agar o'qituvchiga sinflar biriktirilishi kerak bo'lsa */}
        <label htmlFor="classes">Biriktirilgan sinf (bitta tanlang):</label>
        <Select
          id="classes"
          name="classes"
          value={teacherValues.classes[0] || ""} // Hozircha bitta sinf
          onChange={handleChange}
          // multiple // Agar bir nechta sinf tanlash kerak bo'lsa
          options={getOptionFromDataAdapter(allClasses, "name", "id")}
        >
          <option value="">Sinf tanlanmagan</option>
        </Select>
        <Button type="submit" title="Saqlash" />
      </form>
    </TeacherCreateWrapper>
  );
};

export default CreateUpdateTeacher;
