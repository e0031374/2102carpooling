import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const TopCard = (props) => {
    const {drivername, avg_rating} = props.ad;
    const title = `Driver: ${drivername}`
    const description = `Avg Rating: ${avg_rating}`;
    return (
    <Card>
        <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>
            </Card.Meta>
            <Card.Description>
                {description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
            </a>
        </Card.Content>
    </Card>
    );
}

TopCard.propTypes = {
    ad: PropTypes.object.isRequired
}
                //{props.member.description}

                //{`Rating ${props.member.rating}`}

export default TopCard;

