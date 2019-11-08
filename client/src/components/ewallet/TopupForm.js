import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { setBalance } from '../../actions/ewalletActions';

class TopupForm extends React.Component {
    state = {
        uname: "",
        amount: 0,
    }

    onChange = (e, {name, value}) => this.setState({ [name]: value });
    onCheck = (e, {name, value}) => this.setState({ [name]: ! this.state[name] });

    componentDidMount() {
        console.log(this.props.ewallet)
        const uname = this.props.login.user;
        // get the current balance with uname as arg
        const { balance, ccnum } = this.props.ewallet;
        this.setState({ uname, balance, ccnum });
    }


    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.amount <= 0) return;

        console.log(this.state);
        console.log(this.state.amount);
        this.props.setBalance(this.state);
        this.props.reload();

        // Add car via addCar action
        //this.props.addCar(newCar);
    }

    render() {
        return (
            <Form>
                <Form.Input
                    label="Amount to Topup in Dollars"
                    type="number"
                    name="amount"
                    placeholder="240"
                    onChange={this.onChange}
                />
                <Form.Button
                   onClick={this.onSubmit}
                >Submit</Form.Button>
            </Form>
        );
    }
}


TopupForm.propTypes = {
    //addCar: PropTypes.func.isRequired,
    reload: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    ewallet: state.ewallet,
    login: state.login,
});

export default connect(mapStateToProps, 
    {setBalance})(TopupForm);

