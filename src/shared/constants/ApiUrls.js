// AUTH
export const LOGOUT_API = process.env.REACT_APP_API_URL + '/vid/web/ajax/auth/logout/all';
export const REQUEST_OTAC_API = process.env.REACT_APP_API_URL + '/vid/api/auth/code/request';
// PROFILE
export const GET_USER_INFO_API = process.env.REACT_APP_API_URL + '/vcms/users/me';
export const UPDATE_AVATAR_API = process.env.REACT_APP_API_URL +'/vcms/users/me/avatar';
export const UPDATE_PROFILE_API = process.env.REACT_APP_API_URL + '/vcms/users/me';
export const CHANGE_PASSWORD_API = process.env.REACT_APP_API_URL + '/vid/api/users/me/password/change';

// MEMBER VARS
export const GET_BALANCE_WALLET_API = process.env.REACT_APP_API_URL + '/vcms/wallets/me/';
export const ENROLL_USER_MEMBER_API = process.env.REACT_APP_API_URL + '/vcms/members/me/enroll/'
export const CHECK_PASSWORD_API = process.env.REACT_APP_API_URL + '/vid/api/users/me/password/checking/';
export const ENROLL_ENTERPRISE_MEMBER_API = process.env.REACT_APP_API_URL + '/vcms/members/me/enroll/enterprises/';
export const ENROLL_USER_MEMBER_UPGRADE_API = process.env.REACT_APP_API_URL + '/vcms/members/me/enroll/upgrade/';

// TRANSACTION 
export const CREATE_TRANSACTION_API = process.env.REACT_APP_API_URL + '/vcms/wallets/me/';
export const GET_TRANSACTION_DETAIL_API = process.env.REACT_APP_API_URL + '/vcms/wallets/me/';
export const GET_TRANSACTION_LIST_API = process.env.REACT_APP_API_URL + '/vcms/wallets/me/';
export const GET_SUGGEST_WALLET_API = process.env.REACT_APP_API_URL +'/vcms/wallets/suggestions/';
export const SUBMIT_TRANSFER_TRANSACTION_API = process.env.REACT_APP_API_URL + '/vcms/wallets/me/';
export const GET_RECENT_TRANSFER_API = process.env.REACT_APP_API_URL + '/vcms/wallets/me/';


// ENTERPRISE
export const GET_ENTERPRISE_API = process.env.REACT_APP_API_URL + '/vcms/enterprises/me/';
export const UPLOAD_ATTACHMENTS_API = process.env.REACT_APP_API_URL + '/vcms/files/me/attachments/';
export const UPDATE_ENTERPRISE_API = process.env.REACT_APP_API_URL + '/vcms/enterprises/me/';
export const UPDATE_AVATAR_ENTERPRISE_API = process.env.REACT_APP_API_URL +'/vcms/enterprises/me/';

// CATEGORY
export const CATEGORIES_LIST_API = process.env.REACT_APP_API_URL + '/vcat/categories/all';

// ADMIN APPLICATION
export const VALIDATING_CLIENT = process.env.REACT_APP_API_URL + '/vid/web/ajax/apps/view/validateClient';

// HELPER

//GET CATEGORY 

export const GET_GENDER_CATEGORY = process.env.REACT_APP_API_URL + '/vcat/categories/code/gender';
export const GET_JOB_TYPE_CATEGORY = process.env.REACT_APP_API_URL + '/vcat/categories/code/jobType';
export const GET_REGISTER_INFO_CATEGORY_API =  process.env.REACT_APP_API_URL + '/vcat/categories/code/registerInfo';


//GET TRANSACTION
export const GET_TRANSACTION_STATUS = process.env.REACT_APP_API_URL + '/vcat/categories/code/transactionStatus';
export const GET_TRANSACTION_TYPE = process.env.REACT_APP_API_URL + '/vcat/categories/code/transactionType';
export const GET_TRANSACTION_DETAIL = process.env.REACT_APP_API_URL + '/vcms/wallets/me/{walletId}/transactions/';


//POST
export const GET_REAL_ESATE_TYPE = process.env.REACT_APP_API_URL + '/vcat/categories/code/realEstateTypeCat';
export const GET_REAL_ESATE_POST_STATUS = process.env.REACT_APP_API_URL + '/vcat/categories/code/postStatusCat';
export const GET_POST_LIST = process.env.REACT_APP_API_URL + '/vland/posts/me';
export const DELETE_POST = process.env.REACT_APP_API_URL + '/vland/posts/me';

//EMPLOYEE
export const GET_EMPLOYEE_STATUS = process.env.REACT_APP_API_URL + '/vcat/categories/code/inviteStatusCat';
export const GET_LIST_EMPLOYEE = process.env.REACT_APP_API_URL + '/vcms/enterprises/me/{enterpriseId}/staffs';
export const SEARCH_EMPLOYEE = process.env.REACT_APP_API_URL + '/vcms/enterprises/me/{enterpriseId}/staffs/search';
export const ADD_EMPLOYEE = process.env.REACT_APP_API_URL + '/vcms/enterprises/me/{enterpriseId}/staffs';
export const DELETE_EMPLOYEE = process.env.REACT_APP_API_URL + '/vcms/enterprises/me/{enterpriseId}/staffs';


//INVITE
export const GET_INVITE_LIST = process.env.REACT_APP_API_URL + '/vcms/users/me/invites';
export const REJECT_INVITE = process.env.REACT_APP_API_URL + '/vcms/users/me/invites';
export const APCEPT_INVITE = process.env.REACT_APP_API_URL + '/vcms/users/me/invites';


