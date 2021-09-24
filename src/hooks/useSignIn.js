import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    const data = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(data.data.authorize.accessToken);
    client.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;