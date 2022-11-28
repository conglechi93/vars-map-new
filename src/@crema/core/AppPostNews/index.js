import IntlMessages from '../../utility/IntlMessages';
import './index.style.less';
import PostNewsIco from '@assets/icon/postnews.svg';

const styles = {
  lineHeight: "1",
  position: "relative",
  display: "inline-flex",
  fontWeight: "700",
  whiteSpace: "nowrap",
  textAlign: "center",
  border: "1px solid transparent",
  boxShadow: "0 2px 0 rgb(0 0 0 / 2%)",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)",
  userSelect: "none",
  touchAcction: "manipulation",
  height: "33px",
  padding: "7px 13px",
  fontSize: "15px",
  borderRadius: "6px",
  color: "#ffffff",
  borderColor: "#EE0000",
  background: "#EE0000",
}
const AppPostNews = () => {
  return (
    <>
      <button style={styles}>
        <span style={{padding:"0px 0px", lineHeight:'1.2'}}>
        <img src={PostNewsIco} style={{marginRight:"7px"}}/>
        <IntlMessages id="common.postnews"></IntlMessages>
        </span>
      </button>
    </>
  );
};

export default AppPostNews;
