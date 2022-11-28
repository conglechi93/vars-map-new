import { Box } from "@mui/material";
import { Image } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetBalanceWallet } from "redux/actions/Transaction";
import balanceIcon from '@assets/wallet/balanceIcon.svg';
const BalanceWallet = () => {
    const {  wallet } = useSelector(({transaction}) => transaction);
    const dispatch = useDispatch();
    useEffect(() => {
        if (wallet && wallet.id) {
            let wallet = wallet.id
            dispatch(onGetBalanceWallet({ wallet }));
        }
    }, [])
    return <Box
        sx={{
            background: "#FFFFFF",
            borderRadius: "10px",
            height: "100px",
            textAlign: 'center',
            padding: '10px'
        }}
    >
        <Box>
            <Image src={balanceIcon}></Image>
        </Box>
        <Box> Số dư ví</Box>
        <Box style={{
            color: "#1B2FE1",
            fontWeight: 700,
            fontSize: "20px"
        }}>
            {
                wallet ? wallet.balance.toLocaleString("de-DE")+ " VARS" : 0
            }
        </Box>
    </Box >

}
export default BalanceWallet;