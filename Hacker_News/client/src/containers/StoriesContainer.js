import React, { useEffect, useState } from 'react';
import { getStoryIds } from "../services/hackerNewsApi" ;
import { Story } from "../components/Story";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll"
import { GlobalStyle, StoriesContainerWrapper } from "../styles/StoriesContatinerStyles"

export const StoriesContainer = () => {
  const [storyIds, setStoryIds] = useState([]);
  const { count } = useInfiniteScroll();
  
  useEffect(() => {
    getStoryIds().then(data => setStoryIds(data));
  }, []);

  return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper data-test-id="stories-container">
        <h1>Hacker News Stories</h1>
          {storyIds.slice(0, count).map( storyId => (
            <Story key={ storyId } storyId={ storyId } />
          ))}
      </StoriesContainerWrapper>
    </>
  );
};
