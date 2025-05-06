import { getSchool, updateSchool } from "@/api/school";
import { MutationFunctions, School } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSchool() {
  return useQuery<School, Error>({
    queryKey: ["school"],
    queryFn: getSchool,
  });
}

export function updateSchoolMutation({
  onSuccess,
  onError,
}: MutationFunctions) {
  const queryClient = useQueryClient();
  return useMutation<School, Error, School>({
    mutationFn: updateSchool,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["school"] });
      if (onSuccess) onSuccess(data);
    },
    onError,
  });
}
