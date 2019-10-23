import { connect } from 'react-redux';
import OrganizationsTree from './organizations_tree'
import { getViewState } from '../../states';
import { makeNewID } from '../index';

function makeMapStateToProps() {
    return (state: any, ownProps: any) => {
        ownProps.id = ownProps.id || makeNewID(ownProps)
        let entityState = getViewState(state, ownProps.id) || {}
        return Object.assign({}, entityState, {...entityState, ...ownProps});
    };
}

export default connect(makeMapStateToProps)(OrganizationsTree);