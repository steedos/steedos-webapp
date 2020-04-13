/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const DISPLAY_NAME = 'SLDSSplitViewListItemContent';

const propTypes = {
	/**
	 * **Item to be displayed**
	 * * `label`: The main label displayed on the top left.
	 * * `topRightText`: The text displayed on the top right.
	 * * `bottomLeftText`: The text displayed on the bottom left.
	 * * `bottomRightText`: The text displayed on the bottom right.
	 */
	item: PropTypes.shape({
		label: PropTypes.string,
		topRightText: PropTypes.string,
		bottomLeftText: PropTypes.string,
		bottomRightText: PropTypes.string,
		rows: PropTypes.arrayOf(PropTypes.shape({
			// label: PropTypes.string,
			// topRightText: PropTypes.string,
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			topRightText: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
		}))
	})
};

const defaultProps = {};

const SplitViewListItemContent = ({ item }) => (
	<div key={item._id}>
		{item.rows ? (item.rows.map((itemOption, index)=>(
			<div className="slds-grid slds-wrap" key={itemOption._id}>
				<span
					className={classNames(
						'slds-truncate',
						index === 0 ? 'slds-text-body_regular slds-text-color_default' : null
					)}
				>
					{itemOption.label}
				</span>
				{itemOption.topRightText ? 
					(<span
						className="slds-truncate slds-col_bump-left"
					>
						{itemOption.topRightText}
					</span>) : null}
			</div>
		))) : (
			<React.Fragment>
				<div className="slds-grid slds-wrap">
					<span
						className="slds-truncate slds-text-body_regular slds-text-color_default"
						title={item.label}
					>
						{item.label}
					</span>
					<span
						className="slds-truncate slds-col_bump-left"
						title={item.topRightText}
					>
						{item.topRightText}
					</span>
				</div>
				<div className="slds-grid slds-wrap">
					<span className="slds-truncate" title={item.bottomLeftText}>
						{item.bottomLeftText}
					</span>
					<span
						className="slds-truncate slds-col_bump-left"
						title={item.bottomLeftText}
					>
						{item.bottomRightText}
					</span>
				</div>
			</React.Fragment>
		)}	
	</div>
);

SplitViewListItemContent.displayName = DISPLAY_NAME;
SplitViewListItemContent.propTypes = propTypes;
SplitViewListItemContent.defaultProps = defaultProps;

export default SplitViewListItemContent;
