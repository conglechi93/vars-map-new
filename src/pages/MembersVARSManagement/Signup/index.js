import {memo, 
  useEffect, 
  useState
} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import '../index.style.less';
import {Button, Checkbox, Form } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import AppInput from '@crema/core/AppInput';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { 
  MEMBER_INFORMATION_CONFIRM_ROUTE, 
  MEMBER_SIGNUP_SUCCESS_ROUTE } from '../declareRoute';
import { onGetUserInfo } from 'redux/actions/Auth';
import Number1 from '@assets/icon/1.svg';
import Number2 from '@assets/icon/2.svg';
import Number3 from '@assets/icon/3.svg';
import Number4 from '@assets/icon/4.svg';

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { USER_PROFILE_ROUTE } from 'pages/ProfileManagement/declareRoute';
import { onGetBalanceWallet } from 'redux/actions/Transaction';

const Signup = () => {
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} = useFormMessage();

  const { profile } = useSelector(({auth}) => auth);
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [personalId,setPersonalId] = useState('');
  const [checked,setChecked] = useState(false);
  const [isFirstEnroll,setIsFirstEnroll] = useState();
  const [stylePage, setStylePage] = useState({display: "none"});

  const RegisterMember = () => {
    let checkForm = true;
    const formData = form.getFieldValue();
    
    for(var k in formData) {
      if (formData[k] == '' || formData[k] == null) checkForm = false;
    }
    if (checkForm == true) navigate(MEMBER_INFORMATION_CONFIRM_ROUTE);
    else handleClickOpen();  
  }

  useEffect(() => {
    dispatch(onGetUserInfo());
  }, []);

  useEffect(() => {
    if(profile) {
      console.log("profile",profile)
      setPhone(profile.phone);
      setFullName(profile.fullName);
      setEmail(profile.email);
      setAddress(profile.address);
      setPersonalId(profile.personalId);
      setIsFirstEnroll(profile.enrollInfo.isFirstEnroll);
      const walletId = profile.wallet.walletId;
      dispatch(onGetBalanceWallet({walletId}));
    }
  }, [profile]);

  useEffect(() => {
    if(profile) {
      form.setFieldsValue({
        fullName: fullName,
        phone: phone,
        email: email,
        address: address,
        personalId: personalId,
      })
    }
   }, [form, profile])

  useEffect(() => {
    if(isFirstEnroll) {
      if(isFirstEnroll == 0) navigate(MEMBER_SIGNUP_SUCCESS_ROUTE);
      else setStylePage({display: "block"}) ; 
    }
  }, [isFirstEnroll]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    navigate(USER_PROFILE_ROUTE);
  }


  return (
    <div style={stylePage}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn chưa hoàn tất thông tin"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thông tin đăng ký chưa đầy đủ, vui lòng cập nhật lại thông tin
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
              <IntlMessages id='common.update' />
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <div>
        <AppPageMetadata title={messages['route.group.membersVARSManagement']} />
        <div className='profile-text-label'>Đăng ký hội viên VARS</div>
        <div className='profile-form'>
          <div className='profile-text-label'>Quyền lợi</div>
          <div className='feature-row'>
            <img src={Number1} style={{marginRight:"10px"}}/> Được sử dụng miễn phí các dịch vụ trong hệ sinh thái VARS trong vòng 1 năm
          </div>
          <div className='feature-row'>
            <img src={Number2} style={{marginRight:"10px"}}/> Được mời tham gia các hoạt động mà Hội tổ chức
          </div>
          <div className='feature-row'>
            <img src={Number3} style={{marginRight:"10px"}}/> Được cấp Giấy chứng nhận là Hội viên danh dự hoặc liên kết của Hội Môi giới Bất động sản Việt Nam cho Hội viên
          </div>
          <div className='feature-row'>
            <img src={Number4} style={{marginRight:"10px"}}/> Được giới thiệu, mở rộng cơ hội hợp tác với các Hội viên của Hội trong các hoạt động sản xuất kinh doanh
          </div>
        </div>
        <div className='profile-form'>
          <div className='profile-text-label'>Thông tin đăng ký </div>
          <Form
            form={form}
            className='sign-form'
            name='basic'
            layout='vertical'
            initialValues={{
              fullName: fullName,
              phone: phone,
              email: email,
              address: address,
              personalId: personalId,
            }}>
            <div className='form-padding-start'></div>

            <div className='member-form-row'>
              <div className='member-form-column'>
                <Form.Item
                  name='fullName'
                  className='form-field'
                  label={frl('common.fullName')}
                  rules={[{required: true, message: frm('common.fullName')}]}>
                  <AppInput maxLength={255} disabled={true} placeholder={messages['common.nameHinttext']}/>
                </Form.Item>
              </div>
              <div className='member-form-column'>
                <Form.Item
                  name='personalId'
                  className='form-field'
                  label={frl('common.personalId')}
                  rules={[{required: true, message: frm('common.personalId')}]}>
                  <AppInput maxLength={255} disabled={true} placeholder={messages['common.personalIdHinttext']}/>  
                </Form.Item>
              </div>
            </div>

            <div className='member-form-row'>
              <div className='member-form-column'>
                <Form.Item
                  name='phone'
                  className='form-field'
                  label={frl('common.phoneNumber')}
                  rules={[{required: true, message: frm('common.phoneNumber')}]}>
                  <AppInput maxLength={12} disabled={true} placeholder={messages['common.phoneHinttext']}/>
                </Form.Item>
              </div>
              <div className='member-form-column'>
                <Form.Item
                  name='email'
                  className='form-field'
                  label={frl('common.email')}
                  rules={[{required: true, message: frm('common.email')}]}>
                  <AppInput maxLength={255} className="input-email" disabled={true} placeholder={messages['common.emailHinttext']}/>
                </Form.Item>
              </div>
            </div>
            <div className='member-form-row'>
              <div className='member-form-column'>
                <Form.Item
                  name='address'
                  className='form-field'
                  label={frl('common.address')}
                  rules={[{required: true, message: frm('common.address')}]}>
                  <AppInput maxLength={255} disabled={true} placeholder={messages['common.addressHinttext']}/>
                </Form.Item>
              </div>
              <div className='member-form-column'>
                
              </div>
            </div>
            <div>
              <b>Phí đăng ký: 2.000.000 VARS/năm</b>
            </div>
          </Form>
        </div>
      </div>
      <div style={{margin:"20px"}}>
        <Checkbox onChange={(e) => {setChecked(e.target.checked)}}> Tôi xác nhận đã đọc và đồng ý với điều khoản của <a className='link-text'><IntlMessages id="common.VIPMember"></IntlMessages> </a>
        </Checkbox>
      </div>
      <div className='form-btn'>
        <div className='form-btn-field'>
          <Button onClick={RegisterMember} type='primary' htmlType='submit' className='sign-btn' disabled={!checked}>
            <IntlMessages id='common.resgisterMember' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Signup);

Signup.propTypes = {};

Signup.defaultProps = {};
