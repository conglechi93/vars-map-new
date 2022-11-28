// import { appIntl } from '@crema/utility/helper/Utils';
import {  List, Space } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  onSearchEmployee } from 'redux/actions/Employee';
import AddItem from '../component/addItem';
const ListResult = ({ searchData }) => {
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);
    const dispatch = useDispatch();
    const { enterpriseInfoAvailable, enterpriseInfo } = useSelector(({ auth }) => auth);   
    useEffect(async () => {
        setData([])
        if (enterpriseInfoAvailable && searchData.phone != null) {
            await getData(searchData, enterpriseInfo.id);
        }
    }, [enterpriseInfoAvailable, searchData])

    useEffect(async () => {
        if (reload) {
            await getData(searchData, enterpriseInfo.id);
            setReload(false);
        }
    }, [reload])

    let getData = async (searchData, enterpriseId) => {
        let data = await dispatch(onSearchEmployee({ enterpriseId, searchData }));
        let dataResult = []
        data.key=data.userInfo.id
        dataResult.push(data);
        console.log(dataResult)
        setData(dataResult);
    }

    return <>
        <Space direction='vertical' style={{ width: '100%' }}>
            <List
                className='employeeList'
                dataSource={data}
                renderItem={item => (
                    <List.Item key={item?.id} >
                        <AddItem data={item} setReload={setReload}></AddItem>
                    </List.Item>
                )}
            />
        </Space>
    </>
}

export default ListResult;

ListResult.propTypes = {
    searchData: PropTypes.any
};

ListResult.defaultProps = {};