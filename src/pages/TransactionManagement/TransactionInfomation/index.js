import {memo, 
  useEffect,
  useState,
} from 'react';
import { 
  useDispatch, 
  useSelector} from 'react-redux';
import '../index.style.less';
import {Button } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { AppInfoView } from '@crema';
import { 
  onBackFromTransactionPage, 
  onGetTransactionDetail } from 'redux/actions/Transaction';
import { useNavigate } from 'react-router-dom';
import { TRANSACTION_ROUTE } from '../declareRoute';
import { USER_PROFILE_ROUTE } from 'pages/ProfileManagement/declareRoute';
import '../../page.style.less';

const TransactionInfomation = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();

  const { transactionInfo, wallet, transactionDetail } = useSelector(({transaction}) => transaction);
  const [qrCodeUrl, setQrCodeUrl] = useState();
  const [bankName, setBankName] = useState();
  const [bankAccountNumber, setBankAccountNumber] = useState();
  const [expectedAmount, setExpectedAmount] = useState();
  const [transactionCode, setTransactionCode] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if(wallet == null) {
      navigate(TRANSACTION_ROUTE);
    }
  }, []);

  useEffect(() => {
    if(transactionInfo) {
      const bankId = transactionInfo.bankId;
      const exchangeRate = transactionInfo.exchangeRate;
      const expectedAmount = transactionInfo.expectedAmount;
      const expectedVars = transactionInfo.expectedVars;
      const transactionId = transactionInfo.transactionId;
      const walletId = wallet.walletId;
      dispatch(onGetTransactionDetail({ bankId, exchangeRate, expectedAmount, expectedVars, walletId, transactionId }));
    }
  }, [transactionInfo]);

  useEffect(() => {
    if(transactionDetail){
      setQrCodeUrl(transactionDetail.qrCodeUrl);
      setBankName(transactionDetail.bankInfo.bankName);
      setBankAccountNumber(transactionDetail.bankInfo.bankAccountNumber);
      setExpectedAmount(transactionDetail.expectedAmount.toLocaleString() + "  VNĐ");
      setTransactionCode(transactionDetail.transactionCode);
    }
  }, [transactionDetail]);

  const handleBack = (e) => {
    dispatch(onBackFromTransactionPage());
    if(e.target.value == "home") navigate(USER_PROFILE_ROUTE)
    else navigate(TRANSACTION_ROUTE);
  }


  return (
    <div>
      <AppInfoView></AppInfoView>
      <div>
        <AppPageMetadata title={messages['common.rechargeVARS']} />
        <div className='card-confirm'>
          <div className='card-confirm-info'>
            <div className='text-bold' style={{textAlign:'left'}}> Thông tin chuyển khoản </div>
            <div className='bank-info'>
              <div className='info-row'>
                <div className='row-label'>Ngân hàng: </div>
                <div className='row-content-end text-bold'>{bankName}</div>
              </div>
              <div className='info-row'>
                <div className='row-label'>Số tài khoản: </div>
                <div className='row-content-end text-bold'>{bankAccountNumber}</div>
              </div>
              <div className='info-row'>
                <div className='row-label'>Chủ tài khoản nhận: </div>
                <div className='row-content-end text-bold'>Công ty cổ phần công nghệ Resdii</div>
              </div>
              <div className='info-row'>
                <div className='row-label'>Số tiền: </div>
                <div className='row-content-end text-bold'>{expectedAmount} </div>
              </div>
              <div className='info-row'>
                <div className='row-label'>Nội dung giao dịch: </div>
                <div className='row-content-end text-bold'>{transactionCode}</div>
              </div>
            </div>
          </div>
          <div style={{margin:"10px"}}></div>
          <div className='card-confirm-info'>
            <div className='card-confirm-qr'>
              <div className='text-bold'>Mã QR chuyển khoản </div>
              <img className='qr-code' src={qrCodeUrl}/>
            </div>
          </div>
        </div>
        <div className='transaction-form'>
          <div className="transaction-note">
            <div className='contact-note-text'><b>·</b> Vui lòng chuyển đúng nội dung giao dịch để chúng tôi xác nhận thanh toán</div>
            <div className='contact-note-text'><b>·</b> Giao dịch cộng đồng VARS vào số dư tài khoản sẽ được xử lí trong vòng n giờ</div>
            <div className='contact-note-text'><b>·</b> Nếu bạn muốn thay đổi thông tin, vui lòng liên hệ qua email: <a className='contact-text-confirm'>hotrovarland@gmail.com</a></div>
            <div className='contact-note-text'><b>·</b> Hoặc gọi qua số hotline: <a className='contact-text-confirm'>{"0247 15 65 | 0236 256 325"}</a> {" để được hỗ trợ"}</div>
          </div>
        </div>
        <div className='form-btn'>
            <div className='form-btn-field'>
              <Button type='primary'  className='cancle-btn' onClick={handleBack} value="home">
                <IntlMessages id='error.goBackToHome' />
              </Button>
            </div>
            <div className='form-btn-field'>
              <Button type='primary'  className='sign-btn' onClick={handleBack} value="transaction">
                <IntlMessages id='common.continueRecharge' />
              </Button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default memo(TransactionInfomation);

TransactionInfomation.propTypes = {};

TransactionInfomation.defaultProps = {};
