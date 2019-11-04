import React from 'react';
import LoginPanel from '../login/LoginPanel';
import SignupPanel from '../login/SignupPanel';
import {
    Button,
    Divider,
    Grid,
    Header,
    Icon,
    Search,
    Segment,
} from 'semantic-ui-react';

class Login extends React.Component {
    state = {
    }

    render () {

        const seg = <Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>
                <Divider vertical>Or</Divider>
                <Grid.Row verticalAlign='middle'>

                    <Grid.Column>
                        <Header icon>
                            <Icon name='login'/>
                            Login
                            <LoginPanel/>
                        </Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Header icon>
                            <Icon name='register'/>
                            Register 
                            <SignupPanel/>
                        </Header>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </Segment>
        return (
            <div>
                <div style={titleStyle}>
                    <Header size='huge'>CARPOOLING</Header>
                    <Header size='medium'>a 2102 project</Header>
                </div>
                {seg}
            </div>
        );
            //<div>
            //    <h1>CARPOOLING </h1>
            //    <h3>2102</h3>
            //    <LoginPanel />
            //    <SignupPanel/>
            //</div>
    }
}

const titleStyle = {
    textAlign: 'center',
    padding: '30px',
}

export default Login;
