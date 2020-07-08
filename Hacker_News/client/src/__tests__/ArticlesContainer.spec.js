import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ArticlesContainer } from '../containers/ArticlesContainer';
import { allArticles, noArticles } from '../fixtures';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ARTICLE_INCREMENT } from '../constants';
import { GET_ALL_ARTICLES } from '../graphql/get-all-articles';

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock('../hooks/useInfiniteScroll.js');

test('renders the <ArticlesContainer /> with an article', async () => {

  const allArticlesMocks = [
    {
      request: {
        query: GET_ALL_ARTICLES,
      },
      result: {
        data: {
          ... allArticles,
        },
      },
    },
  ];

  useInfiniteScroll.mockImplementation( () => ({
    count: ARTICLE_INCREMENT,
  }));

  const { getByText, queryByTestId } = render(
    <MockedProvider mocks={allArticlesMocks} >
      <ArticlesContainer />
    </ MockedProvider>
  );

  await waitForElement(() => [
    expect(getByText("News Articles")).toBeTruthy(),
    expect(getByText("Test Story")).toBeTruthy(),
    expect(queryByTestId("article-author").textContent).toEqual("By: Faye Carter"),
    expect(queryByTestId("article-source").textContent).toEqual("Source: hackernews"),
  ]);
});

test('does not render when there is no article', async () => {

  const noArticlesMocks = [
    {
      request: {
        query: GET_ALL_ARTICLES,
      },
      result: {
        data: {
          ... noArticles,
        },
      },
    },
  ];

  useInfiniteScroll.mockImplementation( () => ({
    count: ARTICLE_INCREMENT,
  }));

  const { queryByText, queryByTestId } = render(
    <MockedProvider mocks={noArticlesMocks} >
      <ArticlesContainer />
    </ MockedProvider>
  );

  await waitForElement(() => [
    expect(queryByText("News Articles")).toBeTruthy(),
    expect(queryByText("Test Story")).toBeFalsy(),
    expect(queryByTestId("article-author")).toBeFalsy(),
    expect(queryByTestId("article-source")).toBeFalsy(),
  ]);
});