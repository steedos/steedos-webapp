import * as React from 'react';
import { Modal, Button } from '@salesforce/design-system-react';
import { Flows } from '../';
import styled from 'styled-components'

let Counter = styled.div`
    &>.slds-modal__content{
        overflow: hidden;
    }
`

class FlowsModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggleOpen = () => {
		this.setState({ isOpen: !this.state.isOpen });
    };
    
    render() {
        return (
            <Counter>
            <Button
                    label="Open modal with menu contents"
                    onClick={this.toggleOpen}
                />
            <Modal isOpen={this.state.isOpen} onRequestClose={this.toggleOpen} contentStyle={{overflow: 'hidden'}}
            footer={[
                <Button label="保存" variant="brand" onClick={this.toggleOpen} />,
                <Button label="取消" onClick={this.toggleOpen} />,
            ]}
            heading="选择模板流程"
            size="medium"
            >
                <Flows searchMode="omitFilters"/>
            </Modal>
            </Counter>
        )
    }
}
export default FlowsModal