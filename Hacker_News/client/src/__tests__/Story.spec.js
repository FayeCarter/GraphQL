import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import { Story } from "../components/Story";
import { singularStory } from "../fixtures/index";
import { getStory } from "../services/hackerNewsApi";

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
}); 

jest.mock("../services/hackerNewsApi", () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn(),
}));

test("renders the Story component with content", async() => {
  getStory.mockImplementation(() => Promise.resolve(singularStory));

  await act(async() => {
    const { getByText, queryByTestId, getByTestId } = render(<Story storyId="1" />);
    await waitForElement(() => [
      expect(getByTestId("story")).toBeTruthy(),
      expect(getByText("Test Story")).toBeTruthy(),
      expect(queryByTestId("story-by").textContent).toEqual("By: Faye Carter"),
    ])
  })
})