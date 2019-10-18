import * as React from 'react';
import Grid from '../grid'
import PropTypes from 'prop-types';
import _ from 'underscore'
import { Card } from '@salesforce/design-system-react';
import utils from '../../utils'


const userId = utils.getCookie("X-User-Id");
const spaceId = utils.getCookie("X-Space-Id");

class WidgetObject extends React.Component {

    constructor(props) {
        super(props)
    };

    static defaultProps = {
    };

    static propTypes = {
        label: PropTypes.string,
        object_name: PropTypes.string,
        filters: PropTypes.array,
        columns: PropTypes.array
    };

    convertObjectProps(){
        let { label, object_name, filters, columns } = this.props;
        let defaultProps = {
            label: label,
            objectName: object_name,
            cellListColumns: columns ? columns.map((column)=>{
                if (column.href){
                    column.onClick = function (event, data) {
                        let url = `/app/-/${object_name}/view/${data.id}`;
                        window.location = url;
                    }
                }
                return column;
            }) : [],
            filters: filters

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
        let { label, objectName, selectionLabel, cellListColumns, filters } = this.convertObjectProps();
        return (
            <Card
                heading={label}
                footer={
                    <a href={`/app/-/${objectName}`}>
                        查看全部
                    </a>
                }
            >
                <Grid searchMode="omitFilters"
                    pageSize={5}
                    objectName={objectName}
                    columns={cellListColumns}
                    selectionLabel={selectionLabel}
                    filters={filters}
                />
            </Card>
        );
    }
}

export default WidgetObject;