import {memo, 
  useEffect,
  //useState,
} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import '../index.style.less';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { onCheckPassword, onReloadConfirmPassword} from 'redux/actions/Auth';
import { onEnrollUserMember } from 'redux/actions/User';
import {Button, Form, Input } from 'antd';
import useFormMessage from 'hooks/useFormMessage';
import { useNavigate } from 'react-router-dom';
import { 
  MEMBER_INFORMATION_CONFIRM_ROUTE, 
  MEMBER_SIGNUP_ROUTE, 
  MEMBER_SIGNUP_SUCCESS_ROUTE } from '../declareRoute';
import { AppInfoView } from '@crema';
const ConfirmPassword = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} =
    useFormMessage();

  const { confirmPassword } = useSelector(({auth}) => auth);
  const { isEnrollUserMember } = useSelector(({user}) => user);
  const { wallet } = useSelector(({transaction}) => transaction);

  useEffect(() => {
    if(wallet == null) {
      navigate(MEMBER_SIGNUP_ROUTE);
    }
  }, []);

  useEffect(() => {
    if(confirmPassword) dispatch(onEnrollUserMember())
  }, [confirmPassword]);

  useEffect(() => {
    if(isEnrollUserMember) {
      dispatch(onReloadConfirmPassword());
      navigate(MEMBER_SIGNUP_SUCCESS_ROUTE);
    }
    
  }, [isEnrollUserMember]);

  const onFinish = () => {
    const password = form.getFieldValue();
    dispatch(onCheckPassword({password}));
  }

  const onBack = () => {
    navigate(MEMBER_INFORMATION_CONFIRM_ROUTE);
  }
  

  return (
    <div style={{marginBottom:"30px"}}>
      <AppInfoView></AppInfoView>
      <div>
      <AppPageMetadata title={messages['route.group.membersVARSManagement']} />
      <div className='profile-text-label'>Nhập mật khẩu</div>
      <div className='password-confirm'>
        <div className='card-label-text'><b>Nhập mật khẩu đăng nhập để xác nhận thanh toán</b></div>
          <div className="padding-line" style={{ margin:"10px auto", height:"1px"}}></div>
          <Form
            form={form}
            className='sign-form'
            name='basic'
            layout='vertical'
            initialValues={{
            }}>
            <div className='form-padding-start'></div>     
            <Form.Item
              name='password'
              className='form-field'
              label={frl('common.password')}
              rules={[{required: true, message: frm('common.password')},]}>
              <Input.Password maxLength={50} placeholder={messages['common.passwordHinttext']}/>
            </Form.Item>
            <div className='form-padding-end'></div>
          </Form>
        </div>
      </div>
      
      <div className='form-btn'>
        <div className='form-btn-field'>
          <Button type='primary' htmlType='submit' className='cancle-btn' onClick={onBack}>
            <IntlMessages id='common.goBack' />
          </Button>
        </div>
        <div className='form-btn-field'>
          <Button type='primary' htmlType='submit' className='sign-btn' onClick={onFinish}>
            <IntlMessages id='common.confirm' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ConfirmPassword);

ConfirmPassword.propTypes = {};

ConfirmPassword.defaultProps = {};
