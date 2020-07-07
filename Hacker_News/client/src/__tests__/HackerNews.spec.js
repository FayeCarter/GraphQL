import React from 'react';
import axios from 'axios';
import { getStoryIds, getStory, newStoriesURL, storyURL } from '../services/hackerNewsApi';
import { singularStory, storyIds, emptySingularStory } from '../fixtures/index';

jest.mock("axios");

describe("Hacker news API", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  }); 

  describe("getStory functionality", () => {
    it("requests and gets a story from HackerNews Api", async () => {
      axios.get.mockImplementation(() => 
        Promise.resolve({ data: singularStory }) 
      );

      const entity = await getStory(1);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${storyURL + 1}.json`);
      expect(entity).toEqual(singularStory);
    })

    it("does not retrieve a story from the HackerNews Api without breaking", async () => {
      axios.get.mockImplementation(() => 
        Promise.resolve({ data: emptySingularStory }) 
      );

      const entity = await getStory(1);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${storyURL + 1}.json`);
      expect(entity).toEqual(emptySingularStory);
    });
  });

  describe("getStoryIds functionality", () => {
    it("requests and gets a story idsfrom HackerNews Api", async () => {
      axios.get.mockImplementation(() => 
        Promise.resolve({ data: storyIds }) 
      );

      const entity = await getStoryIds();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(newStoriesURL);
      expect(entity).toEqual(storyIds);
    });
  });
});