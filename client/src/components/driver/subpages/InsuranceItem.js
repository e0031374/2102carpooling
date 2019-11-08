import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

class InsuranceItem extends React.Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.insurance.insuranceprovider}</Card.Header>
                    <Card.Meta>
                        {this.props.insurance.policynum}
                    </Card.Meta>
                    <Card.Description>
                        {}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

InsuranceItem.propTypes = {
    insurance: PropTypes.object.isRequired,
}


export default InsuranceItem;
