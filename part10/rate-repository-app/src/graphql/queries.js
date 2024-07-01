import { gql } from '@apollo/client';
import { REPOSITORY_FRAGMENT, REVIEW_FRAGMENT } from './fragments';

export const GET_REPOSITORIES = gql`
  query ($first: Int, $after: String) {
    repositories(first: $first, after: $after) {
      edges {
        node {
          ...RepositoryFragment
        }
      }

      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

export const GET_ME = gql`
  query GetCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username

      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFragment
            repository {
              id
              name
            }
          }
        }
      }
    }
  }

  ${REVIEW_FRAGMENT}
`;

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryFragment

      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewFragment
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
  ${REVIEW_FRAGMENT}
`;

export const GET_ORDERED_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

export const GET_REPOSITORIES_BY_NAME = gql`
  query ($searchKeyword: String, $first: Int, $after: String) {
    repositories(searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
          ...RepositoryFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }

  ${REPOSITORY_FRAGMENT}
`;
