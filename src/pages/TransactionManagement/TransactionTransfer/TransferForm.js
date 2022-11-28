import {
  memo,
  useEffect,
  useState,
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import '../index.style.less';
import { Button, Input, Form } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import {
  onGetCategories,
} from 'redux/actions/Auth';
import {
  onGetBalanceWallet,
  onGetSuggestWallet,
  onSetDataSubmitTransferTransaction,
  onGetRecentTransfer,
  onResetSuggestWallet
} from 'redux/actions/Transaction';
import PropTypes from 'prop-types';
import { AppInfoView } from '@crema';
import { useLocation, useNavigate } from 'react-router-dom';

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FETCH_ERROR } from 'shared/constants/ActionTypes';
import { TRANSACTION_TRANSFER_VARS_INFO_ROUTE } from '../declareRoute';
import { loadState } from 'utils/localStoreHandle';



const TransferForm = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  const { profile, categories } = useSelector(({ auth }) => auth);
  const { suggestWalletList, recentTransferList, wallet, isGetSuggestWalletSuccess } = useSelector(({ transaction }) => transaction);
  const { enterpriseInfo } = useSelector(({ enterprise }) => enterprise);
  const [balance, setBalance] = useState('');
  const [expectedVars, setExpectedVars] = useState();
  const [transactionConfig, setTransactionConfig] = useState();
  const [minTransferVars, setMinTransferVars] = useState(0);
  const [maxTransferVars, setMaxTransferVars] = useState(0);
  const [feePercent, setFeePercent] = useState();
  const [phone, setPhone] = useState(location?.state?.phoneNumber ? location.state.phoneNumber : undefined);
  const [transactionContent, setTransactionContent] = useState();
  const [suggestWalletListHTML, setSuggestWalletListHTML] = useState([]);
  const [recentTransferListHTML, setRecentTransferListtHTML] = useState([]);


  const handleClickRadioButton = (e) => {
    const value = Number(e.target.value).format(0, 3, '.', ',')
    setExpectedVars(value);
  }

  const onChangeInput = (e) => {
    const regex = /^[0-9]+$/;
    const value = e.target.value.split('.').join('');
    if (!regex.test(value)) setExpectedVars();
    else {
      setExpectedVars(Number(value).format(0, 3, '.', ','));
    }
  }

  const ChangePhone = (e) => {
    setPhone(e.target.value);
  }

  const LoadSuggestWallet = () => {
    const expectedVarsValue = expectedVars.split('.').join('');
    if (expectedVarsValue != 0 && phone) {
      if (Number(expectedVarsValue) < Number(minTransferVars)) dispatch({ type: FETCH_ERROR, payload: "Số tiền không được dưới " + minTransferVars.toLocaleString() + " VARS" });
      else {
        if (Number(expectedVarsValue) > Number(maxTransferVars)) dispatch({ type: FETCH_ERROR, payload: "Số tiền không được vượt quá " + maxTransferVars.toLocaleString() + " VARS" });
        else {
          dispatch(onGetSuggestWallet({ phone }));
        }
      }
    }
    else dispatch({ type: FETCH_ERROR, payload: "Chưa nhập đủ thông tin" });
  }

  Number.prototype.format = function (n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = this.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  };

  useEffect(() => {
    dispatch(onResetSuggestWallet());
    const modeLogin = loadState('modeLogin');
    if (modeLogin == '1') {
      if (enterpriseInfo) {
        const walletId = enterpriseInfo.walletId;
        dispatch(onGetBalanceWallet({ walletId }));
      }
    }
    if (modeLogin == '0') {
      if (profile) {
        const walletId = profile.wallet.walletId;
        dispatch(onGetBalanceWallet({ walletId }));
      }
    }
  }, [])

  useEffect(() => {
    if (isGetSuggestWalletSuccess) {
      handleClickOpen();
    }
  }, [isGetSuggestWalletSuccess])



  useEffect(() => {
    if (suggestWalletList) {
      if (suggestWalletList.length == 0) {
        let listL = [<div key={0} style={{ textAlign: "center" }}>Không tìm thấy không tin !</div>];
        setSuggestWalletListHTML(listL);
      }
      else {
        let list = [];
        for (let i = 0; i < suggestWalletList.length; i++) {
          let contact;
          let modeText;
          if (suggestWalletList[i].isEnterprise == 1) {
            contact = suggestWalletList[i].walletOwner.tax;
            modeText = "Doanh nghiệp";
          }
          else {
            contact = suggestWalletList[i].walletOwner.phone;
            modeText = "Cá nhân";
          }
          
          list = [...list,
          <div key={suggestWalletList[i].walletId}>
            <div className='padding-middle'></div>
            <button key={i} value={i} className='suggest-wallet-form' onClick={onClickSuggestWallet}>
              <img target="suggest-wallet-form" src={suggestWalletList[i].walletOwner.avatar} className="image-icon"></img>
              <div className='suggest-wallet-row' value={i}>
                <div className='text-bold' value={i}>{suggestWalletList[i].walletOwner.fullName}<a className='mode-name-text'>{modeText}</a></div>
                <div value={i}>{contact}</div>
              </div>
            </button>
          </div>
          ]
        }
        setSuggestWalletListHTML(list);
      }

    }
  }, [suggestWalletList]);

  const onClickSuggestWallet = (e) => {
    console.log(e.target.value)
    const index = e.target.value;
    const destWalletId = suggestWalletList[index].walletId;
    const isEnterprise = suggestWalletList[index].isEnterprise;
    const suggestWalletCurrent = suggestWalletList[index];
    const walletId = wallet.walletId;
    const submitTransferTransactionForm = {
      walletId: walletId,
      destWalletId: destWalletId,
      transactionContent: transactionContent,
      expectedVars: expectedVars.split('.').join(''), 
      feePercent: feePercent,
      isEnterprise: isEnterprise,
    }
    setOpen(false);
    dispatch(onSetDataSubmitTransferTransaction(submitTransferTransactionForm, suggestWalletCurrent));
    navigate(TRANSACTION_TRANSFER_VARS_INFO_ROUTE);
    dispatch(onResetSuggestWallet());
  }

  useEffect(() => {
    if (recentTransferList) {
      let list = [];
      for (let i = 0; i < recentTransferList.length; i++) {
        list = [...list,
        <img id={i} key={i} className="ico-avatar" src={recentTransferList[i].avatar} onClick={ClickCurrentTransferImage}></img>
        ]
      }
      setRecentTransferListtHTML(list);
    }
  }, [recentTransferList]);

  const ClickCurrentTransferImage = (e) => {
    const index = e.target.id
    setPhone(recentTransferList[index].phone);
  }

  useEffect(() => {
    dispatch(onGetCategories());
  }, []);

  useEffect(() => {
    if (categories) {
      setTransactionConfig(categories.transactionConfig);
    }
  }, [categories]);

  useEffect(() => {
    if (transactionConfig) {
      setFeePercent(transactionConfig.feeTransferPercent);
      setMinTransferVars(transactionConfig.minTransferVars);
      setMaxTransferVars(transactionConfig.maxTransferVars);
    }
  }, [transactionConfig]);

  useEffect(() => {
    if (wallet) {
      const walletId = wallet.walletId;
      dispatch(onGetRecentTransfer({ walletId }));
      const balance = Number(wallet.balance).format(0, 3, '.', ',');
      setBalance(balance);
    }
  }, [wallet]);

  // Handle Dialog

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(onResetSuggestWallet());
  };



  return (
    <div>
      <AppInfoView></AppInfoView>
      <AppPageMetadata title={messages['common.rechargeVARS']} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className='suggest-phone'>Chọn tài khoản nhận VARS của số điện thoại</div>
          <div className='suggest-phone'>{phone}</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {suggestWalletListHTML}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='form-btn-field'>
            <Button type='primary' htmlType='submit' className='cancle-btn' onClick={handleClose}>
              <IntlMessages id='common.goBack' />
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <div className='transfer-text-label'>Chuyển VARS</div>
      <div className='transaction-form'>
        <div className='card-wallet'>
          <div> {"Số dư ví (VARS)"} </div>   
          <div className='balance-text'> {balance} </div>   
        </div>
        <div className="padding-line" style={{backgroundColor:"#BDBDBD", margin:"15px auto", height:"1px"}}></div>
        <div className='transfer-text-label'>Thông tin giao dịch</div>
        <Form
          form={form}
          className='sign-form'
          name='basic'
          layout='vertical'>
          <div className='form-padding-start'></div>
          <div className='transfer-radio'>
            <ul>
              <li>
                <input type='radio' value='50000' name='radio' id='1' onClick={handleClickRadioButton} />
                <label htmlFor='1'>50.000</label>
              </li>
              <li>
                <input type='radio' value='100000' name='radio' id='2' onClick={handleClickRadioButton} />
                <label htmlFor='2'>100.000</label>
              </li>
              <li>
                <input type='radio' value='200000' name='radio' id='3' onClick={handleClickRadioButton} />
                <label htmlFor='3'>200.000</label>
              </li>
              <li>
                <input type='radio' value='500000' name='radio' id='4' onClick={handleClickRadioButton} />
                <label htmlFor='4'>500.000</label>
              </li>
              <li>
                <input type='radio' value='1000000' name='radio' id='5' onClick={handleClickRadioButton} />
                <label htmlFor='5'>1.000.000</label>
              </li>
              <li>
                <input type='radio' value='2000000' name='radio' id='6' onClick={handleClickRadioButton} />
                <label htmlFor='6'>2.000.000</label>
              </li>
              <li>
                <input type='radio' value='3000000' name='radio' id='7' onClick={handleClickRadioButton} />
                <label htmlFor='7'>3.000.000</label>
              </li>
              <li>
                <input type='radio' value='5000000' name='radio' id='8' onClick={handleClickRadioButton} />
                <label htmlFor='8'>5.000.000</label>
              </li>
            </ul>
          </div>
          <div className='transaction-form-row'>
            <div className='transaction-form-column'>
              <div className='trasaction-text text-bold'> Người nhận </div>
              <Input onChange={ChangePhone} value={phone} placeholder={messages['common.receivePersonHinttext']}></Input>
            </div>
            <div className='transaction-form-column'>
              <div className='trasaction-text text-bold'> Số lượng muốn chuyển </div>
              <Input value={expectedVars} onChange={onChangeInput} maxLength={12} placeholder={messages['common.expectedVarsHinttext']}></Input>
            </div>
          </div>
          <div className="padding-line" style={{margin:"5px auto", height:"1px"}}></div>
          <div className='trasaction-text text-bold'> Nội dung </div>
          <Input.TextArea value={transactionContent} onChange={(e) => setTransactionContent(e.target.value)} maxLength={500} placeholder={messages['common.contentVarsHinttext']}></Input.TextArea>
        </Form>
        
        <div className='transfer-form'>
          <div className='transfer-row'>
            <div className='trasaction-text text-bold' > Chuyển gần đây </div>
            <div className='transfer-recent-transfer'>
              {recentTransferListHTML}
            </div>
          </div>
        </div>
        <div className='right-btn'>
          <Button type='primary' htmlType='submit' className='sign-btn' onClick={LoadSuggestWallet}>
              <IntlMessages id='common.transferVARS' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(TransferForm);

TransferForm.propTypes = {
  phoneNumber: PropTypes.number
};

TransferForm.defaultProps = {};
