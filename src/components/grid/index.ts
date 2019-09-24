import { connect } from 'react-redux';
import Grid from './salesforce_grid'
import { createAction, loadEntitiesData } from '../../actions/views/grid'
import { getEntityState } from '../../states/entitys'
import _ from 'underscore'

function mapStateToProps() {
    return (state: any, ownProps: any) => {
        let objectName = ownProps.objectName
        let entityState = getEntityState(state, objectName) || {}
        let columns = entityState.columns;
        if(ownProps.columns){
          columns = ownProps.columns
        }
        let $select = _.pluck(columns, 'name')
        return Object.assign(entityState, {...entityState, objectName, $select, ...ownProps});
    };
  }
  
  const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return ({
      handleChanged: (event: any, data: any)=> dispatch(createAction('selection', data.selection, ownProps.objectName)),
      init: (options: any) => dispatch(loadEntitiesData(options))
    });
  }
export default connect(mapStateToProps, mapDispatchToProps)(Grid);