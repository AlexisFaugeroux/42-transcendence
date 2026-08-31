import { listAllFollowers } from "../api/user";
import { useAuthUser } from "@transcendence/auth";
import { useQuery } from "@tanstack/react-query";

export function useFollowers() {
  const user = useAuthUser();
  const { data, isLoading } = useQuery({
    queryFn: () => listAllFollowers(),
    queryKey: ['followers', user.id],
  });
  return { followers: data ?? null, isLoading };
}