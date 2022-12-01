import {LAND_PLOT} from '../../shared/constants/ActionTypes';

const INITIAL_STATE = {
  landPlot: [],
};

const landPlotReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LAND_PLOT:
      return action.payload.landPlot;

    default:
      return state;
  }
};
export default landPlotReducer;