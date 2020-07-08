import React from 'react';
import { getArticleIds } from "../services/hackerNewsApi" ;
import { Article } from "../components/Article";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll"
import { GlobalStyle, ArticlesContainerWrapper } from "../styles/ArticlesContatinerStylese"

export const ArticlesContainer = () => {
  const { count } = useInfiniteScroll();

  return (
    <>
      <GlobalStyle />
      <ArticlesContainerWrapper data-test-id="articles-container">
        <h1>News Articles</h1>
      </ArticlesContainerWrapper>
    </>
  );
};
