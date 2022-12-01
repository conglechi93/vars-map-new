import { DISTRICT_SET} from "../../shared/constants/ActionTypes";

const INITIAL_STATE = {
    district: [],
};

const districtReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DISTRICT_SET:
          return action.payload.district;
        default:
          return state;
      }
};
export default districtReducer
