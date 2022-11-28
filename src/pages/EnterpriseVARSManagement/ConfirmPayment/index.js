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
import { 
    ENTERPRISE_MEMBER_PASSWORD_CONFIRM_ROUTE,
    ENTERPRISE_MEMBER_SIGNUP_ROUTE 
  } from '../declareRoute';
import { useNavigate } from 'react-router-dom';
import { AppInfoView } from '@crema';

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TRANSACTION_ROUTE } from 'pages/TransactionManagement/declareRoute';

const ConfirmPayment = () => {

  Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  };

  const {messages} = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wallet } = useSelector(({transaction}) => transaction);
  const { enterpriseInfo } = useSelector(({auth}) => auth);
  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if(wallet == null) {
      navigate(ENTERPRISE_MEMBER_SIGNUP_ROUTE);
    }
  }, [wallet]);

  useEffect(() => {
    if(wallet) {
      const balance = Number(wallet.balance).format(0, 3, '.', ',');
      setBalance(balance);
    }
  }, [wallet]);

  useEffect(() => {
    if(enterpriseInfo) {
      setName(enterpriseInfo.name);
      setPhone(enterpriseInfo.phone);
    } 
  }, [enterpriseInfo]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    dispatch(onBackFromTransactionPage())
    navigate(TRANSACTION_ROUTE);
  }


  const onConfirmInfo = () => {
    const registrationFee = 5000000;
    if(balance < registrationFee) {
      handleClickOpen()
    }
    else navigate(ENTERPRISE_MEMBER_PASSWORD_CONFIRM_ROUTE);
  }
  const onBack = () => {
    navigate(ENTERPRISE_MEMBER_SIGNUP_ROUTE);
  }
  
  return (
    <div style={{marginBottom:"30px"}}>
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
                <div className='text-bold'>{"5.000.000 VARS"}</div>
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
        <div className='profile-text-label'>Xác nhận thanh toán</div>
        <div className='card-form'>
          <div className='card-wallet'>
            <div> {"Số dư ví (VARS)"} </div>   
            <div className='balance-text'> {balance} </div>   
          </div>

          <div className='card-info'>
            <div className='card-label-text'><b>Thông tin giao dịch</b></div>
            <div className="padding-line" style={{backgroundColor:"#BDBDBD", margin:"15px auto", height:"3px"}}></div>
            <div className='card-info-row'>
              <div>Chủ tài khoản nhận: </div>
              <div><b>Công ty cổ phần công nghệ Resdii</b></div>
            </div>
            <div className='card-info-row'>
              <div>Tài khoản thanh toán: </div>
              <div><b>{name}</b></div>
            </div>
            <div className='card-info-row'>
              <div>Số điện thoại: </div>
              <div><b>{phone}</b></div>
            </div>
            <div className='card-info-row'>
              <div>Phí đăng ký hội viên: </div>
              <div><b>5.000.000 VARS</b></div>
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

export default memo(ConfirmPayment);

ConfirmPayment.propTypes = {};

ConfirmPayment.defaultProps = {};
