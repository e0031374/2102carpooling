import React from 'react';
import { Card, Label, Button, Header, Modal, Container, 
    Form, TextArea, Radio } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendFeedback } from '../../actions/memberActions';

// TODO submit form action only, reducer will be in the receive feedback section
class MemberRatingForm extends React.Component {
    state = { 
        modalOpen: false,
        giver: "", // auto fill with current user name
        receiver: "",
        rating: 0, // or whatever previous rating was
        feedback: "", // message to be stored
        timestamp: "",
    };

    componentDidMount() {
        console.log("weee");
        this.setState({ 
            giver: this.props.login.user,
            receiver: this.props.receiver,
            timestamp: this.currTime()
        });
    }
    
    handleOpen = () => this.setState({ modalOpen: true });
    handleClose = () => this.setState({ modalOpen: false });
    onChange = (e, {name, value}) => {
        this.setState({ [name]: value })
        console.log(this.state);
    };

    currTime = () => {
        const currDate = new Date();
        const now = "" + currDate.getYear() + "-"
            + (currDate.getMonth() + 1) + "-"
            + currDate.getDate() + " "
            + currDate.getHours() + ":"
            + currDate.getMinutes() + ":"
            + currDate.getSeconds() + "";
        console.log("currTime called");
        console.log(now);
        return now;
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ timestamp: this.currTime() });
        console.log(this.state);
        const { giver, receiver } = this.state;
        if ( giver == receiver ) {
            console.log("error giver cannot be same as receiver");
            this.handleClose();
            return;
        }
        this.props.sendFeedback(this.state);
        this.handleClose();
        //const user = this.state.uname;
        //this.props.loginValidate({...this.state});

        //if (this.props.login.isLoggedIn) {
        //    console.log("login success");
        //    //route to homepage
        //} else {
        //    console.log("login failure");
        //    this.setState({...this.state, 
        //        msg: this.props.login.authError});
        //}
        //this.props.getSettings(user);
    }

    render() {
        const radioBtns = [1,2,3,4,5,6,7,8,9,10].map(num => {
            const numStr = num;
            return (<Form.Field
            control={Radio}
            name="rating"
            value={numStr}
            label={numStr}
            checked={this.state.rating === numStr}
            onChange={this.onChange}
            />);
        });
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen}>Rate User</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                size='small'
            >
                <Header icon='browser' content='Submit user feedback'/>
                <Modal.Content>
                    <h3>Form to submit user feedback and ratings</h3>
                    <Form>
                        <Form.Group inline>
                            <label>Rating</label>
                            {radioBtns}
                        </Form.Group>
                        <Form.Field
                            control={TextArea}
                            label='Feedback'
                            name='feedback'
                            placeholder='Feedback'
                            onChange={this.onChange}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.onSubmit} inverted>
                        Submit
                    </Button>
                    <Button color='red' onClick={this.handleClose} inverted>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

MemberRatingForm.propTypes = {
    login: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    login: state.login,
});

export default connect(
    mapStateToProps, 
    {sendFeedback}
)(MemberRatingForm);
