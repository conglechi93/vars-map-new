import {
    memo, 
} from 'react';
import { useDispatch } from 'react-redux';
import '../index.style.less';
import { Button, Form, Input } from 'antd';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import { AppInfoView } from '@crema';
import { onChangePassword } from 'redux/actions/Auth';
import Validators from 'shared/validators';


const ChangePassword = () => {

    const {messages} = useIntl();

    const [form] = Form.useForm();

    const { formatRequiredMessageId: frm, formatRequiredLabelId: frl } = useFormMessage();

    const dispatch = useDispatch();

    const onFinish = (data) => {
        let oldPassword=data.oldPassword;
        let newPassword=data.newPassword;
        console.log(oldPassword,newPassword,dispatch);
        dispatch(onChangePassword({oldPassword, newPassword}));
    }

    const onFinishFailed = (data) => {
        console.log("data", data);
    }

    return (
        <div>
            <div className='profile-text-label'>Đổi mật khẩu</div>
            <div className='profile-form'>
            <AppPageMetadata />
            <AppInfoView/>
            <Form
                form={form}
                className='change-password-form'
                name='basic'
                layout='vertical'
                initialValues={{
                }}
                onFinish={onFinish}
                onFinishFailed={() => { onFinishFailed() }}>
                <div className='form-padding-start'></div>
                <Form.Item
                    name='oldPassword'
                    className='form-field'
                    label={frl('profile.oldPassword')}
                    rules={[{required: true, message: frm('common.password')}]}>
                    <Input.Password maxLength={30} autoFocus type='password' placeholder={messages['common.passwordHinttext']}/>
                </Form.Item>

                <Form.Item
                    name='newPassword'
                    className='form-field'
                    label={frl('profile.newPassword')}
                    rules={[{ required: true, message: frm('profile.newPassword') },
                    {
                    validator: (_, v) => Validators.Password(v),
                    message: messages['validator.passWord'],
                    },]}>
                    <Input.Password maxLength={30}  type='password' placeholder={messages['common.newPasswordHinttext']}/>
                </Form.Item>

                <Form.Item
                    name='newPasswordAgain'
                    className='form-field'
                    label={frl('profile.newPasswordAgain')}
                    rules={[
                        {
                          required: true,
                          message: frm('profile.newPasswordAgain'),
                        },
                        ({getFieldValue}) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(messages['auth.passwordNotMatch']),
                            );
                          },
                        }),
                      ]}>
                    <Input.Password maxLength={30}  type='password' placeholder={messages['common.confirmPasswordHinttext']}/>
                </Form.Item>

                <div className='form-btn-field'>
                    <Button type='primary' htmlType='submit' className='change-password-btn'>
                        <IntlMessages id='profile.changePassword' />
                    </Button>
                </div>
            </Form>
            </div>
        </div>
    );
};

export default memo(ChangePassword);

ChangePassword.propTypes = {};

ChangePassword.defaultProps = {};
