import React from 'react';

import { Dropdown, DataTable, DataTableColumn, DataTableCell, DataTableRowActions, IconSettings } from '@salesforce/design-system-react';

import Lookup from '../lookup'

import { createAction } from '../../actions/views/grid'

import styled from 'styled-components'

let Counter = styled.div`
	height: 100%;
`

const CustomDataTableCell = ({ children, ...props }) => (
	<DataTableCell title={children} {...props}>
		<a
			href="javascript:void(0);"
			onClick={(event) => {
				event.preventDefault();
			}}
		>
			{children}
		</a>
	</DataTableCell>
);
CustomDataTableCell.displayName = DataTableCell.displayName;

class Grid extends React.Component {
	static displayName = 'SteedosDataTableExample';
	static defaultProps = {
		rows: [],
		selection: [],
		selectRows: false
	};

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

		const { rows, objectName, handleChanged, selection, selectionLabel, selectRows } = this.props

		const DataTableColumns = this.props.columns.map(function (column) {
			return (
				<DataTableColumn label={column.title} property={column.name} key={column.name} />
			)
		})

		const onRequestRemoveSelectedOption = function (event, data) {
			return createAction('requestRemoveSelectedOption', data.selection, objectName)
		}

		const onSearch = function (event, data) {
			return createAction('search', data.value, objectName)
		}

		return (
			<Counter className="slds-grid slds-nowrap" >
				<div className="slds-col slds-grid slds-grid_vertical slds-nowrap">
					<IconSettings iconPath="/icons" >
						<div className="slds-p-vertical_x-small slds-p-horizontal_large slds-shrink-none slds-theme_shade">
							<Lookup objectName={objectName} selectionLabel={selectionLabel} onRequestRemoveSelectedOption={onRequestRemoveSelectedOption} onSearch={onSearch}></Lookup>
						</div>
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
					</IconSettings>
				</div>
			</Counter>
		);
	}
}

export default Grid
