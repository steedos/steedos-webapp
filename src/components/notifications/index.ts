import { connect } from 'react-redux';
import Notifications from './notifications'
import { createNotificationsAction, loadNotificationsData } from '../../actions'
import { viewStateSelector } from '../../selectors';
import { makeNewID } from '../index';

function mapStateToProps() {
    return (state: any, ownProps: any) => {
        ownProps.id = ownProps.id || makeNewID(ownProps)
        let entityState = viewStateSelector(state, ownProps.id) || {}
        return Object.assign({}, entityState, {...entityState, ...ownProps});
    };
  }
  
  const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return ({
      handleChanged: (event: any, data: any)=> dispatch(createNotificationsAction('selection', data.selection, ownProps)),
      init: (options: any) => dispatch(loadNotificationsData(options))
    });
  }
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);