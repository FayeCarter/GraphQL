import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import { App } from "../App";
import { storyIds, singularStory } from "../fixtures/index";
import { getStory, getStoryIds } from "../services/hackerNewsApi";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { STORY_INCREMENT } from "../constants";

beforeEach(cleanup); 

jest.mock("../hooks/useInfiniteScroll.js");
jest.mock("../services/hackerNewsApi", () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn(),
}));


test("renders the application", async() => {
  useInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT,
  }));

  getStory.mockImplementation(() => Promise.resolve(singularStory));
  getStoryIds.mockImplementation(() => Promise.resolve(storyIds))

  await act(async() => {
    const { getByText, queryByTestId } = render(<App />);
    await waitForElement(() => [
      expect(getByText("Hacker News Stories")).toBeTruthy(),
      expect(getByText("Test Story")).toBeTruthy(),
      expect(queryByTestId("story-by").textContent).toEqual("By: Faye Carter"),
    ])
  })
})