import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Home, Menu, Settings, Edit } from 'react-feather';

function Sidebar() {
    return (
        //  className={"vz_navbar" + (openMenu ? '' : ' navbar-collapsed')}
        <nav className="vz_navbar navbar-collapsed">
            <div className="navbar-wrapper">
                <div className="navbar-content scroll-div">
                    <div className="vz_navigation">
                        <ul className="sidebar nav flex-column">
                            <li className="active">
                                <NavLink to='/app' className="nav-link text-center" data-nav="dashboard" activeClassName="active" exact={true}>
                                    <i ><Home size={22} /></i><span>Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/app/applications' className="nav-link text-center" activeClassName="active" data-nav="dashboard">
                                    <i ><Menu size={22} /></i><span>Applications</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/app/settings' className="nav-link text-center" activeClassName="active" data-nav="dashboard">
                                    <i ><Settings size={22} /></i><span>Settings</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function mapStatesToProps(state) {
    return { organizationId: state.organizationId };
}

export default compose(withRouter, connect(mapStatesToProps))(Sidebar);