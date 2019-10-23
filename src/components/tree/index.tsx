
import { connect } from 'react-redux';
import { createAction, loadEntitiesData } from '../../actions/views/tree'
import { entityStateSelector } from '../../selectors';
import SteedosTree from './salesforce_tree';
import { viewStateSelector } from '../../selectors';
import { makeNewID } from '../index';

function mapStateToProps() {
  return (state: any, ownProps: any) => {
    ownProps.id = ownProps.id || makeNewID(ownProps)
    let entityState = viewStateSelector(state, ownProps.id) || {}
    return entityState;
  };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return ({
    onExpandClick: (event: any, data: any) => dispatch(createAction('expandClick', data, ownProps)),
    onClick: (event: any, data: any) => dispatch(ownProps.onClick(event, data)),
    init: (options: any) => dispatch(ownProps.init(options))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(SteedosTree);