import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const AdCard = (props) => {
    const {advertid, advertiser, misc_advert} = props.ad;
    const title = `${advertid}. ${misc_advert}`
    const description = `sponsered post by: ${advertiser}`;
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

AdCard.propTypes = {
    ad: PropTypes.object.isRequired
}
                //{props.member.description}

                //{`Rating ${props.member.rating}`}

export default AdCard;

