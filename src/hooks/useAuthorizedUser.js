import { useQuery } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (vars) => {
  const { data, loading, fetchMore, ...result } = useQuery(AUTHORIZED_USER, {
    variables: { ...vars }
  });

  console.log('user data', data);

  const handleFetchMore = () => {
    console.log('fetching more reviews');
    console.log('should be true', vars.includeReviews);
    const canFetchMore = !loading && vars?.includeReviews && data?.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        includeReviews: true,
        ...vars
      }
    });
  };

  return { user: data?.authorizedUser, loading, fetchMore: handleFetchMore, ...result};
};

export default useAuthorizedUser;