import { connect } from 'react-redux';
import OrganizationsTree from './organizations_tree'
import states from '../../states'
import { makeNewID } from '../index';

function makeMapStateToProps() {
    return (state: any, ownProps: any) => {
        ownProps.id = ownProps.id || makeNewID(ownProps)
        let entityState = states.getViewState(state, ownProps.id) || {}
        return Object.assign({}, entityState, {...entityState, ...ownProps});
    };
}

export default connect(makeMapStateToProps)(OrganizationsTree);