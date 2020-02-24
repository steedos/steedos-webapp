import { connect } from 'react-redux';
import Grid from './salesforce_grid'
import { createGridAction, loadGridEntitiesData, removeViewAction } from '../../actions'
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
      handleChanged: (event: any, data: any)=> dispatch(createGridAction('selection', data.selection, ownProps)),
      init: (options: any) => dispatch(loadGridEntitiesData(options)),
      removeViewAction: (viewId: string)=> dispatch(removeViewAction(viewId)),
    });
  }
export default connect(mapStateToProps, mapDispatchToProps)(Grid);