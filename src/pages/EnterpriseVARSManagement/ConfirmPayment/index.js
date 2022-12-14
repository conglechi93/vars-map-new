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
        <div className='profile-text-label'>X??c nh???n thanh to??n</div>
        <div className='card-form'>
          <div className='card-wallet'>
            <div> {"S??? d?? v?? (VARS)"} </div>   
            <div className='balance-text'> {balance} </div>   
          </div>

          <div className='card-info'>
            <div className='card-label-text'><b>Th??ng tin giao d???ch</b></div>
            <div className="padding-line" style={{backgroundColor:"#BDBDBD", margin:"15px auto", height:"3px"}}></div>
            <div className='card-info-row'>
              <div>Ch??? t??i kho???n nh???n: </div>
              <div><b>C??ng ty c??? ph???n c??ng ngh??? Resdii</b></div>
            </div>
            <div className='card-info-row'>
              <div>T??i kho???n thanh to??n: </div>
              <div><b>{name}</b></div>
            </div>
            <div className='card-info-row'>
              <div>S??? ??i???n tho???i: </div>
              <div><b>{phone}</b></div>
            </div>
            <div className='card-info-row'>
              <div>Ph?? ????ng k?? h???i vi??n: </div>
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
