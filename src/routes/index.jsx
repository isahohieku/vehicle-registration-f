import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Views
import Home from '../views/Home';
import Dashboard from '../views/Dashboard';
import Signup from '../views/Signup';
import OrganizationsOverview from '../views/OrganizationsOverView';
import AddOrganization from '../views/AddOrganization';
import ConfirmMail from '../views/ConfirmMail';
import ForgotPassword from '../views/ForgotPassword';
import ResetPassword from '../views/ResetPassword';

const Routes = () => (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={Signup} />
        <Route path='/confirm-email' component={ConfirmMail} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/reset-password' component={ResetPassword} />
        <Route exact path='/organizations' component={OrganizationsOverview} />
        <Route exact path="/organizations/add-organization" component={AddOrganization} />
        <Route path="/organizations/:id" component={Dashboard} />
      </Switch>
    </Router>
);

export default Routes
