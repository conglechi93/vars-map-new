import { Divider, Grid, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import '../index.style.less';
import BathtubIcon from '@mui/icons-material/Bathtub';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import KingBedIcon from '@mui/icons-material/KingBed';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import { Tag } from 'antd';
const Post = ({ data }) => {
    return <Paper style={{
        boxShadow: "0px 0px 8px rgba(17, 16, 16, 0.16)",
        borderRadius: "12px",
        width: '100%',
        height: 'auto'
    }}>
        <Grid container style={{}}>
            <Grid item xs={5} style={{ padding: "5px" }}>
                <img alt="" src={data.thumbnailUrl} style={{
                    maxWidth: "100%",
                    height: "auto",
                    aspectRatio: "4/3",
                    borderRadius: "12px",
                    objectFit: "cover"
                }}
                    onError={event => {
                        event.target.src = "http://192.168.1.26:9000/varsland/s1/media/z3384665382392_68d0244afd8a1585d0fd97142b8eb786.jpg"
                        event.onerror = null
                    }} />
            </Grid>
            <Grid item xs={7} style={{ padding: "5px" }}>

                <Grid container>
                    <Grid xs={4}>
                        <span className='price breakText'>{data.price ? (data.price + data.priceUnit.name) : ""}</span>
                    </Grid>
                    <Grid xs={8} style={{ textAlign: 'right' }}>
                        {data.province.name}
                    </Grid>
                </Grid>
                <div>
                    <span className='breakText title'>{data.title}</span>
                </div>
                <Grid container>
                    <Grid container>
                        <Grid xs={6} style={{ display: 'inline-flex' }}>
                            <CropSquareIcon className='additionalData'></CropSquareIcon>
                            <span className='breakText additionalData'>{data.square}</span>
                        </Grid>
                        <Grid xs={6} style={{ display: 'inline-flex' }}>
                            <NorthWestIcon className='additionalData'></NorthWestIcon>
                            <span className='breakText additionalData'>{data.direction}</span>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid xs={6} style={{ display: 'inline-flex' }}>
                            <BathtubIcon className='additionalData'></BathtubIcon>
                            <span className='breakText additionalData'>{data.bathroom}</span>
                        </Grid>
                        <Grid xs={6} style={{ display: 'inline-flex' }}>
                            <KingBedIcon className='additionalData'></KingBedIcon>
                            <span className='breakText additionalData'>{data.bedroom}</span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Divider style={{ marginTop: "10px", marginBottom: "10px" }}></Divider>
        <Grid container style={{ marginTop: "auto" }}>
            <Grid item xs={4}>
                <span className='breakText additionalData'>{data.bathroom}</span>
            </Grid>
            <Grid item xs={8} style={{ textAlign: 'right' }}>
                <Tag color={'red'} key={data.typeRealEstate.name} >
                    {data.typeRealEstate.name}
                </Tag>
            </Grid>
        </Grid>
    </Paper >
}
export default Post;
Post.propTypes = {
    data: PropTypes.any
};

Post.defaultProps = {};