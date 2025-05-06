import { Teacher } from "../types";
import instance from "./instance";
import { toast } from "react-toastify";

export const getTeachers = async () => {
  try {
    const res = await instance.get<Teacher[]>("/teachers");
    return res.data;
  } catch (e) {
    toast.error("O'qituvchilarni yuklashda xatolik!");
    throw e;
  }
};

export const getOneTeacher = async (id: string | number) => {
  try {
    const res = await instance.get<Teacher>(`/teachers/${id}`);
    return res.data;
  } catch (e) {
    toast.error("O'qituvchi ma'lumotlarini yuklashda xatolik!");
    throw e;
  }
};

export const createTeacher = async (data: Teacher) => {
  try {
    const res = await instance.post("/teachers", data);
    return res.data;
  } catch (e) {
    toast.error("O'qituvchi yaratishda xatolik!");
    throw e;
  }
};

export const deleteTeacher = async (teacherId: number | string) => {
  try {
    const res = await instance.delete(`/teachers/${teacherId}`);
    return res.data;
  } catch (error) {
    toast.error("O'qituvchini o'chirishda xatolik!");
    throw error;
  }
};

export const updateTeacher = async (data: Teacher) => {
  try {
    const res = await instance.put(`/teachers/${data.id}`, data);
    return res.data;
  } catch (error) {
    toast.error("O'qituvchini yangilashda xatolik!");
    throw error;
  }
};
