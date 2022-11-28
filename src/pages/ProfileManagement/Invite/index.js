import {  Tabs } from "antd";
import { Fragment } from "react";
import InviteManagement from "./invite";
import { appIntl } from "@crema/utility/helper/Utils";
import Enterprise from "./enterprise";
const Invite = () => {
    const {messages}=appIntl();
    return <Fragment>
        <Tabs defaultActiveKey="1" destroyInactiveTabPane type="card">
            <Tabs.TabPane tab={messages["invites.confirmInvite"]} key="1" >
                <InviteManagement></InviteManagement>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Doanh nghiệp đã tham gia" key="2" >
                <Enterprise></Enterprise>
            </Tabs.TabPane>

        </Tabs>
    </Fragment>
}
export default Invite;
