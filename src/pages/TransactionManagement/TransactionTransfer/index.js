import TransferForm from './TransferForm';
import ConfirmPassword from './ConfirmPassword';
import TransferSuccess from './TransferSuccess';
import TransferInfo from './TransferInfo';
const TransferFormPage = () => {
  return (
    <TransferForm/>
  );
};

const ConfirmPasswordPage = () => {
  return (
    <ConfirmPassword/>
  )
}

const TransferSuccessPage = () => {
  return (
    <TransferSuccess/>
  )
}

const TransferInfoPage = () => {
  return (
    <TransferInfo/>
  )
}

export {TransferFormPage, ConfirmPasswordPage, TransferSuccessPage, TransferInfoPage};