import { Teacher } from "../types";
import instance from "./instance";

export const getTeachers = async () => {
  try {
    const res = await instance.get<Teacher[]>("/teachers");
    return res.data;
  } catch (e) {
    alert("Failed to fetch Teachers!");
  }
};

export const getOneTeacher = async (id: string | number) => {
  try {
    const res = await instance.get<Teacher>(`/teachers/${id}`);
    return res.data;
  } catch (e) {
    alert("Failed to fetch teacher!");
  }
};

export const createTeacher = async (data: Teacher) => {
  try {
    const res = await instance.post("/teachers", data);
    return res.data;
  } catch (e) {
    alert("Failed to post teacher data!");
  }
};

export const deleteTeacher = async (teacherId: number | string) => {
  try {
    const res = await instance.delete(`/teachers/${teacherId}`);
    return res.data;
  } catch (error) {
    alert("Failed to delete teacher!");
  }
};

export const updateTeacher = async (data: Teacher) => {
  try {
    const res = await instance.put(`/teachers/${data.id}`, data);
    return res.data;
  } catch (error) {
    alert("Failed to update teacher!");
  }
};
