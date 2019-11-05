import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

class CarItem extends React.Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.car.brand}</Card.Header>
                    <Card.Meta>
                        {this.props.car.type}
                    </Card.Meta>
                    <Card.Description>
                        {this.props.car.seat}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

CarItem.propTypes = {
    car: PropTypes.object.isRequired,
}


export default CarItem;
