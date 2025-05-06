import {
  createStudent,
  deleteStudent,
  getOneStudent,
  getStudents,
  getStudentsByClassId,
  updateStudent,
  deleteStudentsByClassId,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationFunctions, Student } from "../../types";

export function useStudents() {
  return useQuery({
    queryFn: getStudents,
    queryKey: ["students"],
  });
}

export function useStudentsByClassId(classId: string | number) {
  return useQuery({
    queryKey: ["students-by-classId", classId],
    queryFn: ({ queryKey }) => getStudentsByClassId(queryKey[1]),
    enabled: !!classId,
  });
}

export function useOneStudent(params: any) {
  return useQuery({
    queryFn: () => getOneStudent(params.id),
    queryKey: ["one-student"],
    enabled: !!params?.id,
  });
}

export function deleteStudentMutation({
  onSuccess,
  onError,
}: MutationFunctions) {
  return useMutation({
    mutationFn: (id: string | number) => deleteStudent(id),
    onSuccess,
    onError,
  });
}

export function createStudentMutation({
  onSuccess,
  onError,
}: MutationFunctions) {
  return useMutation({
    mutationFn: (data: Student) => createStudent(data),
    onSuccess,
    onError,
  });
}

export function updateStudentMutation({
  onSuccess,
  onError,
}: MutationFunctions) {
  return useMutation({
    mutationFn: (data: Student) => updateStudent(data),
    onSuccess,
    onError,
  });
}

export function deleteStudentsByClassIdMutation({
  onSuccess,
  onError,
}: MutationFunctions) {
  return useMutation({
    mutationFn: (classId: string | number) => deleteStudentsByClassId(classId),
    onSuccess,
    onError,
  });
}
