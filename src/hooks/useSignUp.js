import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async (userData) => {
    const newUser = await mutate({ variables: { ...userData }});
    return newUser.data.createUser;
  };

  return [signUp, result];
};

export default useSignUp;