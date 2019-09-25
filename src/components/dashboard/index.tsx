import { connect } from 'react-redux';
import Dashboard from './slds_dashboard'

// export default connect()(Dashboard);

function mapStateToProps() {
    return (state: any, ownProps: any) => {
        return {
            ...state.entities.organizations
        };
    };
}

export default connect(mapStateToProps)(Dashboard);