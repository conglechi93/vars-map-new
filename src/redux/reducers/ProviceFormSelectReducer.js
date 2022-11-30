import { CITY_SET_SELECT,DISTRICT_SET_SELECT,WARD_SET_SELECT } from "../../shared/constants/ActionTypes";

const INITIAL_STATE = {
    citySelect: '',
    districtSelect: '',
    wardSelect: '',
};

const proviceSelectReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case CITY_SET_SELECT:
          return action.payload.citySelect;
        case DISTRICT_SET_SELECT:
          return action.payload.districtSelect;
          case WARD_SET_SELECT:
          return action.payload.wardSelect;
    
        default:
          return state;
      }
};

export default proviceSelectReducer