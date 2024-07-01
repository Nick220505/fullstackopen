import { gql } from '@apollo/client';

export const REPOSITORY_FRAGMENT = gql`
  fragment RepositoryFragment on Repository {
    id
    ownerName
    name
    createdAt
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    watchersCount
    forksCount
    openIssuesCount
    url
    ownerAvatarUrl
    description
    language
    userHasReviewed
  }
`;

export const REVIEW_FRAGMENT = gql`
  fragment ReviewFragment on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;
