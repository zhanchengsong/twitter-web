import {ProfileInfo} from '../components/ProfileInfo';
import {connect} from 'react-redux';
const mapStateToProp = state => {
    return {
        userProfile: state.user.userProfile,
        JWTToken: state.user.JWTToken
    }
}

const CProfileInfo = connect(mapStateToProp, null)(ProfileInfo);
export default CProfileInfo;