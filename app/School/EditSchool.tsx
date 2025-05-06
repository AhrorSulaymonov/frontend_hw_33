import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SchoolEditWrapper } from "./School.styles";
import { Button, Input } from "@/components";
import { useSchool, updateSchoolMutation } from "@/hooks";
import { toast } from "react-toastify";
import { School } from "@/types";

const EditSchool = () => {
  const router = useRouter();
  const { data: schoolData, isLoading: isSchoolLoading, isError } = useSchool();

  const [schoolValues, setSchoolValues] = useState<School>({
    name: "",
    location: "",
    overallStudentCount: 0,
    overallStaffCount: 0,
    overallClassCount: 0,
    about: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (schoolData) {
      setSchoolValues(schoolData);
    }
  }, [schoolData]);

  const schoolUpdateMut = updateSchoolMutation({
    onSuccess: () => {
      toast.success("Maktab ma'lumotlari muvaffaqiyatli yangilandi!");
      // Qayta yuklash yoki boshqa sahifaga o'tish shart emas,
      // chunki bu odatda bitta "sozlamalar" sahifasi bo'ladi.
      // router.push("/school"); // Agar alohida ko'rish sahifasi bo'lsa
    },
    onError: (err: any) => {
      toast.error(
        `Maktab ma'lumotlarini yangilashda xatolik: ${
          err?.message || "Noma'lum xatolik"
        }`
      );
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> // HTMLTextAreaElement ni qo'shdim
  ) => {
    const { name, value } = e.target;
    setSchoolValues((prev) => ({
      ...prev,
      [name]:
        name === "overallStudentCount" ||
        name === "overallStaffCount" ||
        name === "overallClassCount"
          ? value === ""
            ? 0
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !schoolValues.name ||
      !schoolValues.location ||
      schoolValues.overallStudentCount < 0 ||
      schoolValues.overallStaffCount < 0 ||
      schoolValues.overallClassCount < 0 ||
      !schoolValues.phoneNumber
    ) {
      toast.error("Iltimos, barcha majburiy maydonlarni to'g'ri to'ldiring!");
      return;
    }
    schoolUpdateMut.mutate(schoolValues);
  };

  if (isSchoolLoading) {
    return <div>Maktab ma'lumotlari yuklanmoqda...</div>;
  }

  if (isError) {
    return (
      <div>
        Maktab ma'lumotlarini yuklashda xatolik yuz berdi. Sahifani yangilang.
      </div>
    );
  }

  return (
    <SchoolEditWrapper>
      <h1>Maktab ma'lumotlarini tahrirlash</h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={schoolValues.name}
          name="name"
          type="text"
          onChange={handleChange}
          placeholder="Maktab nomi"
          required
        />
        <Input
          value={schoolValues.location}
          name="location"
          type="text"
          onChange={handleChange}
          placeholder="Joylashuvi"
          required
        />
        {/* "about" uchun textarea ishlatish mumkin */}
        <label htmlFor="about">Maktab haqida:</label>
        <textarea
          id="about"
          value={schoolValues.about}
          name="about"
          onChange={handleChange}
          placeholder="Maktab haqida qisqacha ma'lumot"
          rows={4}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "12px",
            border: "1px solid #f0f0f0",
            outlineColor: "#bc8e5b",
            boxShadow: "0 0 5px rgba(0,0,0,0.05)",
          }}
        />
        <Input
          value={schoolValues.phoneNumber}
          name="phoneNumber"
          type="text" // Yoki "tel"
          onChange={handleChange}
          placeholder="Telefon raqami (+998xxxxxxxxx)"
          required
        />
        <Input
          value={schoolValues.overallStudentCount.toString()}
          name="overallStudentCount"
          type="number"
          onChange={handleChange}
          placeholder="Umumiy o'quvchilar soni"
          min="0"
          required
        />
        <Input
          value={schoolValues.overallStaffCount.toString()}
          name="overallStaffCount"
          type="number"
          onChange={handleChange}
          placeholder="Umumiy xodimlar soni"
          min="0"
          required
        />
        <Input
          value={schoolValues.overallClassCount.toString()}
          name="overallClassCount"
          type="number"
          onChange={handleChange}
          placeholder="Umumiy sinflar soni"
          min="0"
          required
        />
        <Button type="submit" title="Saqlash" />
      </form>
    </SchoolEditWrapper>
  );
};

export default EditSchool;
