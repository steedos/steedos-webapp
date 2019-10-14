import { connect } from 'react-redux';
import states from '../../states';
import WidgetAppLauncher from './widget_appLauncher'

function mapStateToProps() {
    return (state: any, ownProps: any) => {
        let apps = states.getVisibleApps(state)
        return Object.assign({},{ apps }, { ...ownProps });
    };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return ({
        init: (options: any) => {
        }
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(WidgetAppLauncher);

