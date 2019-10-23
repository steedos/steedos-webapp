import { connect } from 'react-redux';
import Dashboard from './bootstrap'
import { createAction, loadEntitiesData } from '../../actions/views/bootstrap'
import { entityStateSelector } from '../../selectors';


function mapStateToProps() {
    return (state: any, ownProps: any) => {
        let space = entityStateSelector(state, "space") || null;
        return Object.assign({ isBootstrapLoaded: !!space }, { ...ownProps });
    };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return ({
        // handleChanged: (event: any, data: any) => dispatch(createActionBootstrap('changeSpace', data.spaceId)),
        loadBootstrap: (options: any) => {
            dispatch(loadEntitiesData(options))
        }
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

