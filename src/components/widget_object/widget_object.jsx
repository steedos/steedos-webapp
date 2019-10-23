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
        objectName: PropTypes.string,
        filters: PropTypes.array,
        columns: PropTypes.array,
        illustration: PropTypes.shape({
            heading: PropTypes.string,
            messageBody: PropTypes.string,
            name: PropTypes.string,
            path: PropTypes.string
        }),
        showAllLink: PropTypes.bool
    };

    convertObjectProps(){
        let { label, objectName, filters, columns, showAllLink, illustration } = this.props;
        return {
            label: label,
            objectName: objectName,
            cellListColumns: columns ? columns.map((column)=>{
                if (column.href){
                    column.onClick = function (event, data) {
                        let url = `/app/-/${objectName}/view/${data.id}`;
                        window.location = url;
                    }
                }
                return column;
            }) : [],
            filters,
            illustration,
            showAllLink
        };
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
        let { label, objectName, selectionLabel, cellListColumns, filters, illustration, showAllLink } = this.convertObjectProps();
        let footer;
        if (showAllLink){
            footer = (
                <a href={`/app/-/${objectName}`}>
                    查看全部
                    </a>
            )
        }
        return (
            <Card
                heading={label}
                footer={footer}
            >
                <Grid searchMode="omitFilters"
                    pageSize={5}
                    objectName={objectName}
                    columns={cellListColumns}
                    selectionLabel={selectionLabel}
                    filters={filters}
                    illustration={illustration}
                />
            </Card>
        );
    }
}

export default WidgetObject;