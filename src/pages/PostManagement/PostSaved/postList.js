import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { onGetListPost } from 'redux/actions/Post';
import { List, Space } from 'antd';
import Post from './displayPost';
import { defaultPageSize } from 'shared/constants/AppConst';

const PostList = ({ searchData }) => {
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
    let getData = async (page, searchData) => {
        let dataRaw = await dispatch(onGetListPost({ page: page, pageSize: searchData?.pageSize, fromDate: searchData?.fromDate, toDate: searchData?.toDate, type: searchData?.type, subType: searchData?.subType, status: searchData?.status }));
        let data = []
        dataRaw?.elements.forEach(element => {
            data.push({
                ...element
            })
        });
        setData(data);
        setTotal(dataRaw.total);
    }
    return (

        data && <Space direction='vertical'>
            <List
                className='listSavedPost'
                grid={{ gutter: 4, column: 4 }}
                pagination={{
                    current,
                    defaultPageSize: defaultPageSize,
                    showSizeChanger: false,
                    total: total,
                    onChange: page => {
                        setCurrent(page);
                    },
                }}
                dataSource={data}
                renderItem={item => (
                    <List.Item key={item.id} >
                        <Post data={item}></Post>
                    </List.Item>
                )}

            />
        </Space>
    );
};

export default PostList;

PostList.propTypes = {
    searchData: PropTypes.any
};

PostList.defaultProps = {};