import { APCEPT_INVITE} from "shared/constants/ApiUrls";
import API from 'api/Request';
import { SHOW_MESSAGE } from "shared/constants/ActionTypes";
export const onHandleInvite = ({ id, status }) => {
    return async (dispatch) => {
        return API.post(APCEPT_INVITE, {
            "id": id,
            "status": status
        })
            .then((data) => {
                dispatch({ type: SHOW_MESSAGE, payload: "ok" })
                return data;
            })
            .catch((e) => {
                console.log("error", e, dispatch);
            });
    };
};
