// src/utils/api.js
export const fetchAllShows = async ({ signal } = {}) => {
  const response = await fetch('https://api.tvmaze.com/shows', { signal });
  if (!response.ok) throw new Error('Failed to fetch shows');
  return response.json();
};

export const fetchShowById = async (id, { signal } = {}) => {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`, { signal });
  if (!response.ok) throw new Error('Show not found');
  return response.json();
};