import axios from 'axios';

// Action Types
const FETCH_CHARACTERS_START = 'FETCH_CHARACTERS_START';
const FETCH_CHARACTERS_SUCCESS = 'FETCH_CHARACTERS_SUCCESS';
const FETCH_CHARACTERS_FAIL = 'FETCH_CHARACTERS_FAIL';
const SET_PAGE = 'SET_PAGE';

// Action Creators
export const fetchCharactersStart = () => ({ type: FETCH_CHARACTERS_START });
export const fetchCharactersSuccess = (characters) => ({ type: FETCH_CHARACTERS_SUCCESS, payload: characters });
export const fetchCharactersFail = (error) => ({ type: FETCH_CHARACTERS_FAIL, payload: error });
export const setPage = (page) => ({ type: SET_PAGE, payload: page });

// Thunk для загрузки всех персонажей
export const fetchCharacters = (characterURLs = []) => {
  return async (dispatch) => {
    dispatch(fetchCharactersStart());
    try {
      let allCharacters = [];
      if (characterURLs.length > 0) {
        const responses = await Promise.all(characterURLs.map((url) => axios.get(url)));
        allCharacters = responses.map((response) => response.data);
      } else {
        let nextPage = 'https://rickandmortyapi.com/api/character/';
        while (nextPage) {
          const response = await axios.get(nextPage);
          allCharacters = allCharacters.concat(response.data.results);
          nextPage = response.data.info.next;
        }
      }
      dispatch(fetchCharactersSuccess(allCharacters));
    } catch (error) {
      dispatch(fetchCharactersFail(error.message));
    }
  };
};


// Initial State
const initialState = {
  characters: [],
  loading: false,
  error: null,
  page: 1,
};

// Reducer
const charactersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHARACTERS_START:
      return { ...state, loading: true, error: null };
    case FETCH_CHARACTERS_SUCCESS:
      return { ...state, loading: false, characters: action.payload };
    case FETCH_CHARACTERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export default charactersReducer;