import * as React from 'react';
import PropTypes from 'prop-types';
import { createAction as createActionGrid } from '../../actions/views/grid';
import _ from 'underscore'

class Bootstrap extends React.Component {

    constructor(props) {
        super(props)
    };

	getChildContext() {
		return {
			iconPath: '/assets/icons',
		};
    }
    
    static defaultProps = {
    };

    static propTypes = {
    };

    componentDidMount() {
        const { loadBootstrap, isBootstrapLoaded } = this.props;
        if (!isBootstrapLoaded && loadBootstrap) {
            loadBootstrap(this.props)
        }
    }

    state = {
        isBootstrapLoaded: false
    };

    render() {
        let { isBootstrapLoaded } = this.props;
        if (!isBootstrapLoaded){
            return null;
        }
        return (
            <div className="bootstrap-container">
                {this.props.children}
            </div>
        );
    }
}

Bootstrap.childContextTypes = {
	iconPath: PropTypes.string,
};

export default Bootstrap;