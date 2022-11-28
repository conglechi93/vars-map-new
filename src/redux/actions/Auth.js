import {
  CLEAN_STATE,
  LOGOUT,
  SET_LOGIN_REDIRECT_TO,
  SHOW_MESSAGE,
  GET_USER_INFO_SUCCESS,
  WIPE_USER,
  SIGN_IN_SSO_SUCCESS,
  GET_TOKEN_SUCCESS,
  SET_CODE_VERIFIER,
  CHECK_PASSWORD_SUCCESS,
  CHECK_PASSWORD_FAIL,
  FETCH_ERROR,
  GET_CATEGORIES_SUCCESS,
  UPDATE_ENTERPRISE_INFO_SUCCESS,
  BACK_TO_SIGN_UP_ENTERPRISE_MEMBER,
  CHANGE_ACCOUNT,
  UPDATE_PROFILE_SUCCESSS,
  UPDATE_AVATAR_SUCCESS,
  RELOAD_CONFIRM_PASSWORD,
  RESET_ENTERPRISE
} from 'shared/constants/ActionTypes';
import {
  GET_USER_INFO_API,
  CHANGE_PASSWORD_API,
  CHECK_PASSWORD_API,
  CATEGORIES_LIST_API,
  UPDATE_ENTERPRISE_API,
  UPDATE_PROFILE_API,
  UPDATE_AVATAR_API
} from 'shared/constants/ApiUrls';
import API from 'api/Request';
import { appIntl } from '@crema/utility/helper/Utils';
import { REQUEST_MUTED } from '@api/RequestEnum';
import ssoSdkJs from '../../../src/vars-id';
import { createChallange } from 'utils/CodeChallenge';
import { appNavigate } from 'utils/AppNavigate';
import { defaultSignInUrl } from 'shared/constants/AppConst';

export const SSO = new ssoSdkJs.SSOCore({
  serverUrl: process.env.REACT_APP_SSO_SERVER_URL,
  appCode: process.env.REACT_APP_SSO_APP_CODE,
  clientId: process.env.REACT_APP_SSO_CLIENT_ID,
  windowOpts: process.env.REACT_APP_SSO_WINDOW_OPTS,
  redirectTo: process.env.REACT_APP_SSO_REDIRECT_TO
});

export const SSOExtra = new ssoSdkJs.SSOClient({
  serverUrl: process.env.REACT_APP_SSO_SERVER_URL,
  appCode: process.env.REACT_APP_SSO_APP_CODE,
  clientId: process.env.REACT_APP_SSO_CLIENT_ID,
  windowOpts: process.env.REACT_APP_SSO_WINDOW_OPTS,
  clientSecret: process.env.REACT_APP_SSO_CLIENT_SECRET
});

export const onChangeAcount = ({modeChangeAccount}) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_ACCOUNT, payload: {modeChangeAccount} });
  };
};

