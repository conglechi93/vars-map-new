import {memo, 
  useEffect, 
  useState
} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import '../index.style.less';
import {Button, Form } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import AppInput from '@crema/core/AppInput';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { 
  onGetEnterpriseList, 
  onGetEnrollEnterpriseMember
} from 'redux/actions/Enterprise';
import { AppInfoView } from '@crema';
import WaitingForApproval from '@assets/waitingForApproval.svg';
import Approved from '@assets/approved.svg';
import Rejected from '@assets/rejected.svg';
import DoneIco from '@assets/icon/done.svg';
import { BACK_TO_SIGN_UP_ENTERPRISE, FETCH_ERROR } from 'shared/constants/ActionTypes';
import { useNavigate } from 'react-router-dom';
import { ENTERPRISE_SIGNUP_ROUTE } from '../declareRoute';
import { ENTERPRISE_MEMBER_SIGNUP_ROUTE } from 'pages/EnterpriseVARSManagement/declareRoute';
import { getExtensionFile } from 'utils/File';
import '../../page.style.less';

const Success = () => {
  const {messages} = useIntl();
  const [form] = Form.useForm();

  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} = useFormMessage();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enterpriseInfo, enrollEnterprise } = useSelector(({enterprise}) => enterprise);

  const BackToSignupEnterprise = () => {
    if(enterpriseInfo.registerStatus == 1) dispatch({type: FETCH_ERROR, payload: "Bạn không thể cập nhật lại vì hồ sơ đã được phê duyệt "})
    else {
      dispatch({type:BACK_TO_SIGN_UP_ENTERPRISE});
      navigate(ENTERPRISE_SIGNUP_ROUTE);
    }
  }

  const [listInfomation] = useState([
    <div className='card-form' key={1}>
      <img className='card-img' src={Approved}/>
      <div className='card-text-label'> Đăng ký thành công</div>
      <div className='note-text'>Giờ đây bạn có thể quản lý doanh nghiệp của riêng bạn </div>
    </div>,
    <div className='card-form' key={2}>
      <img className='card-img' src={WaitingForApproval}/>
      <div className='card-text-label'> Chờ xét duyệt</div>
      <div className='note-text'>Yêu cầu đăng ký tài khoản doanh nghiệp của bạn đang được hệ thống xử lí </div>
      <div className="padding-line" style={{margin:"15px auto", height:"1px"}}></div>
      <Button type='primary' htmlType='submit' className='sign-btn' onClick={BackToSignupEnterprise}>
        <IntlMessages id='common.updateInfomation' />
      </Button>
    </div>,
    <div className='card-form' key={3}>
      <img className='card-img' src={Rejected}/>
      <div className='reject-text-label'>Yêu cầu đăng ký tài khoản doanh nghiệp bị từ chối</div>
      <div className="padding-line" style={{margin:"15px auto", height:"1px"}}></div>
      <div className="padding-line" style={{margin:"15px auto", height:"1px"}}></div>
      <Button type='primary' className='sign-btn' onClick={BackToSignupEnterprise}>
        <IntlMessages id='common.updateInfomation' />
      </Button>
    </div>,
    <div className='card-form' key={4}>
      <img className='card-img' src={Approved}/>
      <div className='card-text-label'> Đăng ký thành công</div>
      <div className='info-row' style={{textAlign:"center"}}>Giờ đây bạn có thể quản lí doanh nghiệp của riêng bạn <a className='contact-text'>Trở thành hội viên VARS để hưởng nhiều quyền lợi và ưu đãi hơn</a> </div>
      <div className="padding-line" style={{margin:"15px auto", height:"1px"}}></div>
      <Button type='primary' className='sign-btn' onClick={() => navigate(ENTERPRISE_MEMBER_SIGNUP_ROUTE)}>
        <IntlMessages id='common.signupNow' />
      </Button>
    </div>,
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

  const [infomationHTML,setInfomationHTML] = useState()
  const [listBusinessLicence,setListBusinessLicence] = useState();
  const [listCardId,setListCardId] = useState();
  const [businessLicenceHTML,setBusinessLicenceHTML] = useState([]);
  const [cardIdHTML, setCardIdHTML] = useState([]);

  useEffect(() => {
    dispatch(onGetEnterpriseList());
  }, []);

  useEffect(() => {
    if(enrollEnterprise) {
      if(enrollEnterprise.isFirstEnroll != 0)  {
        setInfomationHTML(listInfomation[3]);
      }
      else setInfomationHTML(listInfomation[0]); 
    }
  }, [enrollEnterprise]);
  

  useEffect(() => {
    if(enterpriseInfo) {
      let listFiles = enterpriseInfo.registerAttachments;
      setListBusinessLicence(listFiles.filter(listFiles => listFiles.type == 1));
      setListCardId(listFiles.filter(listFiles => listFiles.type == 2));
      setFooterContentHTML(footerContent[enterpriseInfo.registerStatus-1]);
      if(enterpriseInfo.registerStatus == 1) {
        const id = enterpriseInfo.id;
        dispatch(onGetEnrollEnterpriseMember({id}));
      }
      else setInfomationHTML(listInfomation[enterpriseInfo.registerStatus-1]); 
      
    }
  }, [enterpriseInfo]);

  useEffect(() => {
    if(listBusinessLicence){
      let list = [];
      for(let i = 0; i < listBusinessLicence.length; i++) {
        let filename = listBusinessLicence[i].fileName;
        let srcImg = getExtensionFile(filename);
        list = [...list, 
        <div className='file-list' key={i+1}>
          <div >
            <img src={srcImg} className='extension-icon'/>
            {listBusinessLicence[i].fileName} 
            <img src={DoneIco}/>
          </div>
        </div>]
      }
      setBusinessLicenceHTML(list);
    }
  }, [listBusinessLicence]);

  useEffect(() => {
    if(listCardId){
      let list = [];
      for(let i = 0; i < listCardId.length; i++) {
        let filename = listCardId[i].fileName;
        let srcImg = getExtensionFile(filename);
        list = [...list, 
        <div className='file-list-right' key={listCardId.length + i}>
          <div >
            <img src={srcImg} className='extension-icon'/>
            {listCardId[i].fileName + " "} <img src={DoneIco}/>  
          </div>
        </div>]
      }
      setCardIdHTML(list);
    }
  }, [listCardId]);


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
        {infomationHTML}
        <div className='enterprise-form'>
          <div className='enterprise-text-label'>Thông tin doanh nghiệp </div>
          <Form
            form={form}
            className='sign-form'
            name='basic'
            layout='vertical'
            initialValues={{
            }}>
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

        <div className='enterprise-form'>
          <div className='enterprise-text-label'>Hồ sơ đính kèm </div>
          <div className='attach-list'>
            <div className='attach-list-column'>
              <div className='text-bold'>Giấy phép đăng ký kinh doanh <a className='star'>*</a> </div>
                {businessLicenceHTML}
            </div>
            <div style={{margin:"10px"}}></div>
            <div className='attach-list-column'>
              <div className='text-bold'>CCCD/CMND/Hộ chiếu chủ doanh nghiệp <a className='star'>*</a></div>
              {cardIdHTML}
            </div>
            <div className='file-list'>
            </div>
          </div>
        </div>
      </div>
      {footerContentHTML}
    </div>
  );
};

export default memo(Success);

Success.propTypes = {};

Success.defaultProps = {};


