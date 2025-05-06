import {
  createClass,
  deleteClass,
  getClasses,
  getOneClass,
  updateClass,
} from "@/api/class";
import { MutationFunctions, Class } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useClasses() {
  return useQuery({
    queryFn: getClasses,
    queryKey: ["classes"],
  });
}

export function useOneClass(params: any) {
  return useQuery({
    queryFn: () => getOneClass(params.id),
    queryKey: ["one-class"],
    enabled: !!params?.id,
  });
}

export function deleteClassMutation({ onSuccess, onError }: MutationFunctions) {
  return useMutation({
    mutationFn: (id: string | number) => deleteClass(id),
    onSuccess,
    onError,
  });
}

export function createClassMutation({ onSuccess, onError }: MutationFunctions) {
  return useMutation({
    mutationFn: (data: Class) => createClass(data),
    onSuccess,
    onError,
  });
}

export function updateClassMutation({ onSuccess, onError }: MutationFunctions) {
  return useMutation({
    mutationFn: (data: Class) => updateClass(data),
    onSuccess,
    onError,
  });
}
