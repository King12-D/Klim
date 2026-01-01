//Configure api
export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  },
};

//Discover popular movies configuration
export const fetchMovies = async ({ query }: { query: string }) => {
  const enpoint = query
    ? //Api endpoint for fetching a movie based on the query recieved
      `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : //Api endpoint for discovering popular movies
      `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  //Await response from TMDB
  const response = await fetch(enpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  //Check if response is ok
  if (!response.ok) {
    //@ts-ignore
    throw new Error("Faild to fetch movie", response.statusText);
  }

  const data = await response.json();

  return data.results;
};
