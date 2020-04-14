import React from 'react';
import _ from 'underscore';
import { DataTableColumn, DataTableCell, Illustration, Icon } from '@salesforce/design-system-react';
import Lookup from '../lookup'
import { createGridAction } from '../../actions'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import moment from 'moment'
import { getRelativeUrl } from '../../utils';
import SplitViewListbox from './listbox'
const marked = require('marked/lib/marked.js');

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

const FieldLabel = ({ children, ...props }) => {
	let { field } = props
	let { onClick, format } = field

	if(_.isFunction(format)){
		children = format(children, props.item, props.options)
	}
	if(children || _.isBoolean(children)){
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
			case 'markdown':
				children = (<div dangerouslySetInnerHTML={{__html: marked(children)}} />)
				break;
			default:
				break;
		}
	}
	let title = typeof children === "string" ? children : "";
	return (
		<label title={title}>
			{children}
		</label>
	)
}

FieldLabel.displayName = DataTableCell.displayName;


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


const CustomListItem = ({ children, ...props }) => {
	debugger;
	return (
		<div>
			<span className="slds-text-heading_small slds-m-left_medium">
				{props.item.name}
			</span>
		</div>
	)
}

// CustomListItem.propsTypes = {
// 	item: PropTypes.shape({
// 		status: PropTypes.string,
// 		name: PropTypes.string,
// 	}),
// };

CustomListItem.displayName = 'SteedosCustomListItem';

class List extends React.Component {
	static displayName = 'SteedosDataList';
	static defaultProps = {
		rows: [],
		selection: [],
		selectRows: false,
		type: 'text',
		noHeader: false,
		unborderedRow: false,
		labelField: "name"
	};

	static propTypes = {
		objectName: PropTypes.string.isRequired,
		columns: PropTypes.arrayOf(PropTypes.shape({
			field: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			type: PropTypes.oneOf(['date', 'datetime', 'boolean', 'lookup', 'master_detail', 'text']),
			is_wide: PropTypes.bool,
			format: PropTypes.func
		})).isRequired,
		pageSize: PropTypes.number,
		rowIcon: PropTypes.shape({
			width: PropTypes.string,
			category: PropTypes.string,
			name: PropTypes.string,
			size: PropTypes.string
		}),
		rowIconKey: ""
	}
	

	// static propTypes = {
	// 	objectName: PropTypes.string.isRequired,
	// 	columns: PropTypes.arrayOf(PropTypes.shape({
	// 		field: PropTypes.string.isRequired,
	// 		label: PropTypes.string.isRequired,
	// 		width: PropTypes.string,
	// 		// wrap: PropTypes.bool,
	// 		hidden: PropTypes.bool,
	// 		onClick: PropTypes.func,
	// 		format: PropTypes.func
	// 	})).isRequired,
	// 	enableSearch: PropTypes.bool,
	// 	pageSize: PropTypes.number,
	// 	searchMode: PropTypes.oneOf(['omitFilters']),
	// 	selectionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	// 	selectRows: PropTypes.oneOf(['radio', 'checkbox', false]),
	// 	type: PropTypes.oneOf(['date', 'datetime', 'boolean', 'lookup', 'master_detail', 'text']),
	// 	id: PropTypes.string,
	// 	illustration: PropTypes.shape({
	// 		heading: PropTypes.string,
	// 		messageBody: PropTypes.string,
	// 		name: PropTypes.string,
	// 		path: PropTypes.string
	// 	}),
	// 	noHeader: PropTypes.bool,
	// 	unborderedRow: PropTypes.bool,
	// 	sort: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	// 	rowIcon: PropTypes.shape({
	// 		width: PropTypes.string,
	// 		category: PropTypes.string,
	// 		name: PropTypes.string,
	// 		size: PropTypes.string
	// 	}),
	// 	baseFilters: PropTypes.array,
	// 	spaceId: PropTypes.string,
	// 	keep: PropTypes.bool
    // }


	componentDidMount() {
		if (this.props.init) {
			this.props.init(this.props)
		}
	}

	componentWillUnmount(){
		let {keep, removeViewAction, id} = this.props
		if(!keep){
			removeViewAction(id)
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
			illustration.path = getRelativeUrl("/assets/images/illustrations/empty-state-no-results.svg#no-results");
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

	getListOptions(items, columns, rowIcon, rowIconKey){
		let results = items.map((item)=>{
			let itemRows = [], itemTag = 0, itemOption = {}, fieldNode;
			columns.forEach((column)=>{
				fieldNode = (<FieldLabel field={column} options={this.props}>{item[column.field]}</FieldLabel>);
				if(column.is_wide){
					if(itemTag !== 0){
						itemRows.push(itemOption);
					}
					itemOption = {_id: `${item._id}_${itemRows.length}_wide`};
					itemOption.label = fieldNode;
					itemTag = 0;
					itemRows.push(itemOption);
				}
				else{
					if(itemTag === 0){
						itemOption = {_id: `${item._id}_${itemRows.length}`};
						itemOption.label = fieldNode;
						itemTag++;
					}
					else{
						itemOption.topRightText = fieldNode;
						itemTag = 0;
						itemRows.push(itemOption);
					}
				}
			});
			if(rowIconKey){
				rowIcon = item[rowIconKey];
				if(typeof rowIcon === "string"){
					rowIcon = {
						category: "standard",
						name: rowIcon
					};
				}
			}
			return {
				id: item._id,
				rows: itemRows,
				rowIcon: rowIcon
			}
		});
		return results;
	}

	render() {

		const { rows, handleChanged, selection, selectionLabel, selectRows, objectName, search, columns, id, noHeader, unborderedRow, sort, rowIcon, rowIconKey} = this.props

		// let dataTableColumns = _.map(columns, (column)=>{
		// 	if(!column.hidden){
		// 		return (
		// 			<DataTableColumn label={column.label} property={column.field} key={column.field} width={column.width} >
		// 				<CustomDataTableCell field={column} options={this.props}/>
		// 			</DataTableColumn>
		// 		)
		// 	}
		// });

		// if (rowIcon) {
		// 	let iconWidth = rowIcon.width; 
		// 	if (!iconWidth){
		// 		iconWidth = "3rem";
		// 	}
		// 	dataTableColumns.unshift((
		// 		<DataTableColumn label="" key="grid-first-column-icon" width={iconWidth} >
		// 			<CustomDataTableIconCell {...rowIcon} />
		// 		</DataTableColumn>
		// 	));
		// }

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
		console.log("items === ", items);
		const listOptions = this.getListOptions(items, columns, rowIcon, rowIconKey);
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
					{
						isEmpty ? (
							<DataTableEmpty />
						) : (
							<SplitViewListbox
								key="2"
								labels={{
									header: 'Lead Score',
								}}
								options={listOptions}
								events={{
									// onSort: this.sortList,
									onSelect: (event, { selectedItems, item }) => {
										// this.setState({
										// 	unread: this.state.unread.filter((i) => i !== item),
										// 	selected: selectedItems,
										// });
									},
								}}
								// selection={this.state.selected}
								// unread={this.state.unread}
								// listItem={CustomListItem}
							/>
						)
					}
				</div>
			</Counter>
		);
	}
}

export default List
