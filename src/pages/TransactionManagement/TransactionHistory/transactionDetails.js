import { Image, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from 'api/Request';
import { REQUEST_MUTED } from '@api/RequestEnum';
import { GET_TRANSACTION_DETAIL } from 'shared/constants/ApiUrls';
import { Box, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { CopyOutlined } from '@ant-design/icons';
import { SHOW_MESSAGE } from 'shared/constants/ActionTypes';
import { appIntl } from '@crema/utility/helper/Utils';
const DataView = ({ title, data }) => {
    return <Grid container>
        <Grid item xs={4}>{title}</Grid>
        <Grid item xs={8} style={{ textAlign: 'right' }}>{data}</Grid>
    </Grid>
}
DataView.propTypes = {
    title: PropTypes.any,
    data: PropTypes.any
};

DataView.defaultProps = {};

const TransactionDetail = ({ isModalOpen, setIsModalOpen, walletId, transactionId }) => {
    const { profile } = useSelector(({ auth }) => auth);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const { messages } = appIntl();
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    useEffect(() => {
        console.log(data);
        if (transactionId != null && walletId != null) {
            API.get(GET_TRANSACTION_DETAIL.replace("{walletId}", walletId) + transactionId, { REQUEST_MUTED })
                .then((data) => {
                    setData(data);
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    }, [transactionId])
    return (
        <>
            <Modal title={messages["transaction.transactionDetails"]} open={isModalOpen} footer={null} onCancel={handleCancel} >
                {
                    data?.transactionType && <Box style={{ textAlign: 'center' }} >
                        <Image
                            width={100}
                            src={data.transactionType.iconUrl}
                        >
                        </Image>
                    </Box>
                }
                <Box style={{
                    border: "1px dashed rgba(238, 12, 12, 0.2)",
                    borderRadius: "8px",
                    padding: "28px"
                }}>
                    <Grid container>
                        <Grid item xs={4}>{messages["transaction.transactionCode"]}</Grid>
                        <Grid item xs={8} style={{ textAlign: 'right' }}>
                            <CopyOutlined onClick={() => {
                                navigator.clipboard.writeText(data?.transactionCode);
                                dispatch({ type: SHOW_MESSAGE, payload: messages['common.coppySuccess'] })
                            }} />
                            {data?.transactionCode}
                        </Grid>
                    </Grid>
                    <DataView title={messages["transaction.transactionType"]} data={data?.transactionType.name}></DataView>
                    <Divider></Divider>
                    {
                        data?.transactionType.code == "1" && <Box >
                            <DataView title={messages["transaction.bankAccountName"]} data={data?.bankInfo.bankAccountName}></DataView>
                            <DataView title={messages["transaction.accountNumber"]} data={data?.bankInfo.bankAccountNumber}></DataView>
                            <DataView title={messages["transaction.transactionContent"]} data={data?.transactionContent}></DataView>
                            <DataView title={messages["transaction.experted"]} data={data?.expectedAmount}></DataView>
                            <DataView title={messages["transaction.actual"]} data={data?.actualAmount}></DataView>
                            <DataView title={messages["transaction.bankName"]} data={data?.bankInfo.bankName}></DataView>
                        </Box>
                    }
                    {
                        data?.transactionType.code == "2" && <Box>
                            <DataView title={messages["transaction.bankAccountName"]} data={profile?.fullName}></DataView>
                            <DataView title={messages["transaction.phoneNumber"]} data={profile?.username}></DataView>
                        </Box>
                    }
                </Box>
                {
                    data?.transactionType.code == "1" &&
                    data?.bankTransferTransList.map(function (object, i) {
                        return <Box key={i} style={{
                            border: "1px dashed rgba(238, 12, 12, 0.2)",
                            borderRadius: "8px",
                            padding: "28px"
                        }}>
                            <Box>Thông tin thanh toán</Box>
                            <DataView title={messages["transaction.accountNumber"]} data={object?.destAccountNumber}></DataView>
                            <DataView title={messages["transaction.destBankName"]} data={object?.destBankName}></DataView>
                            <DataView title={messages["transaction.money"]} data={object?.money}></DataView>
                            <DataView title={messages["transaction.transactionDate"]} data={object?.transactionDate}></DataView>
                        </Box>
                    })}
                {
                    data?.transactionType.code == "2" &&
                    <Box style={{
                        border: "1px dashed rgba(238, 12, 12, 0.2)",
                        borderRadius: "8px",
                        padding: "28px"
                    }}>
                        <DataView title={messages["transaction.destAccountName"]} data={data?.destAccountName}></DataView>
                        <DataView title={messages["transaction.phoneNumber"]} data={data?.destAccountPhone}></DataView>
                        <DataView title={messages["transaction.status"]} data={data?.status.name}></DataView>
                        <DataView title={messages["transaction.actualVars"]} data={data?.actualVars}></DataView>
                        <DataView title={messages["transaction.fee"]} data={data?.fee}></DataView>
                        <DataView title={messages["transaction.transactionContent"]} data={data?.transactionContent}></DataView>
                        <DataView title={messages["transaction.transactionDate"]} data={data?.transactionDate}></DataView>
                    </Box>
                }
            </Modal>
        </>
    );
};
export default TransactionDetail;


TransactionDetail.propTypes = {
    isModalOpen: PropTypes.any,
    setIsModalOpen: PropTypes.func,
    walletId: PropTypes.any,
    transactionId: PropTypes.any
};

TransactionDetail.defaultProps = {};