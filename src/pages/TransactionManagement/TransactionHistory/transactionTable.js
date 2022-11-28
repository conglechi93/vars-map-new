import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { onGetTransactionList } from 'redux/actions/Transaction';
import { EyeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import TransactionDetail from './transactionDetails';
import { defaultPageSize } from 'shared/constants/AppConst';
import { appIntl } from '@crema/utility/helper/Utils';

const TransactionTable = ({ searchData }) => {
    const { messages } = appIntl()
    const dispatch = useDispatch();
    const { wallet } = useSelector(({transaction}) => transaction);
    const [current, setCurrent] = useState(1);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactionId, setTransactionId] = useState(null);
    const columns = [
        {
            title: messages["transaction.transactionCode"],
            dataIndex: 'transactionCode',
            key: 'transactionCode',
            align: 'center',
            render: (text) => <div style={{ textAlign: 'left', fontSize: "14px", fontFamily: 'Roboto',  }}>{text}</div>
        },
        {
            title: messages["transaction.transactionType"],
            dataIndex: 'transactionType',
            key: 'transactionType',
            align: 'center',
            render: (text) => <div style={{ textAlign: 'left', fontSize: "14px", fontFamily: 'Roboto', }}>{text}</div>
        },
        {
            title: messages["transaction.expectedVars"],
            dataIndex: 'expectedVars',
            key: 'expectedVars',
            align: 'center',
            render: (text) => {
                return <div style={{ textAlign: 'center', fontSize: "14px", fontFamily: 'Roboto' }}>{text?.toLocaleString("de-DE")}</div>
            }
        },
        {
            title: messages["transaction.actualAmount"],
            dataIndex: 'actualAmount',
            key: 'actualAmount',
            align: 'center',
            render: (text) => {
                return <div style={{ textAlign: 'center', fontSize: "14px", fontFamily: 'Roboto' }}>{text?.toLocaleString("de-DE")}</div>
            }
        },
        {
            title: messages["transaction.transactionDate"],
            dataIndex: 'transactionDate',
            key: 'transactionDate',
            align: 'center',
            render: (text) => {
                return <div style={{ textAlign: 'left', fontSize: "14px", fontFamily: 'Roboto', minHeight: '50px', marginTop:'20px' }}>{text?.toLocaleString("de-DE")}</div>
            }
        },
        {
            title: messages["transaction.status"],
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (tags) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.color.replace("0x", '#');
                        return (
                            <Tag color={color} key={tag.name} style={{width:"100%"}}>
                                {tag.name}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: messages["transaction.action"],
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size='middle'>
                    <Popover content={"Xem chi tiết"} >
                        <EyeOutlined onClick={() => { setIsModalOpen(true); setTransactionId(record.key) }} onMouseEnter={() => { }} />
                    </Popover>
                </Space>
            ),
        },
    ];

    useEffect(async () => {
        let walletId = wallet ? wallet.walletId : null;
        if (walletId) {
            await getData(current, searchData, walletId)
        }
    }, [wallet, current]);
    useEffect(async () => {
        let walletId = wallet ? wallet.walletId : null;
        if (walletId) {
            setCurrent(1);
            await getData(searchData?.page, searchData, walletId);

        }
    }, [wallet, searchData])

    let getData = async (page, searchData, walletId) => {
        let dataRaw = await dispatch(onGetTransactionList({ page: page, pageSize: searchData?.pageSize, fromDate: searchData?.fromDate, toDate: searchData?.toDate, type: searchData?.transactionType, status: searchData?.transactionStatus, walletId }));
        let data = []
        dataRaw?.elements.forEach(element => {
            data.push({
                key: element.transactionId,
                transactionCode: element.transactionCode,
                transactionType: element.transactionType.name,
                expectedVars: element.expectedVars,
                transactionDate: element.transactionDate,
                actualAmount: element.actualAmount,
                status: [element.status],
            })
        });
        setData(data);
        setTotal(dataRaw.total)
    }

    let locale = {
        emptyText: 'Không tìm thấy kết quả tìm kiếm phù hợp',
    };
    return (
        <>
            <Space direction='vertical' style={{ width: '100%' }}>
                <Table
                    style={{ textAlign: 'left', fontSize: "12px", fontFamily: 'Sarabun' }}
                    bordered
                    locale={locale}
                    columns={columns}
                    dataSource={data}
                    pagination={{ current, defaultPageSize: defaultPageSize, showSizeChanger: false, total: total }}
                    onChange={(page, _) => { setCurrent(page.current); }} />
            </Space>
            {
                transactionId ?
                    <TransactionDetail isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} transactionId={transactionId} walletId={wallet?.walletId}></TransactionDetail>
                    : null
            }
        </>


    );
};

export default TransactionTable;

TransactionTable.propTypes = {
    searchData: PropTypes.any
};

TransactionTable.defaultProps = {};