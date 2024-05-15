import axios from 'axios';

// Action Types
const FETCH_EPISODES_START = 'FETCH_EPISODES_START';
const FETCH_EPISODES_SUCCESS = 'FETCH_EPISODES_SUCCESS';
const FETCH_EPISODES_FAIL = 'FETCH_EPISODES_FAIL';
const SET_PAGE = 'SET_PAGE';

// Action Creators
export const fetchEpisodesStart = () => ({ type: FETCH_EPISODES_START });
export const fetchEpisodesSuccess = (episodes) => ({ type: FETCH_EPISODES_SUCCESS, payload: episodes });
export const fetchEpisodesFail = (error) => ({ type: FETCH_EPISODES_FAIL, payload: error });
export const setPage = (page) => ({ type: SET_PAGE, payload: page });

// Thunk для загрузки всех персонажей
export const fetchAllEpisodes = () => {
    return async (dispatch) => {
      dispatch(fetchEpisodesStart());
      try {
        let allEpisodes = [];
        let nextPage = `https://rickandmortyapi.com/api/episode/`;
        while (nextPage) {
          const response = await axios.get(nextPage);
          allEpisodes = allEpisodes.concat(response.data.results);
          nextPage = response.data.info.next;
        }
        dispatch(fetchEpisodesSuccess(allEpisodes));
      } catch (error) {
        dispatch(fetchEpisodesFail(error.message));
      }
    };
  };
  

// Initial State
const initialState = {
  episodes: [],
  loading: false,
  error: null,
  page: 1,
};

// Reducer
const episodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EPISODES_START:
      return { ...state, loading: true, error: null };
    case FETCH_EPISODES_SUCCESS:
      return { ...state, loading: false, episodes: action.payload };
    case FETCH_EPISODES_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export default episodesReducer;