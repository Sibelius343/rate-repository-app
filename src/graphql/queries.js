import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          reviewCount
          forksCount
          ratingAverage
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query getRepo($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ownerAvatarUrl
      fullName
      description
      language
      stargazersCount
      reviewCount
      forksCount
      ratingAverage
      url
      reviews(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query authorizedUser($includeReviews: Boolean = false, $first: Int, $after: String){
    authorizedUser {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              fullName
              url
            }
          }
        }
      }
    }
  }
`;