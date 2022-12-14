// COMMON
export const CLEAN_STATE = 'CLEAN_STATE';
export const SET_RECALCULATE_LAYOUT_SCROLL = 'SET_RECALCULATE_LAYOUT_SCROLL';
export const SUCCESS_RECALCULATE_LAYOUT_SCROLL =
  'SUCCESS_RECALCULATE_LAYOUT_SCROLL';

// API
export const FETCH_START = 'fetch_start';
export const FETCH_SUCCESS = 'fetch_success';
export const FETCH_ERROR = 'fetch_error';
export const SHOW_MESSAGE = 'show_message';
export const HIDE_MESSAGE = 'hide_message';
export const TOGGLE_APP_DRAWER = 'toggle_app_drawer';
export const UPDATING_CONTENT = 'updating_content';

//APP SETTING
export const TOGGLE_NAV_COLLAPSED = 'TOGGLE_NAV_COLLAPSED';
export const SET_INITIAL_PATH = 'SET_INITIAL_PATH';
export const SET_NAVIGATE_AFTER_INTERMEDIA = 'SET_NAVIGATE_AFTER_INTERMEDIA';

// AUTH
export const LOGOUT = 'LOGOUT';
export const SET_LOGIN_REDIRECT_TO = 'SET_LOGIN_REDIRECT_TO';
export const INCREASE_LOGIN_ATTEMPT = 'INCREASE_LOGIN_ATTEMPT';
export const RESET_LOGIN_ATTEMPT = 'RESET_LOGIN_ATTEMPT';
export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';
export const WIPE_USER = 'WIPE_USER';
export const RESET_TEMPT = 'RESET_TEMPT';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';
export const VERIFY_SOCIAL_LOGIN_SUCCESS = 'VERIFY_SOCIAL_LOGIN_SUCCESS';
export const GO_TO_CONFIRM_PAGE = 'GO_TO_CONFIRM_PAGE';
export const SIGN_IN_SSO_SUCCESS = 'SIGN_IN_SSO_SUCCESS';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
export const UPDATE_AVATAR_SUCCESS = 'UPDATE_AVATAR_SUCCESS';
export const SET_CODE_VERIFIER = 'SET_CODE_VERIFIER';
export const CHANGE_RELOAD_SSO='CHANGE_RELOAD_SSO';
export const RELOAD_CONFIRM_PASSWORD = 'RELOAD_CONFIRM_PASSWORD';

// MEMBER VARS
export const GET_BALANCE_WALLET_SUCCESS = 'GET_BALANCE_WALLET_SUCCESS';
export const CHECK_PASSWORD_SUCCESS = 'CHECK_PASSWORD_SUCCESS';
export const CHECK_PASSWORD_FAIL = 'CHECK_PASSWORD_FAIL';

export const ENROLL_USER_MEMBER_SUCCESS = 'ENROLL_USER_MEMBER_SUCCESS';
export const ENROLL_USER_MEMBER_FAIL = 'ENROLL_USER_MEMBER_FAIL';
export const  GET_ENROLL_USER_MEMBER_FAIL = 'GET_ENROLL_USER_MEMBER_FAIL';
export const  GET_ENROLL_USER_MEMBER_SUCCESS = 'GET_ENROLL_USER_MEMBER_SUCCESS';



// PROFILE
export const GET_PROFILE_DETAIL_REQUEST = 'GET_PROFILE_DETAIL_REQUEST';
export const GET_PROFILE_DETAIL_SUCCESS = 'GET_PROFILE_DETAIL_SUCCESS';
export const GET_PROFILE_DETAIL_ERROR = 'GET_PROFILE_DETAIL_ERROR';
export const UPDATE_PROFILE_DETAIL = 'UPDATE_PROFILE_DETAIL';
export const UPDATE_PROFILE_SUCCESSS = 'UPDATE_PROFILE_SUCCESSS';

// MEMBER CARD
export const GET_MEMBER_CARD_REQUEST = 'GET_MEMBER_CARD_REQUEST';
export const GET_MEMBER_CARD_SUCCESS = 'GET_MEMBER_CARD_SUCCESS';
export const GET_MEMBER_CARD_ERROR = 'GET_MEMBER_CARD_ERROR';
export const UPDATED_MEMBER_CARD = 'UPDATED_MEMBER_CARD';

// GIFT
export const GET_LIST_GIFT_REQUEST = 'GET_LIST_GIFT_REQUEST';
export const GET_LIST_GIFT_SUCCESS = 'GET_LIST_GIFT_SUCCESS';
export const GET_LIST_GIFT_ERROR = 'GET_LIST_GIFT_ERROR';

// CATEGORY
export const GET_REGISTER_INFO_CATERGORY_SUCCESS = 'GET_REGISTER_INFO_CATERGORY_SUCCESS';
export const GET_CATEGORIES_SUCCESS = 'GET_LIST_CATEGORY_SUCCESS';
export const GET_LIST_CATEGORY_REQUEST = 'GET_LIST_CATEGORY_REQUEST';
export const GET_LIST_CATEGORY_SUCCESS = 'GET_LIST_CATEGORY_SUCCESS';
export const GET_LIST_CATEGORY_ERROR = 'GET_LIST_CATEGORY_ERROR';

