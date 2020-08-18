import {NavBar} from '../components/NavBar';
import {connect} from 'react-redux';
const mapStateToProps = (state) => {
    return {
        userProfile: state.userProfile,
        JWTToken: state.JWTToken
    }
}

const CNavBar = connect(mapStateToProps,null)(NavBar);
export default CNavBar;