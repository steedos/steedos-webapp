import { connect } from 'react-redux';
import { getViewState } from '../../states';
import WidgetObject from './widget_object'
// import { createAction, loadEntitiesData } from '../../actions/bootstrap'
import { createAction } from '../../actions/views/dashboard'
import { getEntityState } from '../../states';
import { createAction as createActionGrid } from '../../actions/views/grid';
import { makeNewID } from '../index';

function mapStateToProps() {
    return (state: any, ownProps: any) => {
        ownProps.id = ownProps.id || makeNewID(ownProps)
        let entityState = getViewState(state, ownProps.id) || {};
        return Object.assign({}, entityState, { ...entityState, ...ownProps });
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
export default connect(mapStateToProps, mapDispatchToProps)(WidgetObject);

