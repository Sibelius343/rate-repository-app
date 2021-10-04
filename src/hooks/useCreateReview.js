import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async (review) => {
    const repoID = await mutate({ variables: { ...review, rating: Number(review.rating) }});
    return repoID.data.createReview;
  };

  return [createReview, result];
};

export default useCreateReview;