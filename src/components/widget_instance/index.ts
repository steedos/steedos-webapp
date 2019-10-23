import { connect } from 'react-redux';
import WidgetInstance from './widget_instance'
// import { createAction, loadEntitiesData } from '../../actions/bootstrap'
import { createAction } from '../../actions/views/dashboard'
import { entityStateSelector } from '../../selectors';
import { createAction as createActionGrid } from '../../actions/views/grid';

function mapStateToProps() {
    return (state: any, ownProps: any) => {
        return Object.assign({ }, { ...ownProps });
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
export default connect(mapStateToProps, mapDispatchToProps)(WidgetInstance);

