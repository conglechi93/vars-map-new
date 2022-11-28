import {memo, 
  useEffect,
  useState,
} from 'react';
//import { useDispatch } from 'react-redux';
import '../index.style.less';
import {Button } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { AppInfoView } from '@crema';
import { useSelector } from 'react-redux';
import RafikiImg from '@assets/rafiki.svg';
import { useNavigate } from 'react-router-dom';
import { TRANSACTION_TRANSFER_VARS_ROUTE } from '../declareRoute';
import { USER_PROFILE_ROUTE } from 'pages/ProfileManagement/declareRoute';

const TransferSuccess = () => {

  Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  };
  const {messages} = useIntl();
  const navigate = useNavigate();

  const { transferInfo, wallet } = useSelector(({transaction}) => transaction);
  const [actualVars, setActualVars] = useState();
  const [destAccountName, setDestAccountName] = useState();
  const [destAccountPhone, setDestAccountPhone] = useState();
  const [transactionContent, setTransactionContent] = useState('');
  const [fee, setFee] = useState();
  const [transactionDate, setTransactionDate] = useState();
  const [transactionCode, setTransactionCode] = useState();

  useEffect(() => {
    if(wallet == null) {
      navigate(TRANSACTION_TRANSFER_VARS_ROUTE);
    }
  }, []);

  useEffect(() => {
    if(transferInfo) {
      setActualVars(Number(transferInfo.actualVars).format(0, 3, '.', ','));
      setDestAccountName(transferInfo.destAccountName);
      setDestAccountPhone(transferInfo.destAccountPhone);
      setTransactionContent(transferInfo.transactionContent);
      if(transferInfo.fee == 0) setFee("Miễn phí");
      else setFee(transferInfo.fee);
      setTransactionDate(transferInfo.transactionDate);
      setTransactionCode(transferInfo.transactionCode);
    }
  }, [transferInfo]);

  const continueTransfer = () => {
    navigate(TRANSACTION_TRANSFER_VARS_ROUTE);
  }

  const goBackToHome = () => {
    navigate(USER_PROFILE_ROUTE);
  }
  
  return (
    <div style={{marginBottom:"30px"}}>
      <AppInfoView></AppInfoView>
      <div>
        <AppPageMetadata title={messages['route.group.membersVARSManagement']} />
        <div className='transfer-text-label'>Chuyển VARS</div>
        <div className='card-form'>
          <img className='card-img' src={RafikiImg}/>
          <div className='card-text-label'> Chuyển thành công </div>
          <div> Bạn đã chuyển VARS thành công </div>
        </div>
        <div className="padding-line" style={{margin:"15px auto", height:"1px"}}></div>
        <div className='card-form'>
          <div className='card-info'>
            <div className='transfer-text-label'>Thông tin giao dịch</div>
            <div className='card-info-row'>
              <div>Số lượng VARS chuyển </div>
              <div><b>{actualVars} VARS</b></div>
            </div>
            <div className='card-info-row'>
              <div>Tài khoản nhận: </div>
              <div><b>{destAccountName}</b></div>
            </div>
            <div className='card-info-row'>
              <div>Số điện thoại: </div>
              <div><b>{destAccountPhone}</b></div>
            </div>
            <div className='card-info-row'>
              <div>Nội dung: </div>
              <div><b>{transactionContent}</b></div>
            </div>
            <div className='card-info-row'>
              <div>Phí giao dịch </div>
              <div><b>{fee}</b></div>
            </div>
            <div className='card-info-row'>
              <div>Thời gian </div>
              <div><b>{transactionDate}</b></div>
            </div>
            <div className='card-info-row'>
              <div>Mã giao dịch </div>
              <div><b>{transactionCode}</b></div>
            </div>
          </div>
        </div>
      </div>

      
      <div className='form-btn'>
      <div className='form-btn-field'>
          <Button type='primary' className='sign-btn cancle-btn' onClick={goBackToHome}>
            <IntlMessages id='error.goBackToHome' />
          </Button>
        </div>
        <div className='form-btn-field'>
          <Button type='primary' htmlType='submit' className='sign-btn' onClick={continueTransfer}>
            <IntlMessages id='common.continueTransfer' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(TransferSuccess);

TransferSuccess.propTypes = {};

TransferSuccess.defaultProps = {};
