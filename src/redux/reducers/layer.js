import { LAYER_SET } from "../../shared/constants/ActionTypes";

const INITIAL_STATE = {
  layer: ["Nền bản đồ Việt Nam"]
};

const layerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LAYER_SET:
        return action.payload.layer;
    default:
      return state;
  }
};

export default layerReducer;