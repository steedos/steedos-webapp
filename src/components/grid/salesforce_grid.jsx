import React from 'react';

import { Dropdown, DataTable, DataTableColumn, DataTableCell, DataTableRowActions, IconSettings } from '@salesforce/design-system-react';

import Lookup from '../lookup'

import { createGridAction } from '../../actions/views/grid'

import styled from 'styled-components'

let Counter = styled.div`
	height: 100%;
	position: absolute;
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
		selection: []
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
		selection: this.props.selection,
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

		const { rows, objectName, handleChanged, selection } = this.props

		const DataTableColumns = this.props.columns.map(function (column) {
			return (
				<DataTableColumn label={column.title} property={column.name} key={column.name} />
			)
		})

		const onRequestRemoveSelectedOption = function (event, data) {
			return createGridAction('requestRemoveSelectedOption', data.selection, objectName)
			// console.log('onRequestRemoveSelectedOption', event, data)
		}

		const onSearch = function (event, data) {
			return createGridAction('search', data.value, objectName)
		}

		return (
			<Counter className="slds-grid slds-nowrap">
				<div className="slds-col slds-grid slds-grid_vertical slds-nowrap">
					<IconSettings iconPath="/icons">
						<div className="slds-p-vertical_x-small slds-p-horizontal_large slds-shrink-none slds-theme_shade">
							<Lookup objectName={objectName} selectionLabel='name' onRequestRemoveSelectedOption={onRequestRemoveSelectedOption} onSearch={onSearch}></Lookup>
						</div>
						<div className="slds-scrollable slds-grow">
							<div className="slds-scrollable_none">
								<DataTable
									assistiveText={{
										actionsHeader: 'actions',
										columnSort: 'sort this column',
										columnSortedAscending: 'asc',
										columnSortedDescending: 'desc',
										selectAllRows: 'all rows',
										selectRow: 'Select this row',
									}}
									fixedLayout
									items={rows || this.state.items}
									id="DataTableExample-2"
									onRowChange={handleChanged || this.handleChanged}
									// onSort={this.handleSort}
									selection={selection || this.state.selection}
									selectRows="checkbox"
								>
									{DataTableColumns}

									{/* <DataTableColumn
								// isSorted={this.state.sortColumn === 'opportunityName'}
								label="Name"
								primaryColumn
								property="opportunityName"
								sortable
								// sortDirection={this.state.sortColumnDirection.opportunityName}
								width="10rem"
							>
								<CustomDataTableCell />
							</DataTableColumn>
							<DataTableColumn
								label="Account Name"
								property="accountName"
								width="8rem"
							/>
							<DataTableColumn
								sortable
								isDefaultSortDescending
								label="Close Date"
								property="closeDate"
							/>
							<DataTableColumn label="Stage" property="stage" />
							<DataTableColumn
								isSorted={this.state.sortColumn === 'confidence'}
								label="Confidence"
								property="confidence"
								sortable
								// sortDirection={this.state.sortColumnDirection.confidence}
							/>
							<DataTableColumn label="Amount" property="amount" />
							<DataTableColumn label="Contact" property="contact">
								<CustomDataTableCell />
							</DataTableColumn> */}
									{/* <DataTableRowActions
								options={[
									{
										id: 0,
										label: 'Add to Group',
										value: '1',
									},
									{
										id: 1,
										label: 'Publish',
										value: '2',
									},
									{
										id: 2,
										label: 'Third of Seven',
										value: '3',
									},
									{
										id: 3,
										label: 'Fourth of Seven',
										value: '4',
									},
									{
										id: 4,
										label: 'Fifth of Seven',
										value: '5',
									},
									{
										id: 5,
										label: 'Sixth of Seven',
										value: '6',
									},
									{
										id: 6,
										label: 'Seventh of Seven',
										value: '7',
									},
								]}
								onAction={this.handleRowAction}
								dropdown={<Dropdown length="7" />}
							/> */}
								</DataTable>
							</div>
						</div>
					</IconSettings>
				</div>
			</Counter>
		);
	}
}

export default Grid
