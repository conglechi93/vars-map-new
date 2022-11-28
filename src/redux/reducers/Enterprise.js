import {
  GET_ENTERPRISE_INFO_SUCCESS,
  GET_ENTERPRISE_INFO_DETAIL_SUCCESS,
  UPDATE_ENTERPRISE_INFO_SUCCESS,
  GET_ENROLL_ENTERPRISE_MEMBER_SUCCESS,
  GET_ENROLL_ENTERPRISE_MEMBER_FAIL,
  ENROLL_ENTERPRISE_MEMBER_FAIL,
  ENROLL_ENTERPRISE_MEMBER_SUCCESS,
  CLEAN_STATE,
  ENROLL_ENTERPRISE_MEMBER_UPGRADE_SUCCESS,
  BACK_TO_SIGN_UP_ENTERPRISE_MEMBER,
  RESET_ENTERPRISE,
  UPDATE_AVATAR_ENTERPRISE_SUCCESS
} from 'shared/constants/ActionTypes';

const initialState = {
  isRegisterEnterpriserMember: null,
  enrollEnterprise: null,
  enterpriseInfo: null,
  isRegisterEnterprise: null,
  enterpriseInfoDetail: null,
  enterpriseInfoAvailable: null,
  isEnrollEnterpriseMember: null,
  avatarEnterprise: null
};

const enterpriseReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AVATAR_ENTERPRISE_SUCCESS :
      return {
        ...state,
        avatarEnterprise: action.payload.avatarEnterprise,
      };  
    case RESET_ENTERPRISE:
    return {
      ...state,
      enterpriseInfo: null,
      isRegisterEnterpriserMember: null,
      enrollEnterprise: null,
      isRegisterEnterprise: null,
      enterpriseInfoDetail: null,
      enterpriseInfoAvailable: null,
      isEnrollEnterpriseMember: null
    };
    case BACK_TO_SIGN_UP_ENTERPRISE_MEMBER:
    return {
      ...state,
      isRegisterEnterpriserMember: 1,
    };
    case ENROLL_ENTERPRISE_MEMBER_UPGRADE_SUCCESS: 
    return {
      ...state,
      enrollEnterprise: action.payload.enrollEnterprise,
      isRegisterEnterpriserMember: null,
    };
    case UPDATE_ENTERPRISE_INFO_SUCCESS: 
    return {
      ...state,
      enterpriseInfo: action.payload.enterpriseInfo,
      isRegisterEnterprise: null,
    };
    case GET_ENTERPRISE_INFO_DETAIL_SUCCESS:
    return {
      ...state,
      enterpriseInfoDetail: action.payload.enterpriseInfoDetail,
      enterpriseInfoAvailable: true,
    };
    case GET_ENTERPRISE_INFO_SUCCESS: 
    return {
      ...state,
      enterpriseInfo: action.payload.enterpriseInfo,
      enterpriseInfoAvailable: action.payload.enterpriseInfoAvailable,
      avatarEnterprise: action.payload.avatarEnterprise,
    };
    case GET_ENROLL_ENTERPRISE_MEMBER_SUCCESS:
    return {
      ...state,
      enrollEnterprise: action.payload.data,
    };  
    case GET_ENROLL_ENTERPRISE_MEMBER_FAIL:
    return {
      ...state,
      enrollEnterprise: null,
    }; 
    case ENROLL_ENTERPRISE_MEMBER_SUCCESS:
    return {
      ...state,
      isEnrollEnterpriseMember: true,
    };  
    case ENROLL_ENTERPRISE_MEMBER_FAIL:
    return {
      ...state,
      isEnrollEnterpriseMember: false,
    };
    case CLEAN_STATE:
      return initialState
    default:
      return state;
  }
};
export default enterpriseReducer;
