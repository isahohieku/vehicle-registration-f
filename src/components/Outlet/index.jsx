import React from 'react';
import { Route } from 'react-router-dom';
import MainDashboard from '../../views/MainDashboard';
import Applications from '../../views/Applications';
import Settings from '../../views/Settings';

export default function Outlet() {
    return (
        <div className="vz_main_container">
            <div className="vz_main_content">
                <Route exact path="/app" component={MainDashboard} />
                <Route path="/app/applications" component={Applications} />
                <Route path="/app/settings" component={Settings} />
            </div>
        </div>
    )
}