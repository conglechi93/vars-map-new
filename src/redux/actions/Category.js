import API from 'api/Request';
import {
  GET_REGISTER_INFO_CATEGORY_API
} from 'shared/constants/ApiUrls';
import { GET_REGISTER_INFO_CATERGORY_SUCCESS } from 'shared/constants/ActionTypes';


export const onGetRegisterInfoCategory = () => {
  return (dispatch) => {
    API.get(GET_REGISTER_INFO_CATEGORY_API)
    .then((data) => {
      const registerInfo = data;
      dispatch({type: GET_REGISTER_INFO_CATERGORY_SUCCESS, payload: {registerInfo}});
    });
  };
};

