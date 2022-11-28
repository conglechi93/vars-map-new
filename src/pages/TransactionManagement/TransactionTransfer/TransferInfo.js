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
      if(submitTransferTransactionForm.feePercent == 0) setFeePercent("Miễn phí");
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
          {"Thông báo"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Số dư trên ví không đủ, vui lòng nạp thêm để hoàn tất giao dịch
            <div className='wallet-form'>
              <div className='wallet-collum-right'>
                <div>Số dư ví</div>
                <div className='text-bold'>{balance}</div>
              </div>
              <div className='wallet-collum-left'>
                <div>Phí thanh toán</div>
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
        <div className='transfer-text-label'>Xác nhận</div>
        <div className='card-form'>
          <div className='card-info'>
            <div className='transfer-text-label'><b>Thông tin giao dịch</b></div>
            <div className='card-info-row'>
              <div>Tên người nhận </div>
              <div className='text-bold'>{name}</div>
            </div>
            <div className='card-info-row'>
              <div>Số điện thoại </div>
              <div className='text-bold'>{phone}</div>
            </div>
            <div className='card-info-row'>
              <div>Nội dung </div>
              <div className='text-bold'>{transactionContent}</div>
            </div>
            <div className='card-info-row'>
              <div>Số lượng VARS chuyển </div>
              <div className='text-bold'>{expectedVars} VARS</div>
            </div>
            <div className='card-info-row'>
              <div>Phí giao dịch </div>
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
