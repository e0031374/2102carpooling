import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class History extends React.Component {

    state = {
        uname: "",
        history: [],
    }

    componentDidMount() {
        const uname = this.props.login.user;

        //call action to get history based on uname

        const { history } = this.props.history;
        this.setState({ uname, history });
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

History.propTypes = {
    history: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    login: state.login,
    history: state.history,
});

export default connect(
    mapStateToProps, 
    {}
)(History);