// VIEW
export const SET_VIEW_HEIGHT = 'SET_VIEW_HEIGHT';

// USER APPLICATION
export const GET_MANAGABLE_APPLICATION_REQUEST =
  'GET_MANAGABLE_APPLICATION_REQUEST';
export const GET_MANAGABLE_APPLICATION_SUCCESS =
  'GET_MANAGABLE_APPLICATION_SUCCESS';
export const GET_MANAGABLE_APPLICATION_ERROR =
  'GET_MANAGABLE_APPLICATION_ERROR';
export const SELECT_APP = 'SELECT_APP';
export const SET_EXCLUSIVE_NAV_ID = 'SET_EXCLUSIVE_NAV_ID';
export const SET_NAV_PARAM = 'SET_NAV_PARAM';

// SSO
export const DISPATCH_SUCESS = 'DISPATCH_SUCESS';
export const DISPATCH_ERROR = 'DISPATCH_ERROR';
export const TOGGLE_SSO_SUCCESS = 'TOGGLE_SSO_SUCCESS';
export const TOGGLE_SSO_ERROR = 'TOGGLE_SSO_ERROR';
export const SSO_AUTH_CODE_REQUEST = 'SSO_AUTH_CODE_REQUEST';
export const SSO_AUTH_CODE_SUCCESS = 'SSO_AUTH_CODE_SUCCESS';
export const SSO_AUTH_CODE_ERROR = 'SSO_AUTH_CODE_ERROR';
export const RESET_SSO = 'RESET_SSO';
export const GET_USER_INFO_SSO_SUCCESS= 'GET_USER_INFO_SSO_SUCCESS';

// TRANSACTION 
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS'
export const GET_TRANSACTION_DETAIL_SUCCESS = 'GET_TRANSACTION_DETAIL_SUCCESS';
export const CREATE_TRANSACTION_FAIL = 'CREATE_TRANSACTION_FAIL';
export const BACK_FROM_TRANSACTION_PAGE = 'BACK_FROM_TRANSACTION_PAGE';

export const GET_SUGGEST_WALLET_SUCCESS = 'GET_SUGGEST_WALLET_SUCCESS';
export const GET_SUGGEST_WALLET_FAIL = 'GET_SUGGEST_WALLET_FAIL';
export const SET_DATA_SUBMIT_TRANSFER_TRANSACTION = 'SET_DATA_SUBMIT_TRANSFER_TRANSACTION';
export const SUBMIT_TRANSFER_TRANSACTION_SUCCESS = 'SUBMIT_TRANSFER_TRANSACTION_SUCCESS';
export const GET_RECENT_TRANSFER_SUCCESS = 'GET_RECENT_TRANSFER_SUCCESS';
export const RESET_SUGGEST_WALLET = 'RESET_SUGGEST_WALLET';
export const RESET_TRANFERS_INFO = 'RESET_TRANFERS_INFO';


// ENTERPRISE

export const GET_ENTERPRISE_INFO_SUCCESS = 'GET_ENTERPRISE_INFO_SUCCESS';
export const GET_ENTERPRISE_INFO_DETAIL_SUCCESS = 'GET_ENTERPRISE_INFO_DETAIL_SUCCESS';

export const GET_ENTERPRISE_SUCCESS = 'GET_ENTERPRISE_SUCCESS';
export const UPDATE_ENTERPRISE_INFO_SUCCESS = 'UPDATE_ENTERPRISE_INFO_SUCCESS';
export const UPLOAD_ATTACHMENTS_SUCCESS = 'UPLOAD_ATTACHMENTS_SUCCESS';
export const BACK_TO_SIGN_UP_ENTERPRISE = 'BACK_TO_SIGN_UP_ENTERPRISE';
export const GET_ENROLL_ENTERPRISE_MEMBER_SUCCESS = 'GET_ENROLL_ENTERPRISE_MEMBER_SUCCESS';
export const GET_ENROLL_ENTERPRISE_MEMBER_FAIL = 'GET_ENROLL_ENTERPRISE_MEMBER_FAIL';
export const ENROLL_ENTERPRISE_MEMBER_SUCCESS = 'ENROLL_ENTERPRISE_MEMBER_SUCCESS';
export const ENROLL_ENTERPRISE_MEMBER_FAIL = 'ENROLL_ENTERPRISE_MEMBER_FAIL';
export const ENROLL_USER_MEMBER_UPGRADE_SUCCESS = 'ENROLL_USER_MEMBER_UPGRADE_SUCCESS';
export const ENROLL_ENTERPRISE_MEMBER_UPGRADE_SUCCESS = 'ENROLL_ENTERPRISE_MEMBER_UPGRADE_SUCCESS';
export const BACK_TO_SIGN_UP_ENTERPRISE_MEMBER = 'BACK_TO_SIGN_UP_ENTERPRISE_MEMBER';
export const BACK_TO_SIGN_UP_USER_MEMBER = 'BACK_TO_SIGN_UP_USER_MEMBER';
export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';
export const RESET_ENTERPRISE = 'RESET_ENTERPRISE';
export const UPDATE_AVATAR_ENTERPRISE_SUCCESS = 'UPDATE_AVATAR_ENTERPRISE_SUCCESS';
