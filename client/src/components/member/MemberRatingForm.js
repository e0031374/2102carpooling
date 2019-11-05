import React from 'react';
import { Card, Label, Button, Header, Modal, Container, 
    Form, TextArea, Radio } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class MemberRatingForm extends React.Component {
    state = { 
        modalOpen: false,
        uname: "", // auto fill with current user name
        rating: 0, // or whatever previous rating was
        feedback: "", // message to be stored
    };
    
    handleOpen = () => this.setState({ modalOpen: true });
    handleClose = () => this.setState({ modalOpen: false });
    onChange = (e, {name, value}) => {
        this.setState({ [name]: value })
        console.log(this.state);
    };

    onSubmit = (e) => {
        e.preventDefault();
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
                            <Form.Field
                                control={Radio}
                                name="rating"
                                value='1'
                                label='Bad'
                                checked={this.state.rating === '1'}
                                onChange={this.onChange}
                            />
                            <Form.Field
                                control={Radio}
                                name="rating"
                                value='2'
                                label='Good'
                                checked={this.state.rating === '2'}
                                onChange={this.onChange}
                                inverted
                            />
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
                    <Button color='green' onClick={this.handleClose} inverted>
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
