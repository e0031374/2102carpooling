import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

class CarItem extends React.Component {
    render() {
        const { brand, model, platenum, colour, seatnum } = this.props.car;
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{`${brand} ${model}`}</Card.Header>
                    <Card.Meta>
                        {`Platenum: ${platenum}`}
                    </Card.Meta>
                    <Card.Description>
                        {`Color: ${colour}, Seats: ${seatnum}`}
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
