import * as React from 'react';
import Grid from '../grid'
import PropTypes from 'prop-types';
import _ from 'underscore'
import { Card } from '@salesforce/design-system-react';
import utils from '../../utils'


const userId = utils.getCookie("X-User-Id");
const spaceId = utils.getCookie("X-Space-Id");

class WidgetInstance extends React.Component {

    constructor(props) {
        super(props)
    };

    static defaultProps = {
    };

    static propTypes = {
        label: PropTypes.string,
        object_name: PropTypes.string,
        filters: PropTypes.array,
        columns: PropTypes.object
    };

    convertObjectProps(){
        let { label, object_name, filters, columns } = this.props;
        let defaultProps = {
            label: "待办事项",
            selectionLabel: 'name',
            cellListColumns: [
                {
                    field: 'name',
                    label: '名称',
                    onClick: function (event, data) {
                        let url = `/workflow/space/${spaceId}/inbox/${data.id}`;
                        window.location = url;
                    }
                }, {
                    field: 'modified',
                    label: '修改时间',
                    type: 'datetime'
                }
            ],
            $select: ['name'],
            filters: [['space', '=', spaceId], [['inbox_users', '=', userId], 'or', ['cc_users', '=', userId]]]

        };
        return defaultProps;
    }

    componentDidMount() {
        const { init } = this.props;
        if (init) {
            init(this.props)
        }
    }

    state = {
    };

    render() {
        // let { label, selectionLabel, cellListColumns, $filter } = this.props;
        let { label, selectionLabel, cellListColumns, filters } = this.convertObjectProps();
        return (
            <Card
                id="InstanceCard"
                heading={label}
                footer={
                    <a href={`/workflow/space/${spaceId}/inbox`}>
                        查看全部
                    </a>
                }
            >
                <Grid searchMode="omitFilters"
                    pageSize={5}
                    objectName="instances"
                    columns={cellListColumns}
                    selectionLabel={selectionLabel}
                    filters={filters}
                />
            </Card>
        );
    }
}

export default WidgetInstance;