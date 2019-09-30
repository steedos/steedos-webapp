
import { connect } from 'react-redux';
import { createAction, loadEntitiesData } from '../../actions/views/tree'
import { getEntityState } from '../../states/entitys'
import SteedosTree from './salesforce_tree';

function mapStateToProps() {
  return (state: any, ownProps: any) => {
    let entityState = getEntityState(state, ownProps.objectName) || {}
    return entityState;
  };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return ({
    onExpandClick: (event: any, data: any) => dispatch(createAction('expandClick', data, ownProps.objectName)),
    onClick: (event: any, data: any) => dispatch(ownProps.onClick(event, data)),
    init: (options: any) => dispatch(ownProps.init(options))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(SteedosTree);