import { useFollowers } from "./useFollowers";
import { useFollowing } from "./useFollowing";

export function useUserRelation() {
  const { following } = useFollowing();
  const { followers } = useFollowers();

  const relations = [
    ...(followers ?? []),
    ...(following ?? []),
  ];

  return [...new Map(
    relations.map((user) => [user.id, user]),
  ).values()];
}