export const onBackToSignupVIPEnterpriseMember = () => {
  return (dispatch) => {
    dispatch({ type: BACK_TO_SIGN_UP_ENTERPRISE_MEMBER });
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
export const onGetCategories = () => {
  return (dispatch) => {
    API.get(CATEGORIES_LIST_API, { REQUEST_MUTED })
      .then((data) => {
        const categories = data;
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: { categories } });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
};

export const onCheckPassword = ({ password}) => {
  return (dispatch) => {
    API.post(CHECK_PASSWORD_API, password)
      .then(() => {
        dispatch({ type: CHECK_PASSWORD_SUCCESS } );
      })
      .catch((e) => {
        dispatch({ type: CHECK_PASSWORD_FAIL } );
        dispatch({ type: FETCH_ERROR, payload: e.messages})
      });
  };
};

export const onReloadConfirmPassword = () => {
  return (dispatch) => {
    dispatch({ type: RELOAD_CONFIRM_PASSWORD } );
  };
};

export const onLogoutSSO = ({accessToken,  refreshToken }) => {
  return (dispatch) => {
    const sessionToken = accessToken;
    SSO.logoutAll(sessionToken,refreshToken , {
      onSuccess: () => {
        dispatch({ type: LOGOUT });
      },
      onError: (e) => {
        appNavigate().navigate(defaultSignInUrl);
        console.log("error", e);
      }
    })
  };
};

export const onLogout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
    dispatch({ type: RESET_ENTERPRISE});
    dispatch({ type: CLEAN_STATE });
  };
};

export const onChangePassword = ({oldPassword, newPassword}) => {
  const { messages } = appIntl();
  return (dispatch) => {
    API.patch(CHANGE_PASSWORD_API, {oldPassword,newPassword})
      .then((data) => {
        console.log(data,dispatch);
        dispatch({ type: SHOW_MESSAGE, payload: messages['common.successUpdate'] });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
};

export const onUpdateInfo = ({ dataReq }) => {
  const { messages } = appIntl();
  return (dispatch) => {
    API.patch(UPDATE_PROFILE_API, dataReq)
      .then(() => {
        const isUpdateUserInfo = true
        dispatch({ type: UPDATE_PROFILE_SUCCESSS, payload:  {isUpdateUserInfo}});
        dispatch({ type: SHOW_MESSAGE, payload: messages['common.successUpdate'] });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
};

export const onUpdateAvatar = ({ image }) => {
  const { messages } = appIntl();
  return (dispatch) => {
    let formData = new FormData();
    formData.append("image",image)
  
    API.post(UPDATE_AVATAR_API, formData)
      .then((data) => {
        const avatar = data;
        dispatch({ type: SHOW_MESSAGE, payload: messages['common.successUpdate'] });
        dispatch({ type: UPDATE_AVATAR_SUCCESS, payload: { avatar } });

      })
      .catch((e) => {
        console.log("error", e);
      });
  };
};

export const onGetUserInfo = () => {
  return (dispatch) => {
    API.get(GET_USER_INFO_API)
      .then((data) => {
        dispatch({type: GET_USER_INFO_SUCCESS, payload: {data}});
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
};




export const onGetTokenSSO = ({ authCode, codeVerifier }) => {

  return (dispatch) => {
    SSO.exchangeOTAC(authCode, codeVerifier, {
      onSuccess: (data) => {
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        dispatch({ type: GET_TOKEN_SUCCESS, payload: { accessToken, refreshToken } });
        dispatch(onGetUserInfo());
      },
      onError: (e) => {
        console.log("error", e);
      }
    })
    
  }
}

export const onSigninwithSS0 = () => {
  const serverUrl = process.env.REACT_APP_SSO_SERVER_URL;
  const appCode = process.env.REACT_APP_SSO_APP_CODE;
  const clientId = process.env.REACT_APP_SSO_CLIENT_ID;
  const windowOpts = process.env.REACT_APP_SSO_WINDOW_OPTS;
  const redirectTo = process.env.REACT_APP_SSO_REDIRECT_TO;
  return async (dispatch) => {
    const challenge = createChallange();
    const codeVerifier = challenge.code_verifier;
    const codeChallenge = challenge.code_challenge;
    dispatch({ type: SET_CODE_VERIFIER, payload: { codeVerifier } });
    const SSO = new ssoSdkJs.SSOCore({
      serverUrl: serverUrl,
      appCode: appCode,
      clientId: clientId,
      windowOpts: windowOpts,
      redirectTo: redirectTo,
      codeChallenge: codeChallenge,
    });
    console.log(SSO, SIGN_IN_SSO_SUCCESS)
    SSO.login({
      onSuccess: (authCodeObj) => {
        const authCode = authCodeObj.authCode;
        dispatch({ type: SIGN_IN_SSO_SUCCESS, payload: { authCode } });
      },
      onError: (e) => {
        console.log(e);
      }
    });
  }
}

export const onLogoutAndSetRedirect = (url) => {
  return (dispatch) => {
    dispatch({ type: SET_LOGIN_REDIRECT_TO, payload: url });
    dispatch(onLogout());
  };
};

export const onSetRedirectTo = (url) => {
  return (dispatch) => {
    dispatch({ type: SET_LOGIN_REDIRECT_TO, payload: url });
  };
};

export const onWipeUser = () => {
  return (dispatch) => {
    dispatch({ type: WIPE_USER });
  };
};


