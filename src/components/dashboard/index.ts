import { connect } from 'react-redux';
import states from '../../states';
import Dashboard from './slds_dashboard'
// import { createAction, loadEntitiesData } from '../../actions/bootstrap'
import { createAction } from '../../actions/views/dashboard'
import { getEntityState } from '../../states/entitys'
import { createAction as createActionGrid } from '../../actions/views/grid';

function mapStateToProps() {
    return (state: any, ownProps: any) => {
        let apps = states.getVisibleApps(state)
        return Object.assign({ apps }, { ...ownProps });
    };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return ({
        // handleChanged: (event: any, data: any) => dispatch(createActionBootstrap('changeSpace', data.spaceId)),
        init: (options: any) => {
            // dispatch(loadEntitiesData(options))
        }
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

