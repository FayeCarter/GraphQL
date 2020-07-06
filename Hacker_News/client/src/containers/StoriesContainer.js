import React, { useEffect, useState } from 'react';
import { getStoryIds, getStory } from "../services/hackerNewsApi" ;
import { Story } from "../components/Story";
import { GlobalStyle, StoriesContainerWrapper } from "../styles/StoriesContatinerStyles"

export const StoriesContainer = () => {
  const [storyIds, setStoryIds] = useState([]);

  useEffect(() => {
    getStoryIds().then(data => setStoryIds(data));
  }, []);

  return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper data-test-id="stories-container">
        <h1>Hacker News Stories</h1>
          {storyIds.map( storyId => (
            <Story key={ storyId } storyId={ storyId } />
          ))}
      </StoriesContainerWrapper>
    </>
  );
};
