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
  CLEAN_STATE,
  RESET_SUGGEST_WALLET,
  RESET_TRANFERS_INFO

} from 'shared/constants/ActionTypes';

const initialState = {
  recentTransferList: null,
  submitTransferTransactionForm: null,
  suggestWalletCurrent: null,
  isTransferTransactionSuccess: null,
  transferInfo: null,
  suggestWalletList: [],
  transactionDetail: null,
  transactionInfo: null,
  isGetTransactionSuccess: null,
  wallet: null,
  isGetSuggestWalletSuccess: null,
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_TRANFERS_INFO :
    return {
      ...state,
      isGetTransactionSuccess: null,
      isTransferTransactionSuccess: null,
    };
    case RESET_SUGGEST_WALLET:
    return {
      ...state,
      isGetSuggestWalletSuccess: false,
    };
    case GET_RECENT_TRANSFER_SUCCESS:
    return {
      ...state,
      recentTransferList: action.payload.recentTransferList,
    };
    case SET_DATA_SUBMIT_TRANSFER_TRANSACTION: 
    return {
      ...state,
      submitTransferTransactionForm: action.payload.submitTransferTransactionForm,
      suggestWalletCurrent: action.payload.suggestWalletCurrent,
    };
    case SUBMIT_TRANSFER_TRANSACTION_SUCCESS:
    return {
      ...state,
      isTransferTransactionSuccess: true,
      transferInfo: action.payload.data
    };
    case GET_SUGGEST_WALLET_SUCCESS: 
    return {
      ...state,
      suggestWalletList: action.payload.suggestWalletList,
      isGetSuggestWalletSuccess: true,
    };
    case GET_SUGGEST_WALLET_FAIL: 
    return {
      ...state,
      suggestWalletList: [],
      isGetSuggestWalletSuccess: false,
    };
    case BACK_FROM_TRANSACTION_PAGE:
    return {
      ...state,
      transactionDetail: null,
      isGetTransactionSuccess: false,
    };
    case GET_TRANSACTION_DETAIL_SUCCESS:
    return {
      ...state,
      transactionDetail: action.payload.transactionDetail,
    };
    case CREATE_TRANSACTION_SUCCESS:
    return {
      ...state,
      transactionInfo: action.payload.transactionInfo,
      isGetTransactionSuccess: true,
    };
    case CREATE_TRANSACTION_FAIL:
    return {
      ...state,
      isGetTransactionSuccess: false,
    };
    case GET_BALANCE_WALLET_SUCCESS:
    return {
      ...state,
      wallet: action.payload.wallet,
    };
    case CLEAN_STATE:
      return initialState
    default:
      return state;
  }
};
export default transactionReducer;
