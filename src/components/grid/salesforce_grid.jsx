import React from 'react';
import _ from 'underscore';
import { DataTable, DataTableColumn, DataTableCell, Illustration, Icon } from '@salesforce/design-system-react';
import Lookup from '../lookup'
import { createGridAction } from '../../actions'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import moment from 'moment'

let Counter = styled.div`
	height: 100%;
	&.slds-grid-no-header{
		.slds-table thead{
			display: none;
		}
	}
	&>.slds-grid_vertical{
		/*fix IE11 宽度在门户界面会跳出widget范围*/
		width: 100%;
		/*fix IE11 grid列表顶部th列标题栏文字高度没有居中对齐*/
		.slds-table_header-fixed{
			.slds-cell-fixed{
				.slds-p-horizontal_x-small{
					line-height: 2rem!important
				}
			}
		}
	}
	.slds-illustration.slds-illustration_small .slds-illustration__svg {
		/*fix IE11 高度未定义会造成footer有内容时底部界面错乱*/
		height: 10rem;
	}
`

const formatFileSize = function (filesize) {
	var rev, unit;
	rev = filesize / 1024.00;
	unit = 'KB';
	if (rev > 1024.00) {
		rev = rev / 1024.00;
		unit = 'MB';
	}
	if (rev > 1024.00) {
		rev = rev / 1024.00;
		unit = 'GB';
	}
	return rev.toFixed(2) + unit;
};

const CustomDataTableCell = ({ children, ...props }) => {
	let { field } = props
	let { onClick, format } = field

	if(_.isFunction(format)){
		children = format(children, props.item, props.options)
	}if(children || _.isBoolean(children)){
		switch (field.type) {
			case 'datetime':
				if(_.isString(children) && /\d+Z$/.test(children)){
					children = moment(children).format('YYYY-MM-DD H:mm')
				}else{
					let utcOffset = moment().utcOffset() / 60
					children = moment(children).add(utcOffset, "hours").format('YYYY-MM-DD H:mm')
				}
				break;
			case 'date':
				if(_.isString(children) && /\d+Z$/.test(children)){
					children = moment.utc(children).format('YYYY-MM-DD')
				}else{
					children = moment(children).format('YYYY-MM-DD')
				}
				break;
			case 'boolean':
				children = children ? '是' : '否'
				break;
			case 'lookup':
				children = children._NAME_FIELD_VALUE
				break;
			case 'master_detail':
				children = children._NAME_FIELD_VALUE
				break;
			case 'filesize':
				children = formatFileSize(children)
				break;
			default:
				break;
		}
	}
	if(_.isFunction(onClick) ){
		return (
			<DataTableCell title={children} {...props}>
				<a
					onClick={(event) => {
						event.preventDefault();
						onClick(event, props.item)
					}}
				>
					{children}
				</a>
			</DataTableCell>
		);
	}
	let title = typeof children === "string" ? children : "";
	return (
		<DataTableCell title={title} {...props}>
			{children}
		</DataTableCell>
	)
}

CustomDataTableCell.displayName = DataTableCell.displayName;


const CustomDataTableIconCell = ({ children, ...props }) => {
	return (
		<DataTableCell {...props}>
			<Icon
				category={props.category}
				name={props.name}
				size={props.size}
			/>
		</DataTableCell>
	)
}

CustomDataTableIconCell.displayName = DataTableCell.displayName;

class Grid extends React.Component {
	static displayName = 'SteedosDataTable';
	static defaultProps = {
		rows: [],
		selection: [],
		selectRows: false,
		type: 'text',
		noHeader: false,
		unborderedRow: false
	};

	// static propTypes = {
	// 	object: PropTypes.object.isRequired,
	// 	searchMode: PropTypes.oneOf(['omitFilters']),
	// 	pageSize: PropTypes.number,
	// 	selectionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	// 	selectRows: PropTypes.oneOf(['radio', 'checkbox', false])
	// }
	

