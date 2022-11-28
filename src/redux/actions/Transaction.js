import {
  GET_BALANCE_WALLET_SUCCESS,
  CREATE_TRANSACTION_SUCCESS,
  GET_TRANSACTION_DETAIL_SUCCESS,
  BACK_FROM_TRANSACTION_PAGE,
  CREATE_TRANSACTION_FAIL,
  GET_SUGGEST_WALLET_SUCCESS,
  GET_SUGGEST_WALLET_FAIL,
  SET_DATA_SUBMIT_TRANSFER_TRANSACTION,
  SUBMIT_TRANSFER_TRANSACTION_SUCCESS,
  GET_RECENT_TRANSFER_SUCCESS,
  RESET_SUGGEST_WALLET,
  RESET_TRANFERS_INFO
} from 'shared/constants/ActionTypes';
import {
  GET_BALANCE_WALLET_API,
  CREATE_TRANSACTION_API,
  GET_TRANSACTION_DETAIL_API,
  GET_TRANSACTION_LIST_API,
  GET_SUGGEST_WALLET_API,
  SUBMIT_TRANSFER_TRANSACTION_API,
  GET_RECENT_TRANSFER_API,

} from 'shared/constants/ApiUrls';
import API from 'api/Request';

export const onResetTranfersInfo = () => {
  return (dispatch) => {
  dispatch({type: RESET_TRANFERS_INFO});
  }
};

export const onGetRecentTransfer = ({ walletId }) => {
  return (dispatch) => {
    API.get(GET_RECENT_TRANSFER_API + walletId + '/recent/transfer')
      .then((data) => {
        const recentTransferList = data;
        dispatch({type: GET_RECENT_TRANSFER_SUCCESS, payload: {recentTransferList}});
      })
      .catch((e) => {
        console.log("error", e, dispatch);
      });
  };
};


export const onSetDataSubmitTransferTransaction = (submitTransferTransactionForm, suggestWalletCurrent) => {
  return (dispatch) => {
    dispatch({type: SET_DATA_SUBMIT_TRANSFER_TRANSACTION, payload: {submitTransferTransactionForm, suggestWalletCurrent}})
  };
};


export const onSubmitTransferTransaction = ({walletId, submitTransferTransactionForm}) => {

  return (dispatch) => {
    API.post(SUBMIT_TRANSFER_TRANSACTION_API + walletId + "/transactions/transfer", submitTransferTransactionForm)
      .then((data) => {
        dispatch({type: SUBMIT_TRANSFER_TRANSACTION_SUCCESS, payload: {data}})
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
};

export const onResetSuggestWallet = () => {
  return (dispatch) => {
    dispatch({type: RESET_SUGGEST_WALLET});
  };
};


export const onGetSuggestWallet = ({ phone }) => {
  return (dispatch) => {
    API.get(GET_SUGGEST_WALLET_API, { 
      params: {
        phone: phone,
      },
      })
      .then((data) => {
        const suggestWalletList = data;
        dispatch({type: GET_SUGGEST_WALLET_SUCCESS, payload: {suggestWalletList} });
      })
      .catch((e) => {
        dispatch({type: GET_SUGGEST_WALLET_FAIL});
        console.log("error", e, dispatch);
      });
  };
};

export const onGetTransactionList = ({ page, pageSize, fromDate = "", toDate = "", type = "", status = "", walletId }) => {
  return async (dispatch) => {
    return API.get(GET_TRANSACTION_LIST_API + walletId + '/transactions', { 
      params: {
        page: page,
        pageSize: pageSize,
        fromDate: fromDate,
        toDate: toDate,
        type: type,
        status: status,
      }})
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.log("error", e, dispatch);
      });
  };
};

export const onBackFromTransactionPage = () => {
  return (dispatch) => {
    dispatch({ type: BACK_FROM_TRANSACTION_PAGE });
  };
};

export const onGetTransactionDetail = ({ walletId, transactionId }) => {
  return (dispatch) => {
    API.get(GET_TRANSACTION_DETAIL_API + walletId + "/transactions/" + transactionId)
      .then((data) => {
        console.log("transaction Detail", data)
        const transactionDetail = data;
        dispatch({ type: GET_TRANSACTION_DETAIL_SUCCESS, payload: { transactionDetail } })
      })
      .catch((e) => {
        //dispatch({type: GET_TRANSACTION_DETAIL_FAIL});
        console.log("err", e);
      });
  };
};

export const onCreateTransaction = ({ bankId, exchangeRate, expectedAmount, expectedVars, walletId }) => {
  const req = {
    bankInfo: {
      bankId: bankId
    },
    exchangeRate,
    expectedAmount,
    expectedVars
  }
  return (dispatch) => {
    API.post(CREATE_TRANSACTION_API + walletId + "/transactions/depositing", req)
      .then((data) => {
        const transactionInfo = data;
        if (transactionInfo != undefined) {
          dispatch({ type: CREATE_TRANSACTION_SUCCESS, payload: { transactionInfo } })
        }

      })
      .catch((e) => {
        dispatch({ type: CREATE_TRANSACTION_FAIL });
        console.log("CREATE_TRANSACTION_FAIL error", e, dispatch);
      });
  };
};

export const onGetBalanceWallet = ({ walletId }) => {
  return (dispatch) => {
    API.get(GET_BALANCE_WALLET_API + walletId)
      .then((data) => {
        const wallet = data;
        dispatch({type: GET_BALANCE_WALLET_SUCCESS, payload: {wallet}});
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
};



