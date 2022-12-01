import { LAYER_SET } from "../../shared/constants/ActionTypes";

const setLayer = (layer) => {
  return {
    type: LAYER_SET,
    payload: { layer },
  }
};

export  const layerAction = {
    setLayer
};