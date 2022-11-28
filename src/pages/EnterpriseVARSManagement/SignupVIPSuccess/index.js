import {memo, 
  useEffect, 
  useState
} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import '../index.style.less';
import {Button, Form, Input } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import AppInput from '@crema/core/AppInput';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { 
  onBackToSignupVIPEnterpriseMember,
  onGetEnrollEnterpriseMember,
  onGetEnterpriseList, 
} from 'redux/actions/Enterprise';
import { AppInfoView } from '@crema';
import WaitingForApproval from '@assets/waitingForApproval.svg';
import Approved from '@assets/approved.svg';
import Rejected from '@assets/rejected.svg';
import DoneIco from '@assets/icon/done.svg';
import { useNavigate } from 'react-router-dom';
import { ENTERPRISE_VIP_SIGNUP_ROUTE } from '../declareRoute';
import { getExtensionFile } from 'utils/File';
import '../../page.style.less';


const SignupVIPSuccess = () => {
  const {messages} = useIntl();
  const [form] = Form.useForm();

  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} = useFormMessage();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enterpriseInfo, enrollEnterprise } = useSelector(({enterprise}) => enterprise);
  let [listRegisterForm,setListRegisterForm] = useState([]);
  const [registerFormHTML,setRegisterFormHTML] = useState([]);
  const [enterpriseOwnerId, setEnterpriseOwnerId] = useState();
  const [infomationHTML,setInfomationHTML] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    dispatch(onGetEnterpriseList());
  }, []);

  
  useEffect(() => {
    if(enterpriseInfo) {
      setEnterpriseOwnerId(enterpriseInfo.id);
      setDescription(enterpriseInfo.description); 
    }
  }, [enterpriseInfo]);

  useEffect(() => {
    if(enterpriseOwnerId) {
      if(enterpriseOwnerId) {
        const id = enterpriseOwnerId;
        dispatch(onGetEnrollEnterpriseMember({id}));
      }
    }
  }, [enterpriseOwnerId]);

  useEffect(() => {
    if(listRegisterForm.length !=0){
      let list = [];
      for(let i = 0; i < listRegisterForm.length; i++) {
        let filename = listRegisterForm[i].fileName;
        let srcImg = getExtensionFile(filename);
        list = [...list, 
        <div className='registerForm-row' key={i+1}>
          <div>
            <img src={srcImg} className='extension-icon'/>
            {listRegisterForm[i].fileName + " "} 
            <img src={DoneIco}/>
          </div>
        </div>]
      }
      setRegisterFormHTML(list);
    }
  }, [listRegisterForm]);

  const BackToSignUpVIPEnterpriseMember = () => {
    dispatch(onBackToSignupVIPEnterpriseMember());
    navigate(ENTERPRISE_VIP_SIGNUP_ROUTE);
 }

 const [listInfomation] = useState([
  <div className='card-form' key={1}>
    <img className='card-img' src={Approved}/>
    <div className='card-text-label'> Chúc mừng bạn</div>
    <div className='note-text'>Yêu cầu đăng ký hội viên của bạn đã được phê duyệt </div>
  </div>,
  <div className='card-form' key={2}>
    <img className='card-img' src={WaitingForApproval}/>
    <div className='card-text-label'> Chờ xét duyệt</div>
    <div className='note-text'>Yêu cầu hoàn tất hồ sơ hội viên VARS của bạn đang được hệ thống xử lí </div>
    <div className="padding-line" style={{margin:"15px auto", height:"1px"}}></div>
    <Button type='primary' htmlType='submit' className='sign-btn'  onClick={BackToSignUpVIPEnterpriseMember}>
      <IntlMessages id='common.updateInfomation' />
    </Button>
  </div>,
  <div className='card-form' key={3}>
    <img className='card-img' src={Rejected}/>
    <div className='reject-text-label'>Hồ sơ hội viên VARS của bạn đã bị từ chối</div>
    <div className="padding-line" style={{margin:"15px auto", height:"1px"}}></div>
    <Button type='primary' htmlType='submit' className='sign-btn' onClick={BackToSignUpVIPEnterpriseMember}>
      <IntlMessages id='common.updateInfomation' />
    </Button>
  </div>
]);

  const [footerContentHTML, setFooterContentHTML] = useState([])


  const [footerContent] = useState([
    <div className="enterprise-note " key={1}>
      <div className='contact-note-text'>· Nếu bạn muốn thay đổi thông tin, vui lòng liên hệ qua email: hotrovarland@gmail.com</div>
      <div className='contact-note-text'>· Hoặc gọi qua số hotline: <a className='contact-text'>0247 15 65 | 0236 256 325</a> để được hỗ trợ</div>
    </div>,
    <div className='form-btn' key={2}>
    </div>,
    <div className='form-btn' key={3}>
    </div>
  ])

  useEffect(() => {
    if(enrollEnterprise) {
      console.log("enrollEnterprise",enrollEnterprise)
      setInfomationHTML(listInfomation[enrollEnterprise.approvalStatus-1]);
      setFooterContentHTML(footerContent[enrollEnterprise.approvalStatus-1]);
      if(enrollEnterprise.attachments) {
        let listFiles = enrollEnterprise.attachments;
        setListRegisterForm(listFiles.filter(listFiles => listFiles.type == 3)); 
      }
    }
  }, [enrollEnterprise]);



  useEffect(() => {
    if(enterpriseInfo) {
      form.setFieldsValue({
        phone: enterpriseInfo.phone == null ? "" : enterpriseInfo.phone,
        email: enterpriseInfo.email == null ? "" : enterpriseInfo.email,
        address: enterpriseInfo.address == null ? "" : enterpriseInfo.address,
        name: enterpriseInfo.name == null ? "" : enterpriseInfo.name,
        shortName: enterpriseInfo.shortName == null ? "" : enterpriseInfo.shortName,
        tax: enterpriseInfo.tax == null ? "" : enterpriseInfo.tax,
      })
    }
   }, [form, enterpriseInfo]);

  return (
    <div>
      <AppInfoView></AppInfoView>
      <div>
        <AppPageMetadata title={messages['route.group.enterpriseManagement']} />
        <div className='profile-text-label'>Hoàn tất hồ sơ</div>
        {infomationHTML}
        <div className='enterprise-form'>
          <div className='enterprise-text-label'>Thông tin hội viên VARS </div>
          <Form
            form={form}
            className='sign-form'
            name='basic'
            layout='vertical'>
            <div className='form-padding-start'></div>
            <div className='enterprise-form-row'>
              <div className='enterprise-form-column'>
                <Form.Item
                name='name'
                className='form-field'
                label={frl('common.companyName')}
                rules={[{required: true, message: frm('common.companyName')}]}>
                <AppInput maxLength={255} disabled={true} placeholder={messages['common.nameHinttext']}/>
              </Form.Item>
              </div>
              <div className='enterprise-form-column'>
                <Form.Item
                  name='shortName'
                  className='form-field'
                  label={frl('common.shortName')}
                  rules={[{required: true, message: frm('common.shortName')}]}>
                  <AppInput maxLength={255} disabled={true} placeholder={messages['common.shortNameHinttext']}/>
                </Form.Item>
              </div>
            </div>

            <div className='enterprise-form-row'>
              <div className='enterprise-form-column'>
                <Form.Item
                  name='phone'
                  className='form-field'
                  label={frl('common.phoneNumber')}
                  rules={[{required: true, message: frm('common.phoneNumber')}]}>
                  <AppInput maxLength={12} disabled={true} placeholder={messages['common.phoneHinttext']}/>
                </Form.Item>
              </div>
              <div className='enterprise-form-column'>
                <Form.Item
                  name='email'
                  className='form-field'
                  label={frl('common.email')}
                  rules={[{required: true, message: frm('common.email')}]}>
                  <AppInput maxLength={255} className="input-email" disabled={true} placeholder={messages['common.emailHinttext']}/>
                </Form.Item>
              </div>
            </div>

            <div className='enterprise-form-row'>
              <div className='enterprise-form-column'>
                <Form.Item
                  name='address'
                  className='form-field'
                  label={frl('common.address')}
                  rules={[{required: true, message: frm('common.address')}]}>
                  <AppInput maxLength={255} disabled={true} placeholder={messages['common.addressHinttext']}/>
                </Form.Item>
              </div>
              <div className='enterprise-form-column'>
                <Form.Item
                  name='tax'
                  className='form-field'
                  label={frl('common.tax')}
                  rules={[{required: true, message: frm('common.tax')}]}>
                  <AppInput maxLength={255} disabled={true} placeholder={messages['common.taxHinttext']}/>  
                </Form.Item>
              </div>
            </div>   
          </Form>   
        </div>

        <div className='profile-form'>
          <div className='profile-text-label'>Hồ sơ đính kèm </div>
          <div className='registerForm-list'>   
            <div className='text-bold'>Phiếu đăng ký trở thành hội viên<a className='star'>*</a></div> 
            {registerFormHTML}
          </div>
        </div>

        <div className='profile-form'>
          <div className='enterprise-text-label'>Giới thiệu về doanh nghiệp </div>
          <Input value={description} onChange={(e) => setDescription(e.target.value)}></Input>
        </div>
      </div>
      {footerContentHTML}
    </div>
  );
};

export default memo(SignupVIPSuccess);

SignupVIPSuccess.propTypes = {};

SignupVIPSuccess.defaultProps = {};


