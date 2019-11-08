import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { postAd } from '../../actions/adActions';
import { Confirm, Grid, Icon, Form, Button, Loader } from 'semantic-ui-react';

class AddAdItem extends React.Component {
    state = {
        advertiser: "",
        misc_advert: "",
    };

    componentDidMount() {
        const advertiser = this.props.login.user;
        this.setState({ advertiser });
        console.log(this.state);
    }

    //name and value is from te <Form.Input/>
    onChange = (e, {name, value}) => this.setState({ [name]: value });
    onCheck = (e, {name, value}) => this.setState({ [name]: ! this.state[name] });

    onSubmit = (evenT) => {
        evenT.preventDefault();
        const advertiser = this.props.login.user;
        this.setState({ advertiser });
        console.log(this.state);

        // Add job via addJob action
        this.props.postAd(this.state);

    }

    render() {
        return (
            <div>
            <Grid container>
            <Grid.Row>
            <Grid.Column>
            <Form onSubmit={this.onSubmit}>
                <Form.Input
                    label="Advert Text"
                    type="text"
                    name="misc_advert"
                    placeholder="golden apple"
                    onChange={this.onChange}
                />
                <Form.Button
                    onClick={this.onSubmit}
                >Submit</Form.Button>
            </Form>
            </Grid.Column>
            </Grid.Row>
            </Grid>
            </div>
        );
    }
}

const container = {
    paddingTop: '80px',
}

AddAdItem.propTypes = {
    postAd: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    driver: state.driver,
    job: state.jobs,
    login: state.login,
});

export default connect(mapStateToProps, {postAd})(AddAdItem);


