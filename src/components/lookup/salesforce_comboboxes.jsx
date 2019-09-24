/* eslint-disable no-console, react/prop-types */
import React from 'react';
import { Combobox, Icon, comboboxFilterAndLimit, IconSettings} from '@salesforce/design-system-react';

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
//TODO: selection Icon , 已选中项，文字不居中
class lookup extends React.Component {
	constructor(props) {
		super(props);
        // console.log('accountsWithIcon[0]', accountsWithIcon[0])
		this.state = {
			inputValue: '',
			selection: [
			// 	{
            //     id: "111111",
            //     label: "Acme1111111",
            //     type: "account",
            //     // icon: (<Icon
            //     //     assistiveText={{ label: 'Account' }}
            //     //     category="standard"
            //     //     name="account"
            //     // />)
			// }
			],
		};
	}

	render() {

		let { selection, onSearch, onRequestRemoveSelectedOption, selectionLabel, search, onChange } = this.props
		if(selection){
			selection.map((item)=>{
				item.label = item[selectionLabel]
				// item.icon = (
				// 	<Icon
				// 		assistiveText={{ label: 'Account' }}
				// 		category="standard"
				// 		name="account"
				// 	/>
				// )
			})
		}
		// : (event, data) => {
		// 	console.log('onRequestRemoveSelectedOption....');
		// 	this.setState({
		// 		inputValue: '',
		// 		selection: data.selection,
		// 	});
		// },
		return (
			<IconSettings iconPath="/icons">
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
						placeholder: `Search ${this.props.objectName}`,
					}}
					multiple
					options={comboboxFilterAndLimit({
						inputValue: this.state.inputValue,
						limit: 10,
						options: accountsWithIcon,
						selection: this.state.selection,
					})}
					selection={selection || this.state.selection}
					value={this.state.inputValue}
				/>
			</IconSettings>
		);
	}
}

export default lookup