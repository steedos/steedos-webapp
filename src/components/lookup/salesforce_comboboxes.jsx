/* eslint-disable no-console, react/prop-types */
import React from 'react';
import { Combobox, Icon, comboboxFilterAndLimit} from '@salesforce/design-system-react';
import _ from 'underscore'

const accounts = [
];

const accountsWithIcon = accounts.map((elem) => ({
	...elem,
	...{
		icon: (
			<Icon
				assistiveText={{ label: 'Account' }}
				category="standard"
				name={elem.type}
			/>
		),
	},
}));

/**
 *
 * TODO 
 * 	1 selection Icon 
 *  2 已选中项，文字不居中
 *  3 指定对象，选择对象下的数据
 *  4 支持filters
 * @class lookup
 * @extends {React.Component}
 */
class lookup extends React.Component {

	static defaultProps = {
		object: {}
	};

	constructor(props) {
		super(props);
		this.state = {
			inputValue: props.search || '',
			selection: [
			],
		};
	}

	render() {

		let { selection, onSearch, onRequestRemoveSelectedOption, selectionLabel, search, onChange, objectName } = this.props
		let selections = [];
		if(selection){
			_.forEach(selection, (item)=>{
				let label;
				if(selectionLabel){
					if(_.isFunction(selectionLabel)){
						label = selectionLabel(item)
					}else{
						label = item[selectionLabel]
					}
				}else{
					label = item['name']
				}

				// item.icon = (
				// 	<Icon
				// 		assistiveText={{ label: 'Account' }}
				// 		category="standard"
				// 		name="account"
				// 	/>
				// )

				selections.push(Object.assign({}, item, {label}))
			})
		}
		return (
				<Combobox
					id="combobox-base"
                    disabled={this.props.disabled}
                    isOpen={false}
					events={{
						onChange: onChange || ((event, data) => {
								this.setState({
									inputValue: data.value
								});
								if(data.value=== '' && search){
									onSearch(event, data)
								}
							}
						),
						onRequestRemoveSelectedOption,
						onSubmit: onSearch,
						onSelect: (event, data) => {
							if (this.props.action) {
								this.props.action('onSelect')(
									event,
									...Object.keys(data).map((key) => data[key])
								);
							} else if (console) {
								console.log('onSelect', event, data);
							}
							this.setState({
								inputValue: '',
								selection: data.selection,
							});
						},
					}}
					labels={{
						placeholder: `搜索`, //${object.label}
					}}
					multiple
					options={comboboxFilterAndLimit({
						inputValue: this.state.inputValue,
						limit: 10,
						options: accountsWithIcon,
						selection: this.state.selection,
					})}
					selection={selections || this.state.selection}
					value={this.state.inputValue}
				/>
		);
	}
}

export default lookup