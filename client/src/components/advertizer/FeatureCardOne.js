import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const FeatureCardOne = (props) => {
    const {uname, num_posted} = props.feature;
    const title = `${uname}: ${num_posted} ads posted`
    //const description = `sponsered post by: ${advertiser}`;
    return (
    <Card>
        <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>
            </Card.Meta>
            <Card.Description>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
            </a>
        </Card.Content>
    </Card>
    );
}

FeatureCardOne.propTypes = {
    feature: PropTypes.object.isRequired
}
                //{props.member.description}

                //{`Rating ${props.member.rating}`}

export default FeatureCardOne;

