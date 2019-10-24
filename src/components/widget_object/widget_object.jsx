import * as React from 'react';
import Grid from '../grid'
import PropTypes from 'prop-types';
import _ from 'underscore'
import { Card } from '@salesforce/design-system-react';
import utils from '../../utils'
import styled from 'styled-components'

const userId = utils.getCookie("X-User-Id");
const spaceId = utils.getCookie("X-Space-Id");

let WidgetObjectContent = styled.div`
    .slds-table{
        thead{
            th{
                &:first-child{
                    .slds-p-horizontal_x-small{
                        padding-left: 1rem;
                    }
                }
            }
        }
        tbody{
            td{
                &:first-child{
                    padding-left: 1rem;
                }
            }
        }
    }
`

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
        width: PropTypes.string,
        illustration: PropTypes.shape({
            heading: PropTypes.string,
            messageBody: PropTypes.string,
            name: PropTypes.string,
            path: PropTypes.string
        }),
        showAllLink: PropTypes.bool,
		noHeader: false,
        unborderedRow: false
    };

    convertObjectProps(){
        let { label, objectName, filters, columns, width, illustration, showAllLink, noHeader, unborderedRow } = this.props;
        return {
            label: label,
            objectName: objectName,
            cellListColumns: columns ? columns.map((column)=>{
                if (column.href){
                    column.onClick = function (event, data) {
                        let url = `/app/-/${objectName}/view/${data.id}`;
                        if (objectName === "instances"){
                            url = `/workflow/space/${spaceId}/inbox/${data.id}`;
                        }
                        if (window.__meteor_runtime_config__)
                            url = window.__meteor_runtime_config__.ROOT_URL_PATH_PREFIX + url;
                        
                        window.location = url;
                    }
                }
                return column;
            }) : [],
            width,
            filters,
            illustration,
            showAllLink,
            noHeader,
            unborderedRow
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
        let { label, objectName, selectionLabel, cellListColumns, width, filters, illustration, showAllLink, noHeader, unborderedRow } = this.convertObjectProps();
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
                <WidgetObjectContent>
                    <Grid searchMode="omitFilters"
                        pageSize={5}
                        objectName={objectName}
                        columns={cellListColumns}
                        width={width}
                        selectionLabel={selectionLabel}
                        filters={filters}
                        illustration={illustration}
                        noHeader={noHeader}
                        unborderedRow={unborderedRow}
                    />
                </WidgetObjectContent>
            </Card>
        );
    }
}

export default WidgetObject;