import { List } from "antd";
import { Fragment, useEffect, useState } from "react";
import API from 'api/Request';
import { GET_ENTERPRISE_API } from "shared/constants/ApiUrls";
import NotFound from "components/NotFound/notFound";
import { appIntl } from "@crema/utility/helper/Utils";
import EnterpriseItem from "./enterpriseItem";
const Enterprise = () => {
    const { messages } = appIntl();
    const [enterprise, setEnterprise] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        API.get(GET_ENTERPRISE_API, {
            params: {
                ownerOnly: 0
            }
        }).then((data) => {
            setEnterprise(data)
            setIsLoading(false)
        }).catch(() => {
            setIsLoading(false)
        })
    }, [])

    return <Fragment>
        {!isLoading && <List
            grid={{ gutter: 3, column: 3 }}
            dataSource={enterprise}
            renderItem={item => (
                <List.Item key={item.id} >
                    <EnterpriseItem data={item}></EnterpriseItem>
                </List.Item>
            )}
            locale={
                { emptyText: <NotFound message={messages["invites.enterpriseNotFound"]}></NotFound> }
            }
        >
        </List>}
    </Fragment>
}
export default Enterprise;
