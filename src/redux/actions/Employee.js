import API from 'api/Request';
import { FETCH_ERROR, SHOW_MESSAGE } from 'shared/constants/ActionTypes';
import { ADD_EMPLOYEE, DELETE_EMPLOYEE, GET_LIST_EMPLOYEE, SEARCH_EMPLOYEE } from 'shared/constants/ApiUrls';

export const onAddEmployee = ({enterpriseId, listEmployee}) => {
    return async (dispatch) => {
        console.log(listEmployee)
        return API.post(ADD_EMPLOYEE.replace("{enterpriseId}", enterpriseId),{
            userIds: listEmployee
        })
            .then((data) => {
                dispatch({ type: SHOW_MESSAGE, payload: "ok" })
                return data;
            })
            .catch((e) => {
                dispatch({ type: FETCH_ERROR, payload: e.message })
            });
    };
};

export const onDeleteEmployee = ({enterpriseId, employeeId}) => {
    return async (dispatch) => {
        return API.delete(DELETE_EMPLOYEE.replace("{enterpriseId}",enterpriseId)+"/"+ employeeId)
            .then((data) => {
                console.log("onDeleteEmployee",data)
                dispatch({ type: SHOW_MESSAGE, payload: "OK" })
                return data;
            })
            .catch((e) => {
                dispatch({ type: FETCH_ERROR, payload: e.message })
            });
    };
};


export const onGetEmployee = ({ enterpriseId, searchData }) => {
    return async (dispatch) => {
        return API.get(GET_LIST_EMPLOYEE.replace("{enterpriseId}", enterpriseId), {
            params: {
                page: searchData.page,
                pageSize: searchData.pageSize,
                status: searchData.status,
                searchText: searchData.searchText,
            }
        })
            .then((data) => {
                // dispatch({ type: SHOW_MESSAGE, payload: data.message })
                return data;
            })
            .catch((e) => {
                console.log(e);
                dispatch({ type: FETCH_ERROR, payload: e.message })
            });
    };
};


export const onSearchEmployee = ({enterpriseId, searchData }) => {
    return async (dispatch) => {
        return API.get(SEARCH_EMPLOYEE.replace("{enterpriseId}", enterpriseId), {
            params: {
                phone: searchData.phone,
            }
        })
            .then((data) => {
                // dispatch({ type: SHOW_MESSAGE, payload: data.message })
                return data;
            })
            .catch((e) => {
                console.log(e);
                dispatch({ type: FETCH_ERROR, payload: e.message })
            });
    };
};
