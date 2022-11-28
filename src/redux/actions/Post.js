import { DELETE_POST, GET_POST_LIST } from "shared/constants/ApiUrls";
import API from 'api/Request';
import {  FETCH_ERROR, SHOW_MESSAGE } from "shared/constants/ActionTypes";
export const onGetListPost = ({ page, pageSize, fromDate = "", toDate = "", type = "", status = "", subType= "", searchText="" }) => {
    return async (dispatch) => {
        return API.get(GET_POST_LIST, {
            params: {
                page: page,
                pageSize: pageSize,
                fromDate: fromDate,
                toDate: toDate,
                type: type,
                subType: subType,
                status: status,
                searchText: searchText
            }
        })
            .then((data) => {
                return data;
            })
            .catch((e) => {
                console.log("error", e, dispatch);
            });
    };
};

export const onDeletePost = (postId) => {
    return async (dispatch) => {
        return API.delete(DELETE_POST+"/"+postId)
            .then((data) => {
                dispatch({type: SHOW_MESSAGE, payload: data.message})
                return data;
            })
            .catch((e) => {
                dispatch({type: FETCH_ERROR, payload: e.message})
            });
    };
};