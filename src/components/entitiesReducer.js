import axios from 'axios';

// Action Types
const FETCH_ENTITIES_START = 'FETCH_ENTITIES_START';
const FETCH_ENTITIES_SUCCESS = 'FETCH_ENTITIES_SUCCESS';
const FETCH_ENTITIES_FAIL = 'FETCH_ENTITIES_FAIL';
const SET_PAGE = 'SET_PAGE';

// Action Creators
export const fetchEntitiesStart = () => ({ type: FETCH_ENTITIES_START });
export const fetchEntitiesSuccess = (entities) => ({ type: FETCH_ENTITIES_SUCCESS, payload: entities });
export const fetchEntitiesFail = (error) => ({ type: FETCH_ENTITIES_FAIL, payload: error });
export const setPage = (page) => ({ type: SET_PAGE, payload: page });

// Thunk для загрузки всех персонажей
export const fetchAllEntities = () => {
    return async (dispatch) => {
      dispatch(fetchEntitiesStart());
      try {
        let allEntities = [];
        let nextPage = `https://rickandmortyapi.com/api/character/`;
        while (nextPage) {
          const response = await axios.get(nextPage);
          allEntities = allEntities.concat(response.data.results);
          nextPage = response.data.info.next;
        }
        dispatch(fetchEntitiesSuccess(allEntities));
      } catch (error) {
        dispatch(fetchEntitiesFail(error.message));
      }
    };
  };
  

// Initial State
const initialState = {
  entities: [],
  loading: false,
  error: null,
  page: 1,
};

// Reducer
const entitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ENTITIES_START:
      return { ...state, loading: true, error: null };
    case FETCH_ENTITIES_SUCCESS:
      return { ...state, loading: false, entities: action.payload };
    case FETCH_ENTITIES_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export default entitiesReducer;
