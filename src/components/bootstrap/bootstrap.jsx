import * as React from 'react';
import PropTypes from 'prop-types';
import { createAction as createActionGrid } from '../../actions/views/grid';
import _ from 'underscore'

class Bootstrap extends React.Component {

    constructor(props) {
        super(props)
    };

    static defaultProps = {
    };

    static propTypes = {
    };

    componentDidMount() {
        const { init } = this.props;
        if (init) {
            init(this.props)
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

export default Bootstrap;