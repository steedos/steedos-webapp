import { connect } from 'react-redux';
import Dashboard from './slds_dashboard'
// import { createAction, loadEntitiesData } from '../../actions/bootstrap'
import { createAction as createActionBootstrap, loadEntitiesData } from '../../actions/views/dashboard'
import { getEntityState } from '../../states/entitys'
import { createAction as createActionGrid } from '../../actions/views/grid';


const userId = "hPgDcEd9vKQxwndQR";
const spaceId = "Af8eM6mAHo7wMDqD3";

const instance = {
    name: 'instances',
    label: '申请单',
    fields: {
        name: {
            label: '名称',
            cellOnClick: function (event, data) {
                console.log('instance.name click, data is', data);
            }
        },
        modified: {
            label: '修改时间'
        }
    }
}

function mapStateToProps() {
    return (state: any, ownProps: any) => {
        let objectName = "bootstrap"
        let entityState = getEntityState(state, objectName) || {}
        return Object.assign({ bootstrap: entityState }, { ...ownProps });
    };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return ({
        handleChanged: (event: any, data: any) => dispatch(createActionBootstrap('changeSpace', data.spaceId)),
        init: (options: any) => {
            dispatch(loadEntitiesData(options))
        }
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

