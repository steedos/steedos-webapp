import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';
import _ from 'underscore';
import { Tabs as SFTabs} from '@salesforce/design-system-react';

let Container = styled.div`
    .slds-vertical-tabs{
        &.slds-tabs_default, &.slds-tabs_scoped{
            .slds-tabs_default__nav, .slds-tabs_scoped__nav{
                width: 12rem;
                border-right: 1px solid #dddbda;
                background: #f3f2f2;
                display: block;
                border-left: none;
                border-bottom: none;
                border-top: none;
                border-radius: 0;
                .slds-tabs_default__item, .slds-tabs_scoped__item{
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    border-bottom: 1px solid #dddbda;
                    color: #3e3e3c;
                    &.slds-active{
                        margin-right: -1px;
                        border-right: 0;
                        background: #fff;
                        color: #006dcc;
                    }
                    .slds-tabs_default__link, .slds-tabs_scoped__link{
                        display: flex;
                        flex: 1 1 0%;
                        align-items: center;
                        min-width: 0;
                        padding: .75rem;
                        color: currentColor;
                        width: 100%;
                    }
                    &:focus{
                        outline: none;
                    }
                }
            }
            .slds-tabs_default__content, .slds-tabs_scoped__content{
                flex: 1;
                padding: 1rem;
                background: #fff;
                border: none;
            }
        }
    }
`;

class Tabs extends React.Component {
    constructor(props) {
        super(props);
    };

    static defaultProps = _.extend({}, SFTabs.defaultProps, { vertical: false })

    static propTypes = _.extend({}, SFTabs.propTypes, { vertical: PropTypes.bool })

    render() {
        let { vertical, className, ...props } = this.props;
        return (
            <Container className="steedos-tabs-container">
                <SFTabs {...props} 
                    className={classNames(
                        {
                            'slds-vertical-tabs': vertical === true,
                        },
                        className
                    )}
                />
            </Container>
        );
    }
}

export default Tabs;