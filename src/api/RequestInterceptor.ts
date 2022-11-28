import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useStore } from "react-redux";
import {  CLEAN_STATE, FETCH_ERROR, FETCH_START, FETCH_SUCCESS, GET_TOKEN_SUCCESS } from "shared/constants/ActionTypes";
import { axiosInstance } from "./Request";
import { SSOExtra } from "redux/actions/Auth";
import { appNavigate } from "utils/AppNavigate";
import { defaultAdminUrl } from "shared/constants/AppConst";
const cancelTokens: { [k: string]: CancelTokenSource | null } = {}
let cancelTokensIndex = 'DEFAULT'

export class AxiosRequestCancleToken {
  static cancel(key: string = 'DEFAULT') {
    cancelTokens?.[key]?.cancel()
  }

  static setIndex(key: string = 'DEFAULT') {
    cancelTokensIndex = key
  }

  static getToken() {
    if (!cancelTokens[cancelTokensIndex]) this.generate(cancelTokensIndex)
    return cancelTokens?.[cancelTokensIndex]?.token
  }

  static generate(key: string = 'DEFAULT') {
    const source = axios.CancelToken.source()
    if (key) cancelTokens[key] = source
    else cancelTokens['DEFAULT'] = source
    this.setIndex(key)
  }
}

const useRequestInterceptor = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const store = useStore();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const apiRequestInterceptor = (config: AxiosRequestConfig) => {
      if (store.getState().auth.accessToken != null) {
        config.headers["Authorization"] = 'Bearer ' + store.getState().auth.accessToken
      }
      config.cancelToken = AxiosRequestCancleToken.getToken()
      AxiosRequestCancleToken.setIndex()
      const { REQUEST_MUTED } = config as any
      if (!REQUEST_MUTED)
        dispatch({ type: FETCH_START })
      return config
    }

    const apiSuccessResponseInterceptor = (
      response: AxiosResponse,
    ): AxiosResponse['data'] => {
      const { REQUEST_MUTED } = response.config as any
      if (!REQUEST_MUTED)
        dispatch({ type: FETCH_SUCCESS })
      return response.data.data;
    }

    const apiFailureResponseInterceptor =async (error: any) => {
      const response = error.response || {}
      const { REQUEST_MUTE_ON_ERROR, REQUEST_MUTE_ON_SUCCESS, REQUEST_IGNORE_401_ERROR, REQUEST_MUTED,
      } = error.config
      const data = response.data
      const status = response.status;
      const originalRequest = error.config;
      if (!REQUEST_IGNORE_401_ERROR && status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return SSOExtra.refreshToken(store.getState().auth.refreshToken, {
          onSuccess: (data: any) => {
            const accessToken = data.accessToken;
            const refreshToken = data.refreshToken;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
            dispatch({ type: GET_TOKEN_SUCCESS, payload: { accessToken, refreshToken } });
            return axiosInstance(originalRequest);
          },
          onError: (e: any) => {
            console.log(e);
            dispatch({ type: CLEAN_STATE });
            return Promise.reject(
              appNavigate().navigate(defaultAdminUrl)
            )
          }
        });
        // if (data?.message == 'TOKEN_INVALID' && !REQUEST_IGNORE_TOKEN_INVALID)
        //   dispatch(onLogout())
        // if (data?.message == 'UNKNOWN_VALIDATING_EXCEPTION' && !REQUEST_IGNORE_UNKNOWN_VALIDATING)
        //   dispatch(onLogout())
        // if (data?.message == 'TOKEN_MISSING' && !REQUEST_IGNORE_TOKEN_MISSING)
        //   dispatch(onLogout())
      }
      console.log("external");
      let message = ''
      if (data)
        message = data.error || data.message
      else if (error.message == 'Network Error')
        message = messages['error.networkError'].toString()
      else if (error.message)
        message = error.message
      else
        message = messages['error.message.somethingWentWrong'].toString()

      if (!REQUEST_MUTE_ON_ERROR && !REQUEST_MUTED)
        dispatch({ type: FETCH_ERROR, payload: message })
      else if (!REQUEST_MUTE_ON_SUCCESS && !REQUEST_MUTED)
        dispatch({ type: FETCH_SUCCESS })

      return Promise.reject({ ...error, message })
    }

    const reqInterceptor = axiosInstance.interceptors.request.use(apiRequestInterceptor);
    const resInterceptor = axiosInstance.interceptors.response.use(apiSuccessResponseInterceptor, apiFailureResponseInterceptor);
    setReady(true)
    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return ready
};

const RequestInterceptor = ({ children }: React.PropsWithChildren<any>) => {
  const initialized = useRequestInterceptor()
  if (initialized)
    return children
  else return null
}

export { useRequestInterceptor, RequestInterceptor }