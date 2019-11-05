import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

const Empty = (props) => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search'/>
                We dont have any members matching your query;
            </Header>
            <Segment.Inline>
                <Button primary>Clear Query</Button>
            </Segment.Inline>
        </Segment>
    );    
}

export default Empty;
