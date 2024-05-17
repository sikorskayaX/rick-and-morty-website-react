import axios from 'axios';

// Action Types
const FETCH_LOCATIONS_START = 'FETCH_LOCATIONS_START';
const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
const FETCH_LOCATIONS_FAIL = 'FETCH_LOCATIONS_FAIL';
const SET_PAGE = 'SET_PAGE';
const RESET_LOCATIONS = 'RESET_LOCATIONS';

// Action Creators
export const fetchLocationsStart = () => ({ type: FETCH_LOCATIONS_START });
export const fetchLocationsSuccess = (locations) => ({ type: FETCH_LOCATIONS_SUCCESS, payload: locations });
export const fetchLocationsFail = (error) => ({ type: FETCH_LOCATIONS_FAIL, payload: error });
export const setPage = (page) => ({ type: SET_PAGE, payload: page });
export const resetLocations = () => ({ type: RESET_LOCATIONS });

// Thunk для загрузки всех персонажей
export const fetchLocations = (locationURLs = []) => {
  return async (dispatch) => {
    dispatch(fetchLocationsStart());
    try {
      let allLocations = [];
      if(locationURLs.length > 0) {
        const responses = await Promise.all(locationURLs.map((url) => (url ? axios.get(url) : 'unknown')));
        allLocations = responses.map((response) => response.data);
      } 
      else {
        let nextPage = 'https://rickandmortyapi.com/api/location/';
        while (nextPage) {
          const response = await axios.get(nextPage);
          allLocations = allLocations.concat(response.data.results);
          nextPage = response.data.info.next;
        }
      }
      dispatch(fetchLocationsSuccess(allLocations));
    } catch (error) {
      dispatch(fetchLocationsFail(error.message));
    }
  };
};


// Initial State
const initialState = {
  locations: [],
  loading: false,
  error: null,
  page: 1,
};

// Reducer
const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS_START:
      return { ...state, loading: true, error: null };
    case FETCH_LOCATIONS_SUCCESS:
      return { ...state, loading: false, locations: action.payload };
    case FETCH_LOCATIONS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    case RESET_LOCATIONS:
        return {...state, locations: [], loading: false, error: null,};
    default:
      return state;
  }
};

export default locationsReducer;