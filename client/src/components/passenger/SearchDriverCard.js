import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const SearchDriverCard = (props) => {
    const {drivername, total_rides, avg_rating} = props.member;
    return (
    <Card>
        <Card.Content>
            <Card.Header>{drivername}</Card.Header>
            <Card.Meta>
                {`Avg Rating: ${avg_rating}`}
            </Card.Meta>
            <Card.Description>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                {`Total Rides: ${total_rides}`}
            </a>
        </Card.Content>
    </Card>
    );
}

SearchDriverCard.propTypes = {
    member: PropTypes.object.isRequired
}
                //{props.member.description}

                //{`Rating ${props.member.rating}`}

export default SearchDriverCard;

