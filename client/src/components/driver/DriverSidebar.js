import React from 'react';
import { Link } from 'react-router-dom';
import JobProfile from './JobProfile';
import CarProfile from './subpages/CarProfile';
import ConfirmProfile from './ConfirmProfile';
import Insurance from './subpages/Insurance';
import { Menu, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getJobs, deleteJob } from '../../actions/jobActions';
import { getInsuranceCompanies, getAreas, getConfirmBid } from '../../actions/driverActions';

class DriverSidebar extends React.Component {
    state = { activeItem: 'jobprofile' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    componentDidMount() {
        this.props.getInsuranceCompanies();
        this.props.getConfirmBid(this.props.login.user);
        this.props.getAreas();
        //this.props.getJobs(this.props.login.user);
        //this.props.getConfirmBid(this.props.login.user);
    }

    render() {
        const { activeItem } = this.state;
        const renderItem = activeItem === 'jobprofile'
            ? <JobProfile/>
            : activeItem === 'confirmprofile' ? <ConfirmProfile/>
            : activeItem === 'carprofile' ? <CarProfile/>
            : activeItem === 'insurance' ? <Insurance/>
            : <JobProfile/>;

        return (
            <div style={container}>
            <Grid container>
            <Grid.Row>
                <Grid.Column width={4}>
                <Menu pointing seconday vertical>
                    <Menu.Item
                        name='jobprofile'
                        active={activeItem === 'jobprofile'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='confirmprofile'
                        active={activeItem === 'confirmprofile'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='carprofile'
                        active={activeItem === 'carprofile'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='insurance'
                        active={activeItem === 'insurace'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
                </Grid.Column>
                <Grid.Column stretched width={12}>
                    <Segment>
                    {renderItem}
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            </Grid>
            </div>
        );
    }


}

const container = {
}


const mapStateToProps = (state) => ({
    login: state.login,
    job: state.job
});

export default connect(
    mapStateToProps, 
    {getJobs, deleteJob, getInsuranceCompanies, getAreas, getConfirmBid }
)(DriverSidebar);
//export default DriverSidebar;

