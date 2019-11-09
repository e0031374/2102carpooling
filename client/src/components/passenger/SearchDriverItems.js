import React from 'react';
import { Item, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const MemberItems = (props) => {
    const memberList = props
        .members.map(member => <MemberItem key={member.drivername} member={member}/>);
    return (
        <Item.Group>
            {memberList}
        </Item.Group>
    );
}

const MemberItem = (props) => (
    <Item>
        <Item.Content>
            <Item.Header as='a'>{props.member.drivername}</Item.Header>
            <Item.Meta>Rating: {props.member.avg_rating}</Item.Meta>
            <Item.Description>
            </Item.Description>
        </Item.Content>
    </Item>
)

MemberItems.propTypes = {
    members: PropTypes.array.isRequired
}

export default MemberItems;
