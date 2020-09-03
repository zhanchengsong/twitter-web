import Main from '../pages/Main';
import {connect} from 'react-redux';
const mapStateToProps = (state) => {
    return {
        username: state.user.userProfile ? state.user.userProfile.userName : null
    }
}
const CMain = connect(mapStateToProps, null)(Main);
export default CMain;
