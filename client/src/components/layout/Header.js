import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from  'react-router-dom';


class Header extends React.Component {
    conponentDidMount() {
    }
    
    render() {
        //why job tho?
        console.log(this.props.login)
        //const {uname}  = this.props.uname
        //console.log(uname)
        //console.log(this.props.uname)
        const user = <p>Hello {this.props.login.user}</p>
	if (this.props.login.user === "") return <Redirect to='/' />
        return (
            <header style={headerStyle}>
                <h1>Header</h1>
                {user}
                <nav className="panel">
                    <ul >
                        <Link to="/home">Home</Link>
                        <Link to="/passenger">Passenger</Link>
                        <Link to="/driver">Driver</Link>
                        <Link to="/advertizer">Advertizer</Link>
                        <Link to="/settings">Setting</Link>
                    </ul>
                </nav>
                
            </header>
        );
    }
}

                        //<li style={linkStyle}><a href="/home">Home</a></li>
                        //<li style={linkStyle}><a href="/passenger">Passenger</a></li>
                        //<li style={linkStyle}><a href="/driver">Driver</a></li>
			            //<li style={linkStyle}><a href="/settings">Settings</a></li>
//gonna need to Link Sty;e later

const headerStyle = {
    textAlign: 'center',
}

const linkStyle = {
    display: 'inline',
    padding: '10px'
}

const mapStateToProps = state => ( {
    login: state.login,
    job: state.job
});

export default connect(
    mapStateToProps,
)(Header);
