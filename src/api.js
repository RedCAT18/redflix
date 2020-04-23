import axios from 'axios';

const api_key = 'a6561fc2128f8e8ba0ce90c704d86516';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key,
    language: 'en-US',
  },
});

export const moviesApi = {
  nowPlaying: () => api.get('movie/now_playing'),
  upcoming: () => api.get('movie/upcoming'),
  popular: () => api.get('movie/popular'),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  search: (term) =>
    api.get(`search/movie`, {
      params: {
        query: encodeURIComponent(term),
      },
    }),
  getCollection: (id) => api.get(`collection/${id}`),
};

export const tvApi = {
  topRated: () => api.get('tv/top_rated'),
  popular: () => api.get('tv/popular'),
  airingToday: () => api.get('tv/airing_today'),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  search: (term) =>
    api.get(`search/tv`, {
      params: {
        query: encodeURIComponent(term),
      },
    }),
  getSeries: (id, season) => api.get(`tv/${id}/season/${season}`),
};
