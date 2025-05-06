import { School } from "../types";
import instance from "./instance";
import { toast } from "react-toastify";

export const getSchool = async () => {
  try {
    const res = await instance.get<School>("/school"); // db.json dagi 'school' obyektiga mos
    return res.data;
  } catch (e) {
    toast.error("Maktab ma'lumotlarini yuklashda xatolik!");
    throw e;
  }
};

export const updateSchool = async (data: School) => {
  try {
    // json-server da butun obyektni PUT qilish kerak odatda
    // agar faqat bitta school obyekti bo'lsa, ID shart emas.
    const res = await instance.put(`/school`, data);
    return res.data;
  } catch (error) {
    toast.error("Maktab ma'lumotlarini yangilashda xatolik!");
    throw error;
  }
};
