import React from 'react';
import _ from 'underscore';
import { DataTableColumn, DataTableCell, Illustration, Icon } from '@salesforce/design-system-react';
import Lookup from '../lookup'
import { createGridAction } from '../../actions'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import moment from 'moment'
import { getRelativeUrl, getObjectRecordUrl } from '../../utils';
import SplitViewListbox from './listbox'
import Tloader from '../pullable';
const marked = require('marked/lib/marked.js');

let ListContainer = styled.div`
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
	return (
		<React.Fragment>
			{children}
		</React.Fragment>
	)
}

FieldLabel.displayName = "ListItemFieldLabel";

class List extends React.Component {
	static displayName = 'SteedosDataList';
	static defaultProps = {
		rows: [],
		rowIconKey: "",
		selection: []
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
		loading: PropTypes.bool,
		rowIcon: PropTypes.shape({
			width: PropTypes.string,
			category: PropTypes.string,
			name: PropTypes.string,
			size: PropTypes.string
		}),
		rowIconKey: PropTypes.string,
		illustration: PropTypes.shape({
			heading: PropTypes.string,
			messageBody: PropTypes.string,
			name: PropTypes.string,
			path: PropTypes.string
		}),
		/**
		 * Custom list item template for the list item content. The select and unread functionality wraps the custom list item.
		 * This should be a React component that accepts props.
		 */
		listItem: PropTypes.func,
		/**
		 * The list item href generate function
		 */
		listItemHref: PropTypes.func
	}

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
		items: this.props.rows,
		selection: this.props.selection,
		initializing: 1
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
					itemOption = {key: `${item._id}_${itemRows.length}_wide`};
					itemOption.label = fieldNode;
					itemTag = 0;
					itemRows.push(itemOption);
				}
				else{
					if(itemTag === 0){
						itemOption = {key: `${item._id}_${itemRows.length}`};
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
			if(itemTag !== 0){
				itemRows.push(itemOption);
			}
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
				key: item._id,
				rows: itemRows,
				rowIcon: rowIcon,
				content: item
			}
		});
		return results;
	}

	render() {
		const { rows, handleChanged, selection, selectionLabel, selectRows, objectName, search, columns, id, 
			noHeader, unborderedRow, sort, rowIcon, rowIconKey, 
			pager, handlePageChanged, handleLoadMore, totalCount, pageSize, currentPage} = this.props;

		const isLoading = this.props.loading;
		const items = rows;
		let listOptions = this.state.items;
		if(!isLoading && items.length){
			const currentPageListOptions = this.getListOptions(items, columns, rowIcon, rowIconKey);
			listOptions = _.union(this.state.items, currentPageListOptions);
			this.state.items = listOptions;
		}
		const isEmpty = isLoading ? false : items.length === 0;
		let DataTableEmpty = this.getDataTableEmpty(isEmpty);

		let extraClassNames = [];
		if (noHeader){
			extraClassNames.push('slds-grid-no-header');
		}
		let extraClassName = extraClassNames.length ? extraClassNames.join(" ") : "";

		let listItemHref = this.props.listItemHref ? this.props.listItemHref : (item) => {
			return getObjectRecordUrl(this.props.objectName, item.content._id)
		}

		let pagerTotal = Math.ceil(totalCount / pageSize);
		let hasMore = (currentPage ? currentPage : 0) < pagerTotal - 1;
		let {
		  initializing
		} = this.state;
		if(isLoading === false && initializing === 1){
			initializing = 2;
			this.state.initializing = 2;
		}

		let onLoadMore = (resolve)=>{
			this.props.handleLoadMore((currentPage ? currentPage : 0) + 1);
		}

		let onRefresh = (resolve)=>{
			this.state.items = [];
			this.props.handleRefresh((currentPage ? currentPage : 0) + 1);
		}

		return (
			<ListContainer className={`slds-grid slds-nowrap ${extraClassName}`} >
				<div className="slds-col slds-grid slds-grid_vertical slds-nowrap">
					{
						isEmpty ? (
							<DataTableEmpty />
						) : (
							<Tloader
								onRefresh={onRefresh}
								onLoadMore={onLoadMore}
								hasMore={hasMore}
								initializing={initializing}
								loading={isLoading}
							>
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
									listItem={this.props.listItem}
									listItemHref={listItemHref}
								/>
								{/* <ul>{list}</ul> */}
							</Tloader>
						)
					}
				</div>
			</ListContainer>
		);
	}
}

export default List
