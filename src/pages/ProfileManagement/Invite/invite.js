import { List } from "antd";
import { Fragment, useEffect, useState } from "react";
import API from 'api/Request';
import { GET_INVITE_LIST } from "shared/constants/ApiUrls";
import InviteItem from "./inviteItem";
import { onHandleInvite } from "redux/actions/Invite";
import { useDispatch } from "react-redux";
import NotFound from "components/NotFound/notFound";
import { appIntl } from "@crema/utility/helper/Utils";
const InviteManagement = () => {
    const { messages } = appIntl();
    const [inviteList, setInviteList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();
    useEffect(() => {
        API.get(GET_INVITE_LIST).then((data) => {
            setInviteList(data)
            setIsLoading(false)
        }).catch(() => {
            setIsLoading(false)
        })
    }, [])
    async function onOk(data) {
        let result = await dispatch(onHandleInvite({ id: data.id, status: 1 }))
        if (result) {
            setInviteList(inviteList.filter(item => item.id != data.id))
        }
    }
    async function onReject(data) {
        let result = await dispatch(onHandleInvite({ id: data.id, status: 0 }))
        if (result) {
            setInviteList(inviteList.filter(item => item.id != data.id))
        }
    }
    return <Fragment>
        {!isLoading && <List
            grid={{ gutter: 3, column: 3 }}
            dataSource={inviteList}
            renderItem={item => (
                <List.Item key={item.id} >
                    <InviteItem data={item} handleOk={onOk}
                        handleReject={onReject}></InviteItem>
                </List.Item>
            )}
            locale={
                { emptyText: <NotFound message={messages["invites.notFound"]}></NotFound> }
            }
        >
        </List>}
    </Fragment>
}
export default InviteManagement;
