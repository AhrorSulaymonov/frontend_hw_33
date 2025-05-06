import { Student } from "@/types";
import instance from "./instance";
import { toast } from "react-toastify";

export const getStudents = async () => {
  try {
    const res = await instance.get<Student[]>("/students");
    return res.data;
  } catch (e) {
    toast.error("O'quvchilarni yuklashda xatolik!");
    throw e;
  }
};

export const getOneStudent = async (id: string | number) => {
  try {
    const res = await instance.get<Student>(`/students/${id}`);
    return res.data;
  } catch (e) {
    toast.error("O'quvchi ma'lumotlarini yuklashda xatolik!");
    throw e;
  }
};

export const createStudent = async (data: Student) => {
  try {
    const res = await instance.post("/students", data);
    return res.data;
  } catch (e) {
    toast.error("O'quvchi yaratishda xatolik!");
    throw e;
  }
};

export const deleteStudent = async (studentId: number | string) => {
  try {
    const res = await instance.delete(`/students/${studentId}`);
    return res.data;
  } catch (error: any) {
    toast.error("O'quvchini o'chirishda xatolik!");
    throw error;
  }
};

export const updateStudent = async (data: Student) => {
  try {
    const res = await instance.put(`/students/${data.id}`, data);
    return res.data;
  } catch (error) {
    toast.error("O'quvchini yangilashda xatolik!");
    throw error;
  }
};

export const getStudentsByClassId = async (classId: string | number) => {
  try {
    const res = await instance.get<Student[]>(`/students?classId=${+classId}`);
    return res.data;
  } catch (error) {
    toast.error("Sinfdagi o'quvchilarni olishda xatolik!");
    throw error;
  }
};

// Bu funksiya json-server bilan to'g'ridan-to'g'ri ishlamasligi mumkin,
// studentlarni birma-bir o'chirish kerak bo'ladi. ClassesTable da shunday qilingan.
export const deleteStudentsByClassId = async (classId: string | number) => {
  try {
    // Ideal holda backend bunday endpointni qo'llab-quvvatlashi kerak.
    // json-server uchun bu ishlamaydi.
    // StudentsTable.tsx dagi logikaga qarang.
    const students = await getStudentsByClassId(classId);
    if (students && students.length > 0) {
      for (const student of students) {
        await deleteStudent(student.id);
      }
    }
    return { message: "Sinfdagi o'quvchilar o'chirildi" };
  } catch (error: any) {
    toast.error("Sinfdagi o'quvchilarni o'chirishda xatolik!");
    throw error;
  }
};
