import {
  INCREASE_LOGIN_ATTEMPT,
  LOGOUT,
  RESET_LOGIN_ATTEMPT,
  SET_LOGIN_REDIRECT_TO,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_SSO_SUCCESS,
  GET_USER_INFO_ERROR,
  WIPE_USER,
  RESET_TEMPT,
  VERIFY_SOCIAL_LOGIN_SUCCESS,
  GO_TO_CONFIRM_PAGE,
  SIGN_IN_SSO_SUCCESS,
  GET_TOKEN_SUCCESS,
  UPDATE_AVATAR_SUCCESS,
  SET_CODE_VERIFIER,
  GET_BALANCE_WALLET_SUCCESS,
  CHECK_PASSWORD_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  GET_ENTERPRISE_INFO_SUCCESS,
  GET_ENTERPRISE_INFO_DETAIL_SUCCESS,
  CHANGE_RELOAD_SSO,
  GET_ENTERPRISE_SUCCESS,
  UPDATE_ENTERPRISE_INFO_SUCCESS,
  UPLOAD_ATTACHMENTS_SUCCESS,
  BACK_TO_SIGN_UP_ENTERPRISE,
  GET_TOKEN_ERROR,
  CLEAN_STATE,
  CHANGE_ACCOUNT,
  CHECK_PASSWORD_FAIL,
  UPDATE_PROFILE_SUCCESSS,
  RELOAD_CONFIRM_PASSWORD
} from 'shared/constants/ActionTypes';

const initialState = {
  isAuthenticated: false,
  phone:null,
  user: null,
  role: null,
  sessionToken: null,
  loginRedirectTo: null,
  loginAttempt: 0,
  loginScreen: -1,
  loading: true,
  profile: null,
  profileSSO: null,
  error: null,
  isEnterprise: null,
  password: null,
  isSignupSuccess: false,
  isAvailable: null,
  authCode: null,
  codeVerifier: null,
  accessToken: null,
  refreshToken: null,
  avatar: null,
  wallet: null,
  confirmPassword: null,
  categories: null,
  enterpriseInfo: null,
  idEnterprise: null,
  isRegisterEnterprise: null,
  enterpriseInfoAvailable: null,
  modeChangeAccount: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ACCOUNT:
    return {
      ...state,
      modeChangeAccount: action.payload.modeChangeAccount,
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
      };
    case BACK_TO_SIGN_UP_ENTERPRISE:
    return {
      ...state,
      isRegisterEnterprise: 1
    };
    case UPLOAD_ATTACHMENTS_SUCCESS:
    return {
      ...state,
    };
    case GET_ENTERPRISE_SUCCESS: 
    return {
      ...state,
      idEnterprise: action.payload.idEnterprise,
      
    };
    case UPDATE_ENTERPRISE_INFO_SUCCESS: 
    return {
      ...state,
      enterpriseInfo: action.payload.enterpriseInfo,
      isRegisterEnterprise: null,
    };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
      }; 
    case RELOAD_CONFIRM_PASSWORD :
    return {
      ...state,
      confirmPassword: false,
    };
    case CHECK_PASSWORD_SUCCESS: 
    return {
      ...state,
      confirmPassword: true,
    };
    case CHECK_PASSWORD_FAIL:
    return {
      ...state,
      confirmPassword: false,
    };
    case GET_BALANCE_WALLET_SUCCESS:
    return {
      ...state,
      wallet: action.payload.wallet,
    };
    case UPDATE_AVATAR_SUCCESS: 
    return {
      ...state,
      avatar: action.payload.avatar,
    };
    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        requireReloadSSO: true,
        error: null,
      }
    case CHANGE_RELOAD_SSO:
      return {
        ...state,
        requireReloadSSO: action.payload.requireReloadSSO,
      }
    case GET_TOKEN_ERROR:
      return {
        ...state,
        authCode: null,
        error: null,
      }
    case SET_CODE_VERIFIER:
      return {
        ...state,
        codeVerifier: action.payload.codeVerifier,
      };
    case SIGN_IN_SSO_SUCCESS:
      return {
        ...state,
        authCode: action.payload.authCode
      };
    case GO_TO_CONFIRM_PAGE:
      return {
        ...state,
        isAvailable: null,
        checkCaptcha: null,
        waitOTPConfirm: false,
      };
    case VERIFY_SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        signUpId: null,
        verifySocialLoginSuccess: true,
        isLoginbyOauth: false,
        isValidateOTP: null,
      }

    case RESET_TEMPT: 
    return {
      ...state,
      isChangedPassword : false,
      isSignupSuccess: false,
      isEnterprise: null,
      password: null,
      otpRequestId: null,
      captchaToken: null,
      isAvailable: null,
      verifySocialLoginSuccess: null
    };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        sessionToken: null,
        phone: null,
        password: null,
        profile: null,
        accessToken: null,
        refreshToken: null,
        authCode: null,
        enterpriseInfo: null
      };
    case SET_LOGIN_REDIRECT_TO:
      return {
        ...state,
        loginRedirectTo: action.payload,
      };
    case RESET_LOGIN_ATTEMPT:
      return {
        ...state,
        loginAttempt: 0,
        phone: null,
        isAvailable: null
      };
    case INCREASE_LOGIN_ATTEMPT:
      return {
        ...state,
        loginAttempt: state.loginAttempt + 1,
        isAvailable: null,
      };
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_PROFILE_SUCCESSS: 
    return {
      ...state,
      isUpdateUserInfo: action.payload.isUpdateUserInfo,
    };
    case GET_USER_INFO_SUCCESS:
    return {
      ...state,
      loading: false,
      isAuthenticated: true,
      error: null,
      profile: action.payload.data,
      avatar: action.payload.data.avatar,
    };
    case GET_USER_INFO_SSO_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
        profileSSO: action.payload.data
      };
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        loading: false,
        profile: null,
        error: action.payload,
      };
    case WIPE_USER:
      return initialState;
    case CLEAN_STATE:
      return initialState
    default:
      return state;
  }
};
export default authReducer;
