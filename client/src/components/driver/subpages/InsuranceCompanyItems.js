import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { connect } from 'react-redux';

const InsuranceCompanyItems = (props) => {
    const companies = props.insuranceCompanies.map( x => {
        return <InsuranceCompanyItem insuranceCompany={x} />
    });
    return companies;
}

class InsuranceCompanyItem extends React.Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.insuranceCompany.cname}</Card.Header>
                    <Card.Meta>
                        {this.props.insuranceCompany.contactnum}
                    </Card.Meta>
                    <Card.Description>
                        {}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

InsuranceCompanyItem.propTypes = {
    insuranceCompany: PropTypes.array.isRequired,
}


const mapStateToProps = state => ({
    driver: state.driver,
});

export default connect(mapStateToProps, {})(InsuranceCompanyItems);
