// import { appIntl } from '@crema/utility/helper/Utils';
import { appIntl } from '@crema/utility/helper/Utils';
import { Button, List, Space } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onGetEmployee } from 'redux/actions/Employee';
import { defaultPageSize } from 'shared/constants/AppConst';
import SearchResultItem from '../component/searchResultItem';
import NotFound from '../../../components/NotFound/notFound';
const EmployeeList = ({ searchData, setIsModalOpen, reloadPage, setReloadPage }) => {
    const { messages } = appIntl();
    const [current, setCurrent] = useState(1);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(10);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { enterpriseInfoAvailable, enterpriseInfo } = useSelector(({ auth }) => auth);
    useEffect(async () => {
        if (enterpriseInfoAvailable) {
            setLoading(true);
            let search = {
                ...searchData,
                page: current
            }
            await getData(search, enterpriseInfo.id);
            setLoading(false);
        }
    }, [enterpriseInfoAvailable, current]);
    useEffect(async () => {
        setCurrent(1);
        setLoading(true);
        await getData(searchData, enterpriseInfo.id);
        setLoading(false);
    }, [enterpriseInfoAvailable, searchData])

    useEffect(async () => {
        if (reloadPage) {
            setLoading(true);
            setCurrent(1);
            let search = {
                ...searchData,
                page: current
            }
            await getData(search, enterpriseInfo.id);
            setLoading(false);
            setReloadPage(false);
        }
    }, [reloadPage]);

    let getData = async (searchData, enterpriseId) => {
        let dataRaw = await dispatch(onGetEmployee({ enterpriseId, searchData }));
        let data = []
        dataRaw?.elements.forEach(ele => {
            let element=ele?.userInfo;
            data.push({
                key: ele?.id,
                status: ele.inviteStatus,
                email: element.email,
                name: element.fullName,
                phone: element.phone,
                id: ele.id,
                avatar: element.avatar
            })
        });
        console.log(total)
        setData(data);
        setTotal(dataRaw.total);
    }
    return <>
        <Space direction='vertical' style={{ width: '100%' }}>
            <div style={{
                textAlign: "end"
            }}>
                <Button type='primary' style={{ color: "#FFFFFF" }} onClick={() => setIsModalOpen(true)}>{messages["employee.add"]}</Button>
            </div>
            <List
                className='employeeList'
                grid={{ gutter: 3, column: 3 }}
                pagination={data.length && {
                    current,
                    pageSize: defaultPageSize,
                    defaultPageSize: defaultPageSize,
                    showSizeChanger: false,
                    total: total,
                    onChange: page => {
                        setCurrent(page);
                    },
                }}
                locale={
                    { emptyText: <NotFound message={messages["employee.employeeNotFound"]}></NotFound> }
                }
                loading={loading}
                dataSource={data}
                renderItem={item => (
                    <List.Item key={item.id} >
                        <SearchResultItem data={item} listData={data} setListData={setData}></SearchResultItem>
                    </List.Item>
                )}

            />
        </Space>
    </>
}

export default EmployeeList;

EmployeeList.propTypes = {
    searchData: PropTypes.any,
    reloadPage: PropTypes.any,
    setIsModalOpen: PropTypes.func,
    setReloadPage: PropTypes.func,
};

EmployeeList.defaultProps = {};