import React, { useState, useEffect } from 'react';
import { getStory } from "../services/hackerNewsApi";

export const Story = ({ storyId }) => {

  useEffect(() => {

  }, [])

  return (
    <p>I'm a story { storyId }</p>
  );
};