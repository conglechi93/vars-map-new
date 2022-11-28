import {memo, 
  useEffect,
  useState, 
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../index.style.less';
import {Button, Input } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { 
  onGetCategories 
} from 'redux/actions/Auth';
import { 
  onCreateTransaction, onGetBalanceWallet
} from 'redux/actions/Transaction';
import { useNavigate } from 'react-router-dom';
import { TRANSACTION_INFO_ROUTE } from '../declareRoute';
import { FETCH_ERROR } from 'shared/constants/ActionTypes';
import { AppInfoView } from '@crema';
import { loadState } from 'utils/localStoreHandle';


const TransactionForm = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();

  const { profile, categories } = useSelector(({auth}) => auth);
  const { wallet, isGetTransactionSuccess } = useSelector(({transaction}) => transaction);
  const { enterpriseInfo } = useSelector(({enterprise}) => enterprise);
  const [bankList, setBankList] = useState();
  const [bankId, setBankId] = useState();
  const [transactionConfig, setTransactionConfig] = useState();
  const [minVars, setMinVars] = useState(0);
  const [maxVars, setMaxVars] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [expectedVars, setExpectedVars] = useState(0);
  const [expectedAmount, setExpectedAmount] = useState(0);

  const navigate = useNavigate();

  Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  };

  useEffect(() => {
    dispatch(onGetCategories());
    const mode = loadState('modeLogin');
    if(mode == '0') {
      if(profile) {
        const walletId = profile.wallet.walletId;
        dispatch(onGetBalanceWallet({walletId}));
      }
    }
    if(mode == '1') {
      if(enterpriseInfo) {
        const walletId = enterpriseInfo.walletId;
        dispatch(onGetBalanceWallet({walletId}));
      }
    }
  }, []);

  useEffect(() => {
    if(isGetTransactionSuccess)  navigate(TRANSACTION_INFO_ROUTE);
  }, [isGetTransactionSuccess]);

  useEffect(() => {
    if(categories) {
      const dataBank = categories.bankList.map((v) => 
      <li key={v.bankId}>
        <input type='radio' value={v.bankId} name='radio' id={v.bankId} />
        <label htmlFor={v.bankId} style={{ backgroundImage: `url(${v.bankLogo})`}} onClick={() => setBankId(v.bankId)}>
        </label>
      </li>)
    setBankList(dataBank);
    setTransactionConfig(categories.transactionConfig);
    }
  }, [categories]);

  useEffect(() => {
    if(transactionConfig != undefined) {
      setMinVars(transactionConfig.minVars);
      setMaxVars(transactionConfig.maxVars);
      setExchangeRate(transactionConfig.exchangeRate);
    }
  }, [transactionConfig]);

  const [warningText, setWarningText] = useState({
    visibility: "hidden"
  })

  const onChangeInput = (e) => {
    console.log();
    const regex = /^[0-9]+$/;
    const value = e.target.value.split('.').join('');
    if(!regex.test(value)) setExpectedAmount(0);
    else {
      setExpectedAmount(value);
    }
  }

  const [checkMoney, setCheckMoney] = useState(false)

  const checkValidate = () => { 
    if(!bankId || checkMoney == false) return false;
    return true;
  }


  useEffect(() => {
    const regex = /^[0-9]+$/;
    if(regex.test(expectedAmount)) {
      setCheckMoney(true);
      setWarningText({
        visibility: "hidden"
      });
      setExpectedVars(expectedAmount / exchangeRate);
    }
    else {
      setCheckMoney(false);
      setWarningText({
        visibility: "visible"
      });
      setExpectedVars(0);
    } 
  }, [expectedAmount]);

  const createTransaction = () => {
    const walletId = wallet.walletId;
    if(checkValidate()) {
      const maxVarsString = maxVars.toLocaleString() + " vnđ";
      const minVarsString = minVars.toLocaleString() + " vnđ";
      if(expectedAmount > maxVars) dispatch({type: FETCH_ERROR, payload: "Số tiền không được vượt quá " +  maxVarsString})
      else {
        if(expectedAmount < minVars) dispatch({type: FETCH_ERROR, payload: "Số tiền không được dưới " + minVarsString})
        else dispatch(onCreateTransaction({walletId, bankId, exchangeRate, expectedVars, expectedAmount}));
      }     
    }
    else dispatch({type:FETCH_ERROR, payload: "Bạn chưa nhập đủ thông tin"});
  }
  
  return (
    <div>
      <AppInfoView></AppInfoView>
      <div className='trasaction-text-label'>Nạp VARS</div>
      <div className='transaction-form'>
        <AppPageMetadata title={messages['common.rechargeVARS']} />
        <div className='trasaction-form'>
          <div className='form-money'>
              <div className='trasaction-text'> Số tiền (đ) </div>
              <Input onChange={onChangeInput} value={Number(expectedAmount).format(0, 3, '.', ',')} maxLength={15} placeholder={messages['common.monneyHinttext']}></Input>
              <div className='warning-text' style={warningText}>Giá trị tiền không hợp lệ</div>
          </div>
          <div className='form-money'>
              <div className='trasaction-text'> Số VARS quy đổi</div>
              <Input value={expectedVars.toLocaleString(undefined, {maximumFractionDigits:2})} disabled={true}></Input>
          </div>
        </div>
        <div className='trasaction-note'>
          <div className='trasaction-text note-text'>Lưu ý: Giao dịch mỗi lần tối thiểu {minVars.toLocaleString() + " VARS" } và tối đa {maxVars.toLocaleString() + " VARS"} | Tỷ lệ quy đổi 1 VARS = {exchangeRate}</div>
        </div>
        <div className='text-bold'>Chọn ngân hàng muốn chuyển khoản thanh toán</div>
        <div className='trasaction-bank-list'>
          <div className='bank-list-radio'>
          {bankList}
          </div>
        </div>     
        <div className='right-btn'>
          <Button type='primary' htmlType='submit' className='sign-btn' onClick={createTransaction}>
              <IntlMessages id='common.rechargeVARS' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(TransactionForm);

TransactionForm.propTypes = {};

TransactionForm.defaultProps = {};
