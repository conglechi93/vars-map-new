import { WARD_SET } from "../../shared/constants/ActionTypes";

const INITIAL_STATE = {
    ward: [],
};

const wardReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

          case WARD_SET:
          return action.payload.ward;
    
        default:
          return state;
      }
};
export default wardReducer

