import {connect} from 'react-redux';
import Notifications from "../components/Notifications";
const mapStateToProps = (state) => {
    return {
        username: state.user.userProfile.userName,
        jwtToken: state.user.JWTToken
    }
}
const CNotifications = connect(mapStateToProps, null) (Notifications);
export default CNotifications;