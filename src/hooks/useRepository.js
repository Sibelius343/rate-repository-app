import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (vars) => {
  const { data, loading, fetchMore, error, ...result } = useQuery(GET_REPOSITORY, {
    variables: { ...vars },
    onError: () => {
      console.log(error);
    },
    fetchPolicy: 'cache-and-network'
  });

  const fetchMoreHandler = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...vars
      }
    });
  };

  return { data, loading, fetchMore: fetchMoreHandler, ...result };
};

export default useRepository;