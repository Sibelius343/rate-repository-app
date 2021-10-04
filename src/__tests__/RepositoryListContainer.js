import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const expectedValues = [
        {
          id: 'jaredpalmer.formik',
          fullName: 'jaredpalmer/formik',
          description: 'Build forms in React, without the tears',
          language: 'TypeScript',
          forksCount: '1.6k',
          stargazersCount: '21.9k',
          ratingAverage: 88,
          reviewCount: 3
        },
        {
          id: 'async-library.react-async',
          fullName: 'async-library/react-async',
          description: 'Flexible promise-based React data loader',
          language: 'JavaScript',
          forksCount: 69,
          stargazersCount: '1.8k',
          ratingAverage: 72,
          reviewCount: 3,
        }    
      ];
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      const repoNames = getAllByTestId('fullName');
      repoNames.forEach((r, i) => {
        expect(r).toHaveTextContent(expectedValues[i].fullName);
      });
      const repoDescriptions = getAllByTestId('description');
      repoDescriptions.forEach((r, i) => {
        expect(r).toHaveTextContent(expectedValues[i].description);
      });
      const repoLanguages = getAllByTestId('language');
      repoLanguages.forEach((r, i) => {
        expect(r).toHaveTextContent(expectedValues[i].language);
      });
      const repoForks = getAllByTestId('forks');
      repoForks.forEach((r, i) => {
        expect(r).toHaveTextContent(expectedValues[i].forksCount);
      });
      const repoStars = getAllByTestId('stars');
      repoStars.forEach((r, i) => {
        expect(r).toHaveTextContent(expectedValues[i].stargazersCount);
      });
      const repoRatings = getAllByTestId('rating');
      repoRatings.forEach((r, i) => {
        expect(r).toHaveTextContent(expectedValues[i].ratingAverage);
      });
      const repoReviews = getAllByTestId('reviews');
      repoReviews.forEach((r, i) => {
        expect(r).toHaveTextContent(expectedValues[i].reviewCount);
      });
    });
  });
});