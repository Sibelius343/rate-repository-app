import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation signUp($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
      createdAt
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview(
    $repositoryOwner: String!,
    $repositoryName: String!,
    $rating: Int!,
    $text: String
  ) {
    createReview(review: {
      repositoryName: $repositoryName,
      ownerName: $repositoryOwner,
      rating: $rating,
      text: $text
    }) {
      repositoryId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;