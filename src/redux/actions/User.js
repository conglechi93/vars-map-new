import {
  ENROLL_USER_MEMBER_SUCCESS,
  ENROLL_USER_MEMBER_FAIL,
  GET_ENROLL_USER_MEMBER_SUCCESS,
  GET_ENROLL_USER_MEMBER_FAIL,
  UPLOAD_ATTACHMENTS_SUCCESS,
  ENROLL_USER_MEMBER_UPGRADE_SUCCESS,
  BACK_TO_SIGN_UP_USER_MEMBER,
} from 'shared/constants/ActionTypes';
import {
  ENROLL_USER_MEMBER_API,
  UPLOAD_ATTACHMENTS_API,
  ENROLL_USER_MEMBER_UPGRADE_API,
} from 'shared/constants/ApiUrls';
import API from 'api/Request';

export const onBackToSignupVIPUserMember = () => {
  return (dispatch) => {
    dispatch({ type: BACK_TO_SIGN_UP_USER_MEMBER });
  };
};

export const onEnrollUserMemberUpgrade = ({ attachments }) => {
  return (dispatch) => {
    API.patch(ENROLL_USER_MEMBER_UPGRADE_API, {attachments})
      .then((data) => {
        const enrollUser = data;
        dispatch({ type: ENROLL_USER_MEMBER_UPGRADE_SUCCESS, payload: {enrollUser} } );
      })
      .catch((e) => {
        console.log("error", e, dispatch);
      });
  };
};

export const onDeleteAttachment = ({id}) => {
  return () => {
    API.delete(UPLOAD_ATTACHMENTS_API + id,)
      .then(() => {
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
};

export const onUploadAttachment = ({file, type, enterpriseOwnerId}) => {
  let formData = new FormData();
  return async(dispatch) => {
    formData.append("file",file);
    formData.append("enterpriseOwnerId",enterpriseOwnerId);
    formData.append("type",type);
    return API.post(UPLOAD_ATTACHMENTS_API, formData)
      .then((data) => {
        dispatch({type: UPLOAD_ATTACHMENTS_SUCCESS})
        return data;
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
};

export const onGetEnrollUserMember = () => {
  return (dispatch) => {
    API.get(ENROLL_USER_MEMBER_API)
      .then((data) => {
        dispatch({ type: GET_ENROLL_USER_MEMBER_SUCCESS, payload: {data} } );
      })
      .catch((e) => {
        dispatch({ type: GET_ENROLL_USER_MEMBER_FAIL } );
        console.log("error", e);
      });
  };
};

export const onEnrollUserMember = () => {
  const fee = "2000000";
  return (dispatch) => {
    API.post(ENROLL_USER_MEMBER_API, {fee})
      .then(() => {
        dispatch({ type: ENROLL_USER_MEMBER_SUCCESS } );
      })
      .catch((e) => {
        dispatch({ type: ENROLL_USER_MEMBER_FAIL } );
        console.log("error", e);
      });
  };
};


