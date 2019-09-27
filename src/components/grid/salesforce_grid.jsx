import React from 'react';
import _ from 'underscore';
import { DataTable, DataTableColumn, DataTableCell } from '@salesforce/design-system-react';
import Lookup from '../lookup'
import { createAction } from '../../actions/views/grid'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import moment from 'moment'

let Counter = styled.div`
	height: 100%;
`

const CustomDataTableCell = ({ children, ...props }) => {
	let { field } = props
	let { cellOnClick } = field

	if(field.type === 'datetime' && children){
		children = moment(children).format('YYYY-MM-DD H:mm')
	}

	if(_.isFunction(cellOnClick) ){
		return (
			<DataTableCell title={children} {...props}>
				<a
					href="javascript:void(0);"
					onClick={(event) => {
						event.preventDefault();
						cellOnClick(event, props.item)
					}}
				>
					{children}
				</a>
			</DataTableCell>
		);
	}
	return (
		<DataTableCell title={children} {...props}>
			{children}
		</DataTableCell>
	)
}

CustomDataTableCell.displayName = DataTableCell.displayName;

class Grid extends React.Component {
	static displayName = 'SteedosDataTableExample';
	static defaultProps = {
		rows: [],
		selection: [],
		selectRows: false,
		object: {}
	};

	static propTypes = {
		object: PropTypes.object.isRequired,
		searchMode: PropTypes.string,
		pageSize: PropTypes.number,
		selectionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
		selectRows: PropTypes.oneOf(['radio', 'checkbox', false])
    }


	componentDidMount() {
		if (this.props.init) {
			this.props.init(this.props)
		}
	}

	state = {
		// sortColumn: 'opportunityName',
		// sortColumnDirection: {
		// 	opportunityName: 'asc',
		// },
		items: this.props.rows,
		selection: this.props.selection
	};

	isEnableSearch = ()=>{
		let { object } = this.props
		return object.enable_search || false
	}

	getObjectName = ()=>{
		let { object } = this.props
		return object.name
	}

	handleChanged = (event, data) => {
		this.setState({ selection: data.selection });
		console.log(event, data);
	};

	handleRowAction = (item, action) => {
		console.log(item, action);
	};

	handleSort = (sortColumn, ...rest) => {
		if (this.props.log) {
			this.props.log('sort')(sortColumn, ...rest);
		}

		const sortProperty = sortColumn.property;
		const { sortDirection } = sortColumn;
		const newState = {
			sortColumn: sortProperty,
			sortColumnDirection: {
				[sortProperty]: sortDirection,
			},
			items: [...this.state.items],
		};

		// needs to work in both directions
		newState.items = newState.items.sort((a, b) => {
			let val = 0;

			if (a[sortProperty] > b[sortProperty]) {
				val = 1;
			}
			if (a[sortProperty] < b[sortProperty]) {
				val = -1;
			}

			if (sortDirection === 'desc') {
				val *= -1;
			}

			return val;
		});

		this.setState(newState);
	};

	render() {

		const { rows, handleChanged, selection, selectionLabel, selectRows, object, search } = this.props

		const DataTableColumns = _.map(object.fields, (field, key)=>{
			if(!field.hidden){
				return (
					<DataTableColumn label={field.label} property={key} key={key} >
						<CustomDataTableCell field={field}/>
					</DataTableColumn>
				)
			}
		})

		const onRequestRemoveSelectedOption = function (event, data) {
			return createAction('requestRemoveSelectedOption', data.selection, object)
		}

		const onSearch = function (event, data) {
			return createAction('search', data.value, object)
		}

		const DataTableSearch = ()=>{
			if(this.isEnableSearch()){
				return (
					<div className="slds-p-vertical_x-small slds-p-horizontal_large slds-shrink-none slds-theme_shade">
						<Lookup object={object} search={search} selectionLabel={selectionLabel} onRequestRemoveSelectedOption={onRequestRemoveSelectedOption} onSearch={onSearch}></Lookup>
					</div>
				)
			}else{
				return null;
			}
		}

		return (
			<Counter className="slds-grid slds-nowrap" >
				<div className="slds-col slds-grid slds-grid_vertical slds-nowrap">
						<DataTableSearch/>
						<DataTable
							assistiveText={{
								actionsHeader: 'actions',
								columnSort: 'sort this column',
								columnSortedAscending: 'asc',
								columnSortedDescending: 'desc',
								selectAllRows: 'all rows',
								selectRow: 'Select this row',
							}}
							fixedHeader
							fixedLayout
							items={rows || this.state.items}
							id="DataTableExample-2"
							onRowChange={handleChanged || this.handleChanged}
							// onSort={this.handleSort}
							selection={selection || this.state.selection}
							selectRows={selectRows}
						>
							{DataTableColumns}
						</DataTable>
				</div>
			</Counter>
		);
	}
}

export default Grid
