import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopupForm from '../ewallet/TopupForm';
import { Card } from 'semantic-ui-react';

class Ewallet extends React.Component {

    state = {
        uname: "",
        balance: 0,
        ccnum: "",
        reload: 0,
    }

    reloadComp = () => {
        const newVal = this.state.reload + 1;
        this.setState({ reload: newVal });
    }

    componentDidMount() {
        console.log(this.props.ewallet)
        const uname = this.props.login.user;
        // get the current balance with uname as arg
        const { balance, ccnum } = this.props.ewallet;
        this.setState({ uname, balance, ccnum });
    }

    render() {
        const { uname, balance, ccnum } = this.state;
        const balanceCard = <Card>
                <Card.Content>
                    <Card.Header>{`Balance: ${balance} dollars`}</Card.Header>
                    <Card.Meta>{`Current balance for user: ${uname}`}</Card.Meta>
                    <Card.Description>
                        {`Linked to Credit Card Number: ${ccnum}`}
                    </Card.Description>
                </Card.Content>
            </Card>

        return (
            <div>
                {balanceCard}
                <TopupForm reload={this.reloadComp}/>
            </div>
        );
    }
}

// create a card and model for user?

const searchContainer = {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
}


Ewallet.propTypes = {
    ewallet: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    login: state.login,
    ewallet: state.ewallet,
});

export default connect(
    mapStateToProps, 
    {}
)(Ewallet);
