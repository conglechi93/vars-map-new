import {CITY_SET} from '../../shared/constants/ActionTypes';

const INITIAL_STATE = {
  city: [],
};

const proviceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CITY_SET:
      return action.payload.city;

    default:
      return state;
  }
};
export default proviceReducer;
