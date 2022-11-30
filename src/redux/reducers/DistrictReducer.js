import { DISTRICT_SET} from "../../shared/constants/ActionTypes";

const INITIAL_STATE = {
    district: [],
};

const districtReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DISTRICT_SET:
            console.log("🚀 ~ file: DistrictReducer.js ~ line 11 ~ districtReducer ~ action.payload.district", action.payload.district)
          return action.payload.district;
        default:
          return state;
      }
};
export default districtReducer
