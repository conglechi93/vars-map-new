import {memo, 
  useEffect,
} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import '../index.style.less';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { onCheckPassword, onReloadConfirmPassword } from 'redux/actions/Auth';
import { onResetTranfersInfo, onSubmitTransferTransaction } from 'redux/actions/Transaction';
import {Button, Form, Input } from 'antd';
import useFormMessage from 'hooks/useFormMessage';
import { AppInfoView } from '@crema';
import { useNavigate } from 'react-router-dom';
import { TRANSACTION_TRANSFER_VARS_INFO_ROUTE, TRANSACTION_TRANSFER_VARS_ROUTE, TRANSACTION_TRANSFER_VARS_SUCCESS_ROUTE } from '../declareRoute';

const ConfirmPassword = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} =
    useFormMessage();
  const { confirmPassword } = useSelector(({auth}) => auth);
  const { submitTransferTransactionForm, wallet, isTransferTransactionSuccess } = useSelector(({transaction}) => transaction);

  useEffect(() => {
    if(wallet == null) {
      navigate(TRANSACTION_TRANSFER_VARS_ROUTE);
    }
  }, []);

  useEffect(() => {
    if(confirmPassword) {
      const walletId = wallet.walletId;
      dispatch(onSubmitTransferTransaction( {walletId, submitTransferTransactionForm}))
    }
  }, [confirmPassword]);

  useEffect(() => {
    if(isTransferTransactionSuccess) {
      dispatch(onReloadConfirmPassword());
      dispatch(onResetTranfersInfo());
      navigate(TRANSACTION_TRANSFER_VARS_SUCCESS_ROUTE)
    }
  }, [isTransferTransactionSuccess]);

  const onFinish = () => {
    const password = form.getFieldValue();
    dispatch(onCheckPassword({password}));
  }

  const onBack = () => {
    navigate(TRANSACTION_TRANSFER_VARS_INFO_ROUTE);
  }

  return (
    <div >
      <AppInfoView></AppInfoView>
      <div className='transfer-text-label'>Nhập mật khẩu</div>
      <div className='transaction-form'>
        <AppPageMetadata title={messages['route.group.membersVARSManagement']} />
        <div className='card-info'>
          <div className='card-label-text'><b>Nhập mật khẩu đăng nhập để xác nhận thanh toán</b></div>
          <div className="padding-line" style={{margin:"10px auto", height:"1px"}}></div>
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
            <div className='confirm-form-btn'>
              <div className='form-btn-field confirm-btn'>
                <Button type='primary' htmlType='submit' className='cancle-btn' onClick={onBack}>
                  <IntlMessages id='common.goBack' />
                </Button>
              </div>
              <div className='form-btn-field confirm-btn  '>
                <Button type='primary' htmlType='submit' className='sign-btn' onClick={onFinish}>
                  <IntlMessages id='common.confirm' />
                </Button>
              </div>
            </div>
            <div className='form-padding-end'></div>
            
          </Form>
        </div>
       
      </div>
    </div>
  );
};

export default memo(ConfirmPassword);

ConfirmPassword.propTypes = {};

ConfirmPassword.defaultProps = {};