	static propTypes = {
		objectName: PropTypes.string.isRequired,
		columns: PropTypes.arrayOf(PropTypes.shape({
			field: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			width: PropTypes.string,
			// wrap: PropTypes.bool,
			hidden: PropTypes.bool,
			onClick: PropTypes.func,
			format: PropTypes.func
		})).isRequired,
		enableSearch: PropTypes.bool,
		pageSize: PropTypes.number,
		searchMode: PropTypes.oneOf(['omitFilters']),
		selectionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
		selectRows: PropTypes.oneOf(['radio', 'checkbox', false]),
		type: PropTypes.oneOf(['date', 'datetime', 'boolean', 'lookup', 'master_detail', 'text']),
		id: PropTypes.string,
		illustration: PropTypes.shape({
			heading: PropTypes.string,
			messageBody: PropTypes.string,
			name: PropTypes.string,
			path: PropTypes.string
		}),
		noHeader: PropTypes.bool,
		unborderedRow: PropTypes.bool,
		sort: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
		rowIcon: PropTypes.shape({
			width: PropTypes.string,
			category: PropTypes.string,
			name: PropTypes.string,
			size: PropTypes.string
		})
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
		let { enableSearch } = this.props
		return enableSearch || false
	}

	getObjectName = ()=>{
		let { objectName } = this.props
		return objectName
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

	getDataTableEmpty(isEmpty){
		if (!isEmpty){
			return null;
		}
		let illustration = this.props.illustration;
		if (!illustration) {
			illustration = {};
		}
		if (!illustration.messageBody) {
			illustration.messageBody = "没有可显示的项目";
		}
		if (!illustration.path) {
			if (window.__meteor_runtime_config__)
				illustration.path = window.__meteor_runtime_config__.ROOT_URL_PATH_PREFIX + "/assets/images/illustrations/empty-state-no-results.svg#no-results";
			else
				illustration.path = "/assets/images/illustrations/empty-state-no-results.svg#no-results";
		}
		return () => {
			return (
				<Illustration
					heading={illustration.heading}
					messageBody={illustration.messageBody}
					name={illustration.name}
					path={illustration.path}
				/>
			);
		};
	}

	render() {

		const { rows, handleChanged, selection, selectionLabel, selectRows, objectName, search, columns, id, noHeader, unborderedRow, sort, rowIcon} = this.props

		let dataTableColumns = _.map(columns, (column)=>{
			if(!column.hidden){
				return (
					<DataTableColumn label={column.label} property={column.field} key={column.field} width={column.width} >
						<CustomDataTableCell field={column} options={this.props}/>
					</DataTableColumn>
				)
			}
		});

		if (rowIcon) {
			let iconWidth = rowIcon.width; 
			if (!iconWidth){
				iconWidth = "3rem";
			}
			dataTableColumns.unshift((
				<DataTableColumn label="" key="grid-first-column-icon" width={iconWidth} >
					<CustomDataTableIconCell {...rowIcon} />
				</DataTableColumn>
			));
		}

		const onRequestRemoveSelectedOption = (event, data) => {
			return createGridAction('requestRemoveSelectedOption', data.selection, this.props)
		}

		const onSearch = (event, data)=> {
			return createGridAction('search', data.value, this.props)
		}

		const DataTableSearch = ()=>{
			if(this.isEnableSearch()){
				return (
					<div className="slds-p-vertical_x-small slds-p-horizontal_large slds-shrink-none slds-theme_shade">
						<Lookup id={id} objectName={objectName} search={search} selectionLabel={selectionLabel} onRequestRemoveSelectedOption={onRequestRemoveSelectedOption} onSearch={onSearch}></Lookup>
					</div>
				)
			}else{
				return null;
			}
		}

		const items = rows || this.state.items;
		const isLoading = this.props.loading;
		const isEmpty = isLoading ? false : items.length === 0;
		let DataTableEmpty = this.getDataTableEmpty(isEmpty);

		let extraClassNames = [];
		if (noHeader){
			extraClassNames.push('slds-grid-no-header');
		}
		let extraClassName = extraClassNames.length ? extraClassNames.join(" ") : "";

		return (
			<Counter className={`slds-grid slds-nowrap ${extraClassName}`} >
				<div className="slds-col slds-grid slds-grid_vertical slds-nowrap">
					<DataTableSearch/>
					{
						isEmpty ? (
							<DataTableEmpty />
						) : (
							<DataTable
								assistiveText={{
									actionsHeader: 'actions',
									columnSort: 'sort this column',
									columnSortedAscending: 'asc',
									columnSortedDescending: 'desc',
									selectAllRows: 'all rows',
									selectRow: 'Select this row',
								}}
								unborderedRow={unborderedRow}
								sort={sort}
								fixedHeader={!noHeader}
								fixedLayout
								items={items}
								id={id}
								onRowChange={handleChanged || this.handleChanged}
								// onSort={this.handleSort}
								selection={selection || this.state.selection}
								selectRows={selectRows}
							>
								{dataTableColumns}
							</DataTable>
						)
					}
				</div>
			</Counter>
		);
	}
}

export default Grid
