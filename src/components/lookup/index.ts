import { connect } from 'react-redux';
import Lookup from './salesforce_comboboxes'
import { loadEntitiesData } from '../../actions/views/dx_grid'
import { getEntityState } from '../../states/entitys'

function mapStateToProps() {
    return (state: any, ownProps: any) => {
      let entityState = getEntityState(state, ownProps.objectName) || {}
      return entityState;
    };
  }
  
  const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return ({
      onSearch: (event: any, data: any)=> dispatch(ownProps.onSearch(event, data)),
      onRequestRemoveSelectedOption: (event: any, data: any)=> dispatch(ownProps.onRequestRemoveSelectedOption(event, data)),
      init: (options: any) => dispatch(loadEntitiesData(options))
    });
  }
export default connect(mapStateToProps, mapDispatchToProps)(Lookup);