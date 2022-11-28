import {memo, 
  useEffect,
  useState, 
} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import '../index.style.less';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { onGetUserInfo } from 'redux/actions/Auth';
import { onBackFromTransactionPage } from 'redux/actions/Transaction';
import { 
   MEMBER_PASSWORD_CONFIRM_ROUTE,
   MEMBER_SIGNUP_ROUTE 
  } from '../declareRoute';
import { useNavigate } from 'react-router-dom';
import { AppInfoView } from '@crema';
import {Button, Form } from 'antd';
import AppInput from '@crema/core/AppInput';
import useFormMessage from 'hooks/useFormMessage';

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
  const [form] = Form.useForm();
  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} = useFormMessage();

  const { profile } = useSelector(({auth}) => auth);
  const { wallet } = useSelector(({transaction}) => transaction);
  const [accountReceive] = useState("Công ty cổ phần công nghệ Resdii");
  const [balance, setBalance] = useState(0);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [memberFee] = useState(2000000)

  useEffect(() => {
    if(wallet) {
      const balance = Number(wallet.balance).format(0, 3, '.', ',');
      setBalance(balance);
    }
  }, [wallet]);

  useEffect(() => {
    if(wallet == null) {
      navigate(MEMBER_SIGNUP_ROUTE)
    }
    dispatch(onGetUserInfo());
  }, []);

  useEffect(() => {
    if(profile) {
      setFullName(profile.fullName);
      setPhone(profile.phone);
    } 
  }, [profile]);

  useEffect(() => {
    if(profile) {
      form.setFieldsValue({
        fullName: fullName,
        phone: phone,
        accountReceive: accountReceive,
        memberFee: memberFee.toLocaleString() + " VARS"
      })
    }
   }, [form, profile])

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
    const registrationFee = 2000000;
    console.log(balance);
    if(balance < registrationFee) {
      handleClickOpen()
    }
    else navigate(MEMBER_PASSWORD_CONFIRM_ROUTE);
  }
  const onBack = () => {
    navigate(MEMBER_SIGNUP_ROUTE);
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
        <DialogTitle id="alert-dialog-title" style={{textAlign:"center"}} className='text-bold'>
          {"Thông báo"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Số dư trên ví không đủ, vui lòng nạp thêm để hoàn tất giao dịch
            <div className='wallet-form'>
              <div className='wallet-collum-right'>
                <div>Số dư ví</div>
                <div className='text-bold'>{balance.toLocaleString()}</div>
              </div>
              <div className='wallet-collum-left'>
                <div>Phí thanh toán</div>
                <div className='text-bold'>{"2.000.000 VARS"}</div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <div className='wallet-form-buton'>
            <Button type='primary' htmlType='submit' className='cancle-btn wallet-button' onClick={handleClose}>
              <IntlMessages id='common.forLater' />
            </Button>
            <Button type='primary' htmlType='submit' className='sign-btn wallet-button' onClick={handleUpdate} autoFocus>
              <IntlMessages id='common.recharge' />
            </Button>
        </div>
        </DialogActions>
      </Dialog>
      <div>
        <div className='profile-text-label'> Xác nhận thanh toán </div>
        <AppPageMetadata title={messages['route.group.membersVARSManagement']} />
        <div className='profile-form'>
          <div className='card-wallet'>
            <div> {"Số dư ví (VARS)"} </div>   
            <div className='balance-text'> {balance} </div>   
          </div>
          <div className="padding-line" style={{backgroundColor:"#BDBDBD", margin:"15px auto", height:"1px"}}></div>
          <div className='member-label-text'><b>Thông tin giao dịch</b></div>
            <Form
              form={form}
              className='sign-form'
              name='basic'
              layout='vertical'
              initialValues={{
                fullName: fullName,
                phone: phone,
                memberFee: memberFee,
              }}>
              <div className='form-padding-start'></div>

              <div className='member-form-row'>
                <div className='member-form-column'>
                  <Form.Item
                    name='accountReceive'
                    className='form-field'
                    label={frl('common.accountReceive')}>
                    <AppInput maxLength={255} disabled={true} />
                  </Form.Item>
                </div>
                <div className='member-form-column'>
                  <Form.Item
                    name='fullName'
                    className='form-field'
                    label={frl('common.accountPay')}
                    rules={[{required: true, message: frm('common.accountPay')}]}>
                    <AppInput maxLength={255} disabled={true} placeholder={messages['common.nameHinttext']}/>
                  </Form.Item>
                </div>
              </div>

              <div className='member-form-row'>
                <div className='member-form-column'>
                  <Form.Item
                    name='phone'
                    className='form-field'
                    label={frl('common.phoneNumber')}>
                    <AppInput maxLength={12} disabled={true} placeholder={messages['common.phoneHinttext']}/>
                  </Form.Item>
                </div>
                <div className='member-form-column'>
                  <Form.Item
                    name='memberFee'
                    className='form-field'
                    label={frl('common.memberFee')}>
                    <AppInput maxLength={255} disabled={true} />
                  </Form.Item>
                </div>
              </div>
            </Form>
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
