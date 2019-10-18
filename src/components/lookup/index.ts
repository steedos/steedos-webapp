import { connect } from 'react-redux';
import Lookup from './salesforce_comboboxes'
import { loadEntitiesData } from '../../actions/views/dx_grid'
import states from '../../states'
import { makeNewID } from '../index';

function mapStateToProps() {
    return (state: any, ownProps: any) => {
      ownProps.id = ownProps.id || makeNewID(ownProps)
      let entityState = states.getViewState(state, ownProps.id) || {}
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