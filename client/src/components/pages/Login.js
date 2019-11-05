import React from 'react';
import LoginPanel from '../login/LoginPanel';
import SignupPanel from '../login/SignupPanel';
import styles from '../../static/css/Home.module.css';
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
                <div className={styles.titleStyle}>
                    <h1>CARPOOLING</h1>
                    <h3>a 2102 project</h3>
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
    backgroundColor: '#ee6e73',
    fontWeight: "300px",
    color: "#fff",
    textAlign: 'center',
    padding: '30px',
}

export default Login;
