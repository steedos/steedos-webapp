import React from 'react';
import _ from 'underscore';
import moment from 'moment'
const marked = require('marked/lib/marked.js');

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

const getSelectFieldLabel = (field, fieldValue, doc) => {
	var _options, _record_val, _val, _values, ref, self_val, val;
	_options = field.allOptions || field.options;
	_values = doc || {};
	// record_val是grid字段类型传入的，先不考虑
	// _record_val = this.record_val;
	if (_.isFunction(field.options)) {
		_options = field.options(_record_val || _values);
	}
	if (_.isFunction(field.optionsFunction)) {
		_options = field.optionsFunction(_record_val || _values);
	}
	if (_.isArray(fieldValue)) {
		self_val = fieldValue;
		_val = [];
		_.each(_options, function(_o) {
			if (_.indexOf(self_val, _o.value) > -1) {
				return _val.push(_o.label);
			}
		});
		val = _val.join(",");
	} else {
		val = (ref = _.findWhere(_options, {
			value: fieldValue
		})) != null ? ref.label : void 0;
	}

	if (!val) {
		val = fieldValue;
	}
	return val;
}

const getNumberFieldLabel = (field, fieldValue, doc) => {
	var fieldScale, reg, val;
	fieldScale = 0;
	if (field.scale) {
		fieldScale = field.scale;
	} else if (field.scale !== 0) {
		fieldScale = field.type === "currency" ? 2 : 0;
	}
	val = Number(fieldValue).toFixed(fieldScale);
	reg = /(\d)(?=(\d{3})+\.)/g;
	if (fieldScale === 0) {
		reg = /(\d)(?=(\d{3})+\b)/g;
	}
	val = val.replace(reg, '$1,');
	return val;
}

const FieldLabel = ({ children, ...props }) => {
	let { field, doc } = props;
	let { onClick, format } = field;

	if(_.isFunction(format)){
		children = format(children, props.item, props.options)
	}
	if(children || _.isBoolean(children) || _.isNumber(children)){
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
			case 'select':
				children = getSelectFieldLabel(field, children, doc)
				break;
			case 'number':
				children = getNumberFieldLabel(field, children, doc)
				break;
			case 'currency':
				children = getNumberFieldLabel(field, children, doc)
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

export default FieldLabel;