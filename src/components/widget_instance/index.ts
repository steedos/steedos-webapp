import { connect } from 'react-redux';
import WidgetInstance from './widget_instance'

function mapStateToProps() {
    return (state: any, ownProps: any) => {
        return Object.assign({ }, { ...ownProps });
    };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return ({
        init: (options: any) => {
            // dispatch(loadEntitiesData(options))
        }
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(WidgetInstance);

