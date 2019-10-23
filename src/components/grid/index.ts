import { connect } from 'react-redux';
import Grid from './salesforce_grid'
import { createAction, loadEntitiesData } from '../../actions/views/grid'
import { getViewState } from '../../states';
import { makeNewID } from '../index';

function mapStateToProps() {
    return (state: any, ownProps: any) => {
        ownProps.id = ownProps.id || makeNewID(ownProps)
        let entityState = getViewState(state, ownProps.id) || {}
        return Object.assign({}, entityState, {...entityState, ...ownProps});
    };
  }
  
  const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    // console.log('grid mapDispatchToProps', ownProps);
    return ({
      handleChanged: (event: any, data: any)=> dispatch(createAction('selection', data.selection, ownProps)),
      init: (options: any) => dispatch(loadEntitiesData(options))
    });
  }
export default connect(mapStateToProps, mapDispatchToProps)(Grid);