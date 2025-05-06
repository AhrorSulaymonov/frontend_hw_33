import { Class } from "../types";
import instance from "./instance";
import { toast } from "react-toastify";

export const getClasses = async () => {
  try {
    const res = await instance.get<Class[]>("/classes");
    return res.data;
  } catch (e) {
    toast.error("Sinflarni yuklashda xatolik!");
    throw e;
  }
};

export const getOneClass = async (id: string | number) => {
  try {
    const res = await instance.get<Class>(`/classes/${id}`);
    return res.data;
  } catch (e) {
    toast.error("Sinf ma'lumotlarini yuklashda xatolik!");
    throw e;
  }
};

export const createClass = async (data: Class) => {
  try {
    const res = await instance.post("/classes", data);
    return res.data;
  } catch (e) {
    toast.error("Sinf yaratishda xatolik!");
    throw e;
  }
};

export const deleteClass = async (classId: number | string) => {
  try {
    const res = await instance.delete(`/classes/${classId}`);
    return res.data;
  } catch (error) {
    toast.error("Sinfni o'chirishda xatolik!");
    throw error;
  }
};

export const updateClass = async (data: Class) => {
  try {
    const res = await instance.put(`/classes/${data.id}`, data);
    return res.data;
  } catch (error) {
    toast.error("Sinfni yangilashda xatolik!");
    throw error;
  }
};
