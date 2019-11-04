import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Passenger from './components/pages/Passenger';
import Driver from './components/pages/Driver';
import JobProfile from './components/driver/JobProfile';
import CarProfile from './components/driver/subpages/CarProfile';
import Insurance from './components/driver/subpages/Insurance';
import Advertizer from './components/pages/Advertizer';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Landing from './components/pages/Landing';
import ForgotPass from './components/pages/ForgotPass';
import Settings from './components/pages/Settings';


//redux
import { Provider } from 'react-redux';
import store from './store';


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route exact path="/" component={Login}/>
                        <Route path="/landing" component={Landing}/>
                        <Route path="/home" component={Home}/>
			            <Route path="/passenger" component={Passenger}/>
                        <Route path="/driver" component={Driver}/>
                        <Route path="/driver/jobprofile" component={JobProfile}/>
                        <Route path="/driver/carprofile" component={CarProfile}/>
                        <Route path="/driver/insurance" component={Insurance}/>
                        <Route path="/advertizer" component={Advertizer}/>
			            <Route path="/settings" component={Settings}/>
			            <Route path="/forgot" component={ForgotPass}/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

                         //<Route exact path="/" render={ props => (
                         //   <div className="App">
                         //       <h1>Hello</h1>
                         //   </div>
                         //)}/>

export default App;
