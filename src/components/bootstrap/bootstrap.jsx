import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore'

class Bootstrap extends React.Component {

	getChildContext() {
        let iconPath = '/assets/icons';

		if (window.__meteor_runtime_config__)
            iconPath = window.__meteor_runtime_config__.ROOT_URL_PATH_PREFIX + "/assets/icons";
        
        return {
			iconPath: iconPath,
		};
    }
    
    static defaultProps = {
    };

    static propTypes = {
    };

    componentDidMount() {
        const { loadBootstrap, isBootstrapLoaded, isRequestStarted } = this.props;
        if (!isBootstrapLoaded && !isRequestStarted && loadBootstrap) {
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