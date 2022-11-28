import {
  ENROLL_USER_MEMBER_SUCCESS,
  ENROLL_USER_MEMBER_FAIL,
  GET_ENROLL_USER_MEMBER_SUCCESS,
  GET_ENROLL_USER_MEMBER_FAIL,
  UPLOAD_ATTACHMENTS_SUCCESS,
  CLEAN_STATE,
  ENROLL_USER_MEMBER_UPGRADE_SUCCESS,
  BACK_TO_SIGN_UP_USER_MEMBER,

} from 'shared/constants/ActionTypes';

const initialState = {
  isAuthenticated: false,
  enrollUser: null,
  isRegisterUserMember: null,
  isEnrollUserMember: null,
  error: null,
  loading: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case BACK_TO_SIGN_UP_USER_MEMBER:
    return {
      ...state,
      isRegisterUserMember: 1,
    };

    case ENROLL_USER_MEMBER_UPGRADE_SUCCESS: 
    return {
      ...state,
      enrollUser: action.payload.enrollUser,
      isRegisterUserMember: null,
    };
    case UPLOAD_ATTACHMENTS_SUCCESS:
    return {
      ...state,
    };
    case GET_ENROLL_USER_MEMBER_SUCCESS:
    return {
      ...state,
      enrollUser: action.payload.data,
    };  
    case GET_ENROLL_USER_MEMBER_FAIL:
    return {
      ...state,
      enrollUser: null,
    }; 
    case ENROLL_USER_MEMBER_SUCCESS:
    return {
      ...state,
      isEnrollUserMember: true,
    };  
    case ENROLL_USER_MEMBER_FAIL:
    return {
      ...state,
      isEnrollUserMember: false,
    };
    case CLEAN_STATE:
      return initialState
    default:
      return state;
  }
};
export default userReducer;
