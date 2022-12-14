import {memo, 
  useEffect,
  useState, 
} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import '../index.style.less';
import {Button } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { onBackFromTransactionPage } from 'redux/actions/Transaction';
import { useNavigate } from 'react-router-dom';
import { AppInfoView } from '@crema';


// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TRANSACTION_TRANSFER_VARS_CONFIRM_ROUTE, TRANSACTION_TRANSFER_VARS_ROUTE } from 'pages/TransactionManagement/declareRoute';

const TransfersInfo = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  };


  const { submitTransferTransactionForm, wallet, suggestWalletCurrent } = useSelector(({transaction}) => transaction);
  const [balance, setBalance] = useState('');
  const [expectedVars, setExpectedVars] = useState();
  const [feePercent, setFeePercent] = useState();
  const [transactionContent, setTransactionContent] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if(wallet) {
      const balance = Number(wallet.balance).format(0, 3, '.', ',');
      setBalance(balance);
    }
    
  }, [wallet]);

  useEffect(() => {
    if(wallet == null) {
      navigate(TRANSACTION_TRANSFER_VARS_ROUTE);
    }
  }, []);

  useEffect(() => {
    if(submitTransferTransactionForm) {
      const expectedVars = Number(submitTransferTransactionForm.expectedVars).format(0, 3, '.', ',');
      setExpectedVars(expectedVars.toLocaleString());
      if(submitTransferTransactionForm.feePercent == 0) setFeePercent("Mi???n ph??");
      else setFeePercent(submitTransferTransactionForm.feePercent);
      setTransactionContent(submitTransferTransactionForm.transactionContent);
    } 
  }, [submitTransferTransactionForm]);

  useEffect(() => {
    if(suggestWalletCurrent) {
      setName(suggestWalletCurrent.walletOwner.fullName);
      setPhone(suggestWalletCurrent.walletOwner.phone);
    } 
  }, [suggestWalletCurrent]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    dispatch(onBackFromTransactionPage());
    navigate(TRANSACTION_TRANSFER_VARS_ROUTE);
  }


  const onConfirmInfo = () => {
    const balanceCurrent = balance.split('.').join('');
    const expectedVarsCurrent = expectedVars.split('.').join('');
    if( Number(balanceCurrent) < Number(expectedVarsCurrent)) {
      handleClickOpen();
    }
    else navigate(TRANSACTION_TRANSFER_VARS_CONFIRM_ROUTE);
  }
  const onBack = () => {
    navigate(TRANSACTION_TRANSFER_VARS_ROUTE);
  }
  
  return (
    <div>
      <AppInfoView></AppInfoView>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Th??ng b??o"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            S??? d?? tr??n v?? kh??ng ?????, vui l??ng n???p th??m ????? ho??n t???t giao d???ch
            <div className='wallet-form'>
              <div className='wallet-collum-right'>
                <div>S??? d?? v??</div>
                <div className='text-bold'>{balance}</div>
              </div>
              <div className='wallet-collum-left'>
                <div>Ph?? thanh to??n</div>
                <div className='text-bold'>{expectedVars}</div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='form-btn-field'>
            <Button type='primary' htmlType='submit' className='cancle-btn' onClick={handleClose}>
              <IntlMessages id='common.forLater' />
            </Button>
          </div>
          <div className='form-btn-field'>
            <Button type='primary' htmlType='submit' className='sign-btn' onClick={handleUpdate} autoFocus>
              <IntlMessages id='common.recharge' />
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <div>
        <AppPageMetadata title={messages['route.group.membersVARSManagement']} />
        <div className='transfer-text-label'>X??c nh???n</div>
        <div className='card-form'>
          <div className='card-info'>
            <div className='transfer-text-label'><b>Th??ng tin giao d???ch</b></div>
            <div className='card-info-row'>
              <div>T??n ng?????i nh???n </div>
              <div className='text-bold'>{name}</div>
            </div>
            <div className='card-info-row'>
              <div>S??? ??i???n tho???i </div>
              <div className='text-bold'>{phone}</div>
            </div>
            <div className='card-info-row'>
              <div>N???i dung </div>
              <div className='text-bold'>{transactionContent}</div>
            </div>
            <div className='card-info-row'>
              <div>S??? l?????ng VARS chuy???n </div>
              <div className='text-bold'>{expectedVars} VARS</div>
            </div>
            <div className='card-info-row'>
              <div>Ph?? giao d???ch </div>
              <div className='text-bold'>{feePercent}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='form-btn'>
        <div className='form-btn-field'>
          <Button type='primary' htmlType='submit' className='cancle-btn'  onClick={onBack}>
            <IntlMessages id='common.goBack' />
          </Button>
        </div>
        <div className='form-btn-field'>
          <Button type='primary' htmlType='submit' className='sign-btn' onClick={onConfirmInfo}>
            <IntlMessages id='common.confirm' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(TransfersInfo);

TransfersInfo.propTypes = {};

TransfersInfo.defaultProps = {};
