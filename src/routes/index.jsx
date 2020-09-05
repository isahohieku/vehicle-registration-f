import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RestrictedRoute from '../routes/private-routes';

//Views
import Home from '../views/Home';
import Dashboard from '../views/Dashboard';
import Signup from '../views/Signup';
import ConfirmMail from '../views/ConfirmMail';
import ForgotPassword from '../views/ForgotPassword';
import ResetPassword from '../views/ResetPassword';

const Routes = () => (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signup' component={Signup} />
        <Route path='/confirm-email' component={ConfirmMail} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/reset-password' component={ResetPassword} />
        <Route path="/app" component={RestrictedRoute(Dashboard)} />
      </Switch>
    </Router>
);

export default Routes
