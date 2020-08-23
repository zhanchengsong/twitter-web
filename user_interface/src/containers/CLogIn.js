import {connect} from 'react-redux';
import Login from '../pages/LogIn';
const mapStateToProps = state => {
    return {
        userProfile: state.userProfile,
        JWTToken: state.JWTToken
    }
}
const CLogin = connect(mapStateToProps, null)(Login);
export default CLogin;