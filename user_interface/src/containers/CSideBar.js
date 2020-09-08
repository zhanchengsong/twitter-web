import SideBar from "../components/SideBar";
import {connect} from 'react-redux'
const mapStateToProps = (state) => {
    return {
        username: state.user.userProfile ? state.user.userProfile.userName : null,
        jwtToken: state.user.JWTToken
    }
}
const CSideBar = connect(mapStateToProps, null) (SideBar);
export default CSideBar;
