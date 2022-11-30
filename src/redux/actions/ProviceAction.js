import {
  CITY_SET,
  DISTRICT_SET,
  WARD_SET,
} from '../../shared/constants/ActionTypes';
import API from 'api/Request';

export const cityAction = () => {
  return (dispatch) => {
    API.get('http://192.168.1.26:8500/vcat/provinces')
      .then((data) => {
        const city = data;
        dispatch({type: CITY_SET, payload: {city}});
      })
      .catch((e) => {
        throw e;
      });
  };
};
export const districtAction = ({codeCity}) => {
  return (dispatch) => {
    API.get(`http://192.168.1.26:8500/vcat/provinces/${codeCity}/districts`)
      .then((data) => {
        const district = data;
        dispatch({type: DISTRICT_SET, payload: {district}});
      })
      .catch((e) => {
        throw e;
      });
  };
};
export const wardAction = () => {
  return (dispatch) => {
    API.get(`http://192.168.1.26:8500/vcat/provinces`)
      .then((data) => {
        const places = data;
        dispatch({type: WARD_SET, payload: {places}});
      })
      .catch((e) => {
        throw e;
      });
  };
};
