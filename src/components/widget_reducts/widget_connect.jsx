import * as React from 'react';

export default (WrappedComponent, propsProxyFunction) => (
    class extends React.Component {
        render(){
            let props = propsProxyFunction(this.props);
            return <WrappedComponent {...props} />
        }
    }
)