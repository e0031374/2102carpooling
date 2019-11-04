import React from 'react';
import { connect } from 'react-redux';
import { addAccount } from '../../actions/loginActions';
import FixedCard from '../layout/FixedCard';


class SignupPanel extends React.Component {
    state = {
        uname: "",
        pass: "",
        driver: false,
        advert: false,
        passenger: true,
    };

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });

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
        const formSignUp = <form onSubmit={this.onSubmit}>
                <p>Sign Up for Carpooling </p>
                <div>
                    <label>Desired Uname</label>
                    <input 
                        type="text"
                        name="uname"
                        placeholder="johndoe"
                        value={this.state.uname}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <label>Desired Password</label>
                    <input 
                        type="text"
                        name="pass"
                        placeholder="password"
                        value={this.state.pass}
                        onChange={this.onChange}
                    />
                </div>
                <button>Submit</button>
            </form>
        return(
            <div style={cardStyle}>
                <FixedCard
                    title={'SignUp'}
                    msg={formSignUp}
                />
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
