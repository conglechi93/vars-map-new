import { Grid, Paper } from '@mui/material';
import { Avatar, Image } from 'antd';
import PropTypes from 'prop-types';
import '../index.style.less';
const EnterpriseItem = ({ data }) => {

    return <Paper style={{
        boxShadow: "0px 0px 8px rgba(17, 16, 16, 0.16)",
        borderRadius: "12px",
        width: '100%',
    }}>
        <Grid container>
            <Grid xs={4}>
                <Avatar style={{ margin: '10px' }} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={<Image src={data?.avatar}
                    style={{ width: 100, height: 100 }} onError={(e) => {
                        e.target.src = "https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg"
                        e.onerror = null
                    }
                    } />} />
            </Grid>
            <Grid xs={8} >
                <div style={{ marginTop: '10px', alignSelf: "center" }}>
                    <div>
                        {data?.name}
                    </div>
                    <div>
                        {data?.phone}
                    </div>
                    <div>
                        {data?.email}
                    </div>
                </div>
            </Grid>

        </Grid>
    </Paper >
}
export default EnterpriseItem;
EnterpriseItem.propTypes = {
    data: PropTypes.any,
    handleOk: PropTypes.func,
    handleReject: PropTypes.func
};

EnterpriseItem.defaultProps = {};