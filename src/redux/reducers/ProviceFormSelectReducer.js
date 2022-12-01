import { CITY_SET_SELECT } from "../../shared/constants/ActionTypes";

const INITIAL_STATE = {
    citySelect: '',
};

const proviceSelectReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case CITY_SET_SELECT:
          return action.payload.citySelect;
    
        default:
          return state;
      }
};

export default proviceSelectReducer