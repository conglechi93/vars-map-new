
import { appIntl } from '@crema/utility/helper/Utils';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
const ModalConfirm = ({ message, isModalOpen, setIsModalOpen, onOK, onCancel }) => {
    const { messages } = appIntl();
    const handleOk = () => {
        onOK ? onOK() : null;
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        onCancel ? onCancel() : null;
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal
                bodyStyle={{ padding: '10px' }}
                centered
                title={<p className="notification-title">{messages["invites.notification"]}</p>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                {
                    message
                }
            </Modal>
        </>
    );
};
export default ModalConfirm;
ModalConfirm.propTypes = {
    isModalOpen: PropTypes.any,
    setIsModalOpen: PropTypes.func,
    onOK: PropTypes.func,
    onCancel: PropTypes.func,
    message: PropTypes.string,
};

ModalConfirm.defaultProps = {};