import Canvas from '../components/Canvas';
import {connect} from 'react-redux';
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user && state.user.isLoggedIn
    }
}
const CCanvas = connect(mapStateToProps, null)(Canvas);
export default CCanvas;