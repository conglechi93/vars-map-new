import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { appIntl } from '@crema/utility/helper/Utils';
import { onDeletePost, onGetListPost } from 'redux/actions/Post';
import { Popover, Space, Table, Tag } from 'antd';
import { defaultPageSize } from 'shared/constants/AppConst';
import { DeleteOutlined, EditOutlined, EyeOutlined, PhoneOutlined, PlayCircleOutlined } from '@ant-design/icons';

const PostList = ({ searchData }) => {
    const { messages } = appIntl()
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(1);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(10);

    useEffect(async () => {
        await getData(current, searchData);
    }, [current]);

    useEffect(async () => {
        setCurrent(1);
        await getData(searchData?.page, searchData);
    }, [searchData])

    const columns = [
        {
            title: 'TT',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: messages["post.postCode"],
            dataIndex: 'postCode',
            key: 'postCode',
            align: 'center',
            render: (text) => <div style={{ textAlign: 'left', fontSize: "12px", fontFamily: 'Sarabun' }}>{text}</div>
        },
        {
            title: messages["post.thumbnailUrl"],
            dataIndex: 'thumbnailUrl',
            key: 'thumbnailUrl',
            align: 'center',
            render: (text) => <img
                style={{ height: "150px", width: "200px" }}
                src={text}
                onError={event => {
                    event.target.src = "https://trendsetter.com/media/catalog/product/placeholder/default/no_image_placeholder.jpg"
                    event.onerror = null
                }}
            >
            </img>
        },
        {
            title: messages["post.title"],
            dataIndex: 'title',
            key: 'title',
            align: 'center',
            render: (text) => {
                return <div style={{ textAlign: 'center', fontSize: "12px", fontFamily: 'Sarabun' }}>{text?.toLocaleString("de-DE")}</div>
            }
        },
        {
            title: messages["post.position"],
            dataIndex: 'position',
            key: 'position',
            align: 'center',
            render: (text) => {
                return <div style={{ textAlign: 'center', fontSize: "12px", fontFamily: 'Sarabun' }}>{text?.toLocaleString("de-DE")}</div>
            }
        },
        {
            title: messages["post.timeRange"],
            dataIndex: 'timeRange',
            key: 'timeRange',
            align: 'center',
            render: (text) => {
                return <div style={{ textAlign: 'center', fontSize: "12px", fontFamily: 'Sarabun' }}>{text?.toLocaleString("de-DE")}</div>
            }
        },

        {
            title: messages["post.status"],
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (status) => (
                <>
                    {status.map((tag) => {
                        let color = "#" + tag.color
                        return (
                            <Tag color={color} key={tag.name} >
                                {tag.name}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: messages["post.statistical"],
            dataIndex: 'statistical',
            key: 'statistical',
            align: 'center',
            render: (data) => {
                return <div>
                    <div>
                        <EyeOutlined onMouseEnter={() => { }}></EyeOutlined>
                        {data.viewCount ? data.viewCount : 0}
                    </div>
                    <div>
                        <PlayCircleOutlined onMouseEnter={() => { }}></PlayCircleOutlined>
                        {data.clickCount ? data.clickCount : 0}
                    </div>
                    <div>
                        <PhoneOutlined  onMouseEnter={() => { }}></PhoneOutlined>
                        {data.callCount ? data.callCount : 0}
                    </div>
                </div>
            }
        },
        {
            title: messages["post.action"],
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size='middle'>
                    <Popover content={"Xem chi tiết"} >
                        <EyeOutlined onClick={() => {}} onMouseEnter={() => { }} />
                    </Popover>
                    <Popover content={"Chỉnh sửa"} >
                        <EditOutlined onClick={() => { }} onMouseEnter={() => { }} />
                    </Popover>
                    <Popover content={"Xóa"} >
                        <DeleteOutlined onClick={() =>dispatch(onDeletePost(record.key))} onMouseEnter={() => { }} />
                    </Popover>
                </Space>
            ),
        },
    ];
    let getData = async (page, searchData) => {
        let dataRaw = await dispatch(onGetListPost({ page: page, pageSize: searchData?.pageSize, fromDate: searchData?.fromDate, toDate: searchData?.toDate, type: searchData?.type, subType: searchData?.subType, status: searchData?.status }));
        let data = []
        dataRaw?.elements.forEach(element => {
            data.push({
                key: element.id,
                position:( (element.district.name!=null && element.district.name!="")?element.district.name: "")  + (( element.district.name!=null&&  element.province.name!=null&& element.district.name!="" &&  element.province.name!="")?  ",": "" ) + ( element.province.name!=null && element.province.name!=""?element.province.name: ""),
                thumbnailUrl: element.thumbnailUrl,
                timeRange: (element.startDate ? element.startDate : "") + (element.endDate ? ("-" + element.endDate) : ""),
                postCode: element.code,
                status: [element.status],
                statistical: { viewCount: element.viewCount, clickCount: element.clickCount, callCount: element.callCount },
                title: element.title
            })
        });
        console.log(data)
        setData(data);
        setTotal(dataRaw.total);
    }
    let locale = {
        emptyText: 'Không tìm thấy kết quả tìm kiếm phù hợp',
    };
    return (
        data && <Space direction='vertical' style={{ width: '100%' }}>
            <Table
                style={{ textAlign: 'left', fontSize: "12px", fontFamily: 'Sarabun' }}
                bordered
                locale={locale}
                columns={columns}
                dataSource={data}
                pagination={{ current, defaultPageSize: defaultPageSize, showSizeChanger: false, total: total }}
                onChange={(page, _) => { setCurrent(page.current); }} />
        </Space>
    );
};

export default PostList;

PostList.propTypes = {
    searchData: PropTypes.any
};

PostList.defaultProps = {};