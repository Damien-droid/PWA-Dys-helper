import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Exercise from './pages/Exercise';
import Validation from './pages/Validation';
import Settings from './pages/Settings';
import Parents from './pages/Parents';
import Header from './components/Header';
import Navigation from './components/Navigation';

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/exercise' component={Exercise} />
                <Route path='/validation' component={Validation} />
                <Route path='/settings' component={Settings} />
                <Route path='/parents' component={Parents} />
            </Switch>
            <Navigation />
        </Router>
    );
};

export default App;