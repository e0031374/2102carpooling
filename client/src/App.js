import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Passenger from './components/pages/Passenger';
import Driver from './components/pages/Driver';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
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
                        <Route path="/home" component={Home}/>
			<Route path="/passenger" component={Passenger}/>
                        <Route path="/driver" component={Driver}/>
			<Route path="/settings" component={Settings}/>
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
