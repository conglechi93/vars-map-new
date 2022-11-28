import { Grid, Paper } from '@mui/material';
import { Avatar, Button, Image } from 'antd';
import PropTypes from 'prop-types';
import '../index.style.less';
const InviteItem = ({ data, handleOk, handleReject }) => {
   
    return <Paper style={{
        boxShadow: "0px 0px 8px rgba(17, 16, 16, 0.16)",
        borderRadius: "12px",
        width: '100%',
    }}>
        <Grid container>
            <Grid xs={4}>
                <Avatar style={{ margin: '10px' }} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={<Image src={data?.enterpriseInfo.avatar}
                    style={{ width: 100, height: 100 }} onError={(e) => {
                        e.target.src = "https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg"
                        e.onerror = null
                    }
                    } />} />
            </Grid>
            <Grid xs={8} >
                <div style={{ marginTop: '10px', alignSelf: "center" }}>
                    <div>
                        {data?.enterpriseInfo.shortName}
                    </div>
                    <div>
                        {data?.enterpriseInfo.phone}
                    </div>
                    <div>
                        {data?.enterpriseInfo.email}
                    </div>
                </div>
                <Grid item container xs={12}>
                    <Grid item xs={6}>
                        <Button onClick={()=>handleReject(data)}>Từ chối</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={()=>handleOk(data)}>Đồng ý</Button>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    </Paper >
}
export default InviteItem;
InviteItem.propTypes = {
    data: PropTypes.any,
    handleOk: PropTypes.func,
    handleReject: PropTypes.func
};

InviteItem.defaultProps = {};