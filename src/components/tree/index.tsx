
import { connect } from 'react-redux';
import { createAction, loadEntitiesData } from '../../actions/views/tree'
import { getEntityState } from '../../states/entitys'
import SteedosTree from './salesforce_tree';

function mapStateToProps() {
  return (state: any, ownProps: any) => {
    let entityState = getEntityState(state, ownProps.object.name) || {}
    return Object.assign(entityState, { ...ownProps });
  };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return ({
    onExpandClick: (event: any, data: any) => dispatch(createAction('onExpandClick', data, ownProps.object)),
    onClick: (event: any, data: any) => dispatch(ownProps.onClickFunc(event, data)),
    init: (options: any) => dispatch(loadEntitiesData(options))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(SteedosTree);