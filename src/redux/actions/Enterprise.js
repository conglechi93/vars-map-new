import {
  GET_ENTERPRISE_INFO_SUCCESS,
  GET_ENTERPRISE_INFO_DETAIL_SUCCESS,
  UPDATE_ENTERPRISE_INFO_SUCCESS,
  GET_ENROLL_ENTERPRISE_MEMBER_FAIL,
  GET_ENROLL_ENTERPRISE_MEMBER_SUCCESS,
  ENROLL_ENTERPRISE_MEMBER_SUCCESS,
  ENROLL_ENTERPRISE_MEMBER_FAIL,
  ENROLL_ENTERPRISE_MEMBER_UPGRADE_SUCCESS,
  BACK_TO_SIGN_UP_ENTERPRISE_MEMBER,
  SHOW_MESSAGE,
  UPDATE_AVATAR_ENTERPRISE_SUCCESS
} from 'shared/constants/ActionTypes';
import {
  GET_ENTERPRISE_API,
  UPDATE_ENTERPRISE_API,
  ENROLL_ENTERPRISE_MEMBER_API,
  UPDATE_AVATAR_ENTERPRISE_API,
  
} from 'shared/constants/ApiUrls';
import API from 'api/Request';
import { appIntl } from '@crema/utility/helper/Utils';

export const onUpdateAvatarEnterprise = ({ image, id }) => {
  const { messages } = appIntl();
  return (dispatch) => {
    let formData = new FormData();
    formData.append("image",image)
    API.post(UPDATE_AVATAR_ENTERPRISE_API + id + "/avatar", formData)
      .then((data) => {
        dispatch({ type: SHOW_MESSAGE, payload: messages['common.successUpdate'] });
        const avatarEnterprise = data;
        dispatch({ type: UPDATE_AVATAR_ENTERPRISE_SUCCESS, payload: {avatarEnterprise}});
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
};

export const onBackToSignupVIPEnterpriseMember = () => {
  return (dispatch) => {
    dispatch({ type: BACK_TO_SIGN_UP_ENTERPRISE_MEMBER });
  };
};

export const onEnrollEnterpriseMemberUpgrade = ({ enterpriseOwnerId, formData }) => {
  return (dispatch) => {
    API.patch(ENROLL_ENTERPRISE_MEMBER_API + enterpriseOwnerId + '/upgrade', formData)
      .then((data) => {
        const enrollEnterprise = data;
        dispatch({ type: ENROLL_ENTERPRISE_MEMBER_UPGRADE_SUCCESS, payload: {enrollEnterprise} } );
      })
      .catch((e) => {
        console.log("error", e, dispatch);
      });
  };
};

export const onUpdateEnterprise = ({ formData, registerAttachments, id }) => {
  const req = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    tax: formData.tax,
    shortName: formData.shortName,
    registerAttachments: registerAttachments,
  }
  return (dispatch) => {
    API.patch(UPDATE_ENTERPRISE_API + id, 
     req)
      .then((data) => {
        const enterpriseInfo = data;
        dispatch({type: UPDATE_ENTERPRISE_INFO_SUCCESS, payload: {enterpriseInfo}})
      })
      .catch((e) => {
        console.log("error", e, dispatch);
      });
  };
};

export const onGetEnterprise = ({id}) => {
  return (dispatch) => {
    API.get(GET_ENTERPRISE_API + id)
      .then((data) => {
        const enterpriseInfoDetail = data;
        dispatch({type: GET_ENTERPRISE_INFO_DETAIL_SUCCESS, payload: {enterpriseInfoDetail}})
      })
      .catch((e) => {
        console.log("error", e, dispatch);
      });
  };
};

export const onGetEnterpriseList = () => {
  return (dispatch) => {
    API.get(GET_ENTERPRISE_API)
      .then((data) => {
        const enterpriseInfo = data[0];
        let enterpriseInfoAvailable;
        if( data.length == 0) {
          enterpriseInfoAvailable = false;
          const avatarEnterprise = null;
          dispatch({type: GET_ENTERPRISE_INFO_SUCCESS, payload: {enterpriseInfo, enterpriseInfoAvailable, avatarEnterprise}});
        }
        else {
          enterpriseInfoAvailable = true;
          const avatarEnterprise = enterpriseInfo.avatar;
          console.log("avatarEnterprise",avatarEnterprise)
          dispatch({type: GET_ENTERPRISE_INFO_SUCCESS, payload: {enterpriseInfo, enterpriseInfoAvailable, avatarEnterprise}});
        }
        
      })
      .catch((e) => {
        console.log("error", e, dispatch);
      });
  };
};

export const onGetEnrollEnterpriseMember = ({id}) => {
  return (dispatch) => {
    API.get(ENROLL_ENTERPRISE_MEMBER_API + id)
      .then((data) => {
        dispatch({ type: GET_ENROLL_ENTERPRISE_MEMBER_SUCCESS, payload: {data} } );
      })
      .catch((e) => {
        dispatch({ type: GET_ENROLL_ENTERPRISE_MEMBER_FAIL } );
        console.log("error", e);
      });
  };
};

export const onEnrollEnterpriseMember = ({ id}) => {
  const fee = "5000000";
  return (dispatch) => {
    API.post(ENROLL_ENTERPRISE_MEMBER_API + id, {fee})
      .then((data) => {
        console.log("onEnrollUserMember",data);
        dispatch({ type: ENROLL_ENTERPRISE_MEMBER_SUCCESS } );
      })
      .catch((e) => {
        dispatch({ type: ENROLL_ENTERPRISE_MEMBER_FAIL } );
        console.log("error", e);
      });
  };
};


