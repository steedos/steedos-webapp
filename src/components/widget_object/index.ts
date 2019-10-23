import { connect } from 'react-redux';
import { viewStateSelector } from '../../selectors';
import WidgetObject from './widget_object'
// import { createAction, loadEntitiesData } from '../../actions/bootstrap'
import { createAction } from '../../actions/views/dashboard'
import { entityStateSelector } from '../../selectors';
import { createAction as createActionGrid } from '../../actions/views/grid';
import { makeNewID } from '../index';

function mapStateToProps() {
    return (state: any, ownProps: any) => {
        ownProps.id = ownProps.id || makeNewID(ownProps)
        let entityState = viewStateSelector(state, ownProps.id) || {};
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

