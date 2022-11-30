import {CITY_SET_SELECT,DISTRICT_SET_SELECT,WARD_SET_SELECT} from '../../shared/constants/ActionTypes'

 export const setCityAction = (citySelect) => {
    return {
      type:  CITY_SET_SELECT,
      payload: { citySelect},
    }
  };
  export const setDistrictAction = (districtSelect) => {
      return {
        type:  DISTRICT_SET_SELECT,
        payload: { districtSelect},
      }
    };
    export const setWardAction = (wardSelect) => {
      return {
        type:  WARD_SET_SELECT,
        payload: {wardSelect},
      }
    };
    