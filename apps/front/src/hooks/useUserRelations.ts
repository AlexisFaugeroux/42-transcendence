import { useFollowers } from './useFollowers';
import { useFollowing } from './useFollowing';

export function useUserRelations() {
  const { data: following, isLoading: isLoadingFollowings } = useFollowing();
  const { data: followers, isLoading: isLoadingFollowers } = useFollowers();

  const relations = [...(followers ?? []), ...(following ?? [])];

  const users = [...new Map(relations.map((user) => [user.id, user])).values()];

  return { users, isLoading: isLoadingFollowers || isLoadingFollowings };
}
