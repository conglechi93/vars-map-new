import {
  GET_LIST_CATEGORY_REQUEST,
  GET_LIST_CATEGORY_SUCCESS,
  GET_LIST_CATEGORY_ERROR,
  GET_REGISTER_INFO_CATERGORY_SUCCESS
} from 'shared/constants/ActionTypes';

const initialState = {
  current: [],
  options: {},
  loading: false,
  error: null,
  totalRow: 1,
  detail: null,
  loadingDetail: false,
  errorDetail: null,
  registerInfo: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGISTER_INFO_CATERGORY_SUCCESS:
      return {
        ...state,
        registerInfo: action.payload.registerInfo,
      };

    case GET_LIST_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload.current,
        totalRow: action.payload.totalRow,
        options: action.payload.options,
      };
    case GET_LIST_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    default:
      return state;
  }
};
export default categoryReducer;
