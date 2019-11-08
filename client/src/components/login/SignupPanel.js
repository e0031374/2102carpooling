import React from 'react';
import { connect } from 'react-redux';
import { addAccount } from '../../actions/loginActions';
import FixedCard from '../layout/FixedCard';
import { Confirm, Grid, Icon, Form, Button, 
    Loader, Header, Card } from 'semantic-ui-react';


class SignupPanel extends React.Component {
    state = {
        uname: "",
        pass: "",
        ccnum: "",
        driver: false,
        advert: false,
        passenger: true,
    };

    onChange = (e, {name, value}) => this.setState({ [name]: value });
    onCheck = (e, {name, value}) => this.setState({ [name]: ! this.state[name] });
    //onChange = (e) => this.setState({
    //    [e.target.name]: e.target.value
    //});

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addAccount({...this.state});
        if (this.props.login.isLoggedIn) {
            console.log("signup success");
            //route to homepage
        } else {
            console.log("signup failure");
        }
    }    

    render() {
        const formSignUp = <Form onSubmit={this.onSubmit}>
                <div>
                    <Form.Input 
                        label="Desired Username"
                        type="text"
                        name="uname"
                        placeholder="johndoe"
                        value={this.state.uname}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <Form.Input 
                        label="Desired Password"
                        type="text"
                        name="pass"
                        placeholder="password"
                        value={this.state.pass}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <Form.Input 
                        label="Credit Card Number"
                        type="number"
                        name="ccnum"
                        placeholder="numeric only"
                        value={this.state.ccnum}
                        onChange={this.onChange}
                    />
                </div>
                <Form.Button onClick={this.onClick}>Submit</Form.Button>
            </Form>
        return(
            <div >
                {formSignUp}
            </div>
        ) 
    }
}

const cardStyle = {
    display: 'inline-block',
    width: '400px',
}

const  mapStateToProps = state => ({
    login: state.login    
});

export default connect(mapStateToProps, {addAccount})(SignupPanel);
