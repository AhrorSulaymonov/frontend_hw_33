import {
  createTeacher,
  deleteTeacher,
  getTeachers,
  getOneTeacher,
  updateTeacher,
} from "@/api/teacher"; // Adjust the path to your Teacher API functions
import { MutationFunctions, Teacher } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useTeachers() {
  return useQuery({
    queryFn: getTeachers,
    queryKey: ["teachers"],
  });
}

export function useOneTeacher(params: any) {
  return useQuery({
    queryFn: () => getOneTeacher(params.id),
    queryKey: ["one-teacher"],
    enabled: !!params?.id,
  });
}

export function deleteTeacherMutation({
  onSuccess,
  onError,
}: MutationFunctions) {
  return useMutation({
    mutationFn: (id: string | number) => deleteTeacher(id),
    onSuccess,
    onError,
  });
}

export function createTeacherMutation({
  onSuccess,
  onError,
}: MutationFunctions) {
  return useMutation({
    mutationFn: (data: Teacher) => createTeacher(data),
    onSuccess,
    onError,
  });
}

export function updateTeacherMutation({
  onSuccess,
  onError,
}: MutationFunctions) {
  return useMutation({
    mutationFn: (data: Teacher) => updateTeacher(data),
    onSuccess,
    onError,
  });
}
