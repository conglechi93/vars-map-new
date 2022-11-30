import { DISTRICT_SET_SELECT,WARD_SET_SELECT } from "../../shared/constants/ActionTypes";

const INITIAL_STATE = {
    districtSelect: '',
    wardSelect: '',
};

const districtSelectReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case DISTRICT_SET_SELECT:
          return action.payload.districtSelect;
          case WARD_SET_SELECT:
          return action.payload.wardSelect;
    
        default:
          return state;
      }
};

export default districtSelectReducer