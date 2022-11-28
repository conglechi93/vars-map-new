import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onGetTokenSSO,  onSigninwithSS0, SSO } from 'redux/actions/Auth';
import { useSearchParams } from "react-router-dom";
import { CLEAN_STATE, SIGN_IN_SSO_SUCCESS } from 'shared/constants/ActionTypes';
export const SSOListener = ({ children }) => {
    const dispatch = useDispatch();
    let {  accessToken, codeVerifier, authCode } = useSelector(({ auth }) => auth);

    const [searchParam] = useSearchParams();

    useEffect(() => {
        SSO.checkLogin({
            onSuccess: () => {
                if (accessToken != null) {
                    return;
                }
                const authCodeSearchParam = searchParam.get('authCode');
                if (authCodeSearchParam != null) {
                    authCode = authCodeSearchParam;
                    dispatch(onGetTokenSSO({ authCode, codeVerifier }));
                    dispatch({ type: SIGN_IN_SSO_SUCCESS, payload: { authCode} });
                } else {
                    dispatch(onSigninwithSS0());
                }
            },
            onError: (e) => {
                console.log(e)
                dispatch({ type: CLEAN_STATE });
            },
        })
    },[]);
    return children;
};

SSOListener.propTypes = {
  children: PropTypes.node,
};
