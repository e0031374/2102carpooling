import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const FeatureCardThree = (props) => {
    const {uname, total_bids, won_bids, total_fares, avg_fares} = props.feature;
    const title = `User Report: ${uname}`
    const description = `Total Bids: ${total_bids}, Bids Won: ${won_bids}`;
    const meta = `Total fares: ${total_fares}, Average fares: ${avg_fares.substring(0,5)}`;
    return (
    <Card>
        <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>
                {meta}
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

FeatureCardThree.propTypes = {
    feature: PropTypes.object.isRequired
}
                //{props.member.description}

                //{`Rating ${props.member.rating}`}

export default FeatureCardThree;

