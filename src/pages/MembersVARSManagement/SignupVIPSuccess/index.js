import {memo, 
  useEffect, 
  useState
} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import '../index.style.less';
import {Button, Form } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import AppInput from '@crema/core/AppInput';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { 
  onBackToSignupVIPUserMember
} from 'redux/actions/User';
import { 
  onGetUserInfo
} from 'redux/actions/Auth';
import WaitingForApproval from '@assets/waitingForApproval.svg';
import Approved from '@assets/approved.svg';
import Rejected from '@assets/rejected.svg';
import DoneIco from '@assets/icon/done.svg';
import { AppInfoView } from '@crema';
import { MEMBER_VIP_SIGNUP_ROUTE } from '../declareRoute';
import { getExtensionFile } from 'utils/File';
import '../../page.style.less';

const SignupVIPSuccess = () => {
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

  const [registerFormHTML,setRegisterFormHTML] = useState([]);
  const [cardIdHTML,setCardIdHTML] = useState([]);
  let [listRegisterForm,setListRegisterForm] = useState([]);
  let [listCardId,setListCardId] = useState([]);
  const [infomationHTML,setInfomationHTML] = useState();

  useEffect(() => {
    dispatch(onGetUserInfo());
  }, []);
  
  useEffect(() => {
    if(profile) {
      setPhone(profile.phone);
      setFullName(profile.fullName);
      setEmail(profile.email);
      setAddress(profile.address);
      setPersonalId(profile.personalId);
      if(profile.enrollInfo) {
        setInfomationHTML(listInfomation[profile.enrollInfo.approvalStatus-1])
        setFooterContentHTML(footerContent[profile.enrollInfo.approvalStatus-1]);
        if(profile.enrollInfo.attachments) {
          let listFiles = profile.enrollInfo.attachments;
          setListRegisterForm(listFiles.filter(listFiles => listFiles.type == 3));
          setListCardId(listFiles.filter(listFiles => listFiles.type == 2));
        }
      }
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

  const BackToSignUpVIPUSerMember = () => {
    dispatch(onBackToSignupVIPUserMember());
    navigate(MEMBER_VIP_SIGNUP_ROUTE);
 }

  // Attach File Handle 

  useEffect(() => {
    if(listRegisterForm.length !=0){
      let list = [];
      for(let i = 0; i < listRegisterForm.length; i++) {
        let filename = listRegisterForm[i].fileName;
        let srcImg = getExtensionFile(filename);
        list = [...list, 
        <div className='file-list' key={i+1}>
          <div>
            <img src={srcImg} className='extension-icon'/>
            {listRegisterForm[i].fileName + " "}
            <img src={DoneIco} id={listRegisterForm[i].id}></img>
          </div>
        </div>]
      }
      setRegisterFormHTML(list);
    }
  }, [listRegisterForm]);

  useEffect(() => {
    if(listCardId.length != 0){
      let list = [];
      for(let i = 0; i < listCardId.length; i++) {
        let filename = listCardId[i].fileName;
        let srcImg = getExtensionFile(filename);
        list = [...list, 
        <div className='file-list-right' key={i+1}>
          <div>
            <img src={srcImg} className='extension-icon'/>
            {listCardId[i].fileName + " "}
            <img src={DoneIco} id={listRegisterForm[i].id}></img>
          </div>
        </div>]
      }
      setCardIdHTML(list);
    }
  }, [listCardId]);

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
      <Button type='primary' htmlType='submit' className='sign-btn'  onClick={BackToSignUpVIPUSerMember}>
        <IntlMessages id='common.updateInfomation' />
      </Button>
    </div>,
    <div className='card-form' key={3}>
    <img className='card-img' src={Rejected}/>
    <div className='reject-text-label'>Hồ sơ hội viên VARS của bạn đã bị từ chối</div>
    <div className="padding-line" style={{margin:"15px auto", height:"1px"}}></div>
    <Button type='primary' htmlType='submit' className='sign-btn' onClick={BackToSignUpVIPUSerMember}>
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

  return (
    <div>
      <div>
        <AppPageMetadata title={messages['route.group.membersVARSManagement']} />
        <div className='profile-text-label'>Hoàn tất hồ sơ</div>
        <AppInfoView></AppInfoView>
        {infomationHTML}
        <div className='profile-form'>
          <div className='profile-text-label'>Thông tin hội viên VARS </div>
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
                  <AppInput maxLength={255} disabled={true}  placeholder={messages['common.personalIdHinttext']}/>  
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
          </Form>
        </div>

        <div className='profile-form'>
          <div className='profile-text-label'>Hồ sơ đính kèm </div>
          <div className='attach-list'>
            <div className='attach-list-column'>
              <div className='text-bold'>CCCD/CMND/Hộ chiếu bản thân<a className='star'>*</a></div>
              {cardIdHTML}
            </div>
            <div style={{margin:"10px"}}></div>
            <div className='attach-list-column'>
              <div className='text-bold'>Phiếu đăng ký trở thành hội viên<a className='star'>*</a></div>
              {registerFormHTML}
            </div>
          </div>
        </div>
      </div>
      {footerContentHTML}
    </div>
  );
};

export default memo(SignupVIPSuccess);

SignupVIPSuccess.propTypes = {};

SignupVIPSuccess.defaultProps = {};
