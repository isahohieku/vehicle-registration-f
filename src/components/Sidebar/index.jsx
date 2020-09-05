import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Home, DollarSign, ShoppingBag, Users } from 'react-feather';

function Sidebar({ organizationId, match }) {
    const organization = organizationId || match.params.id;
    return (
        //  className={"vz_navbar" + (openMenu ? '' : ' navbar-collapsed')}
        <nav className="vz_navbar navbar-collapsed">
            <div className="navbar-wrapper">
                <div className="navbar-content scroll-div">
                    <div className="vz_navigation">
                        <ul className="sidebar nav flex-column">
                            <li className="active">
                                <NavLink to={`/organizations/${organization}`} className="nav-link text-center" data-nav="dashboard">
                                    <i ><Home size={22} /></i><span>Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/organizations/${organization}/expenses`} className="nav-link text-center" data-nav="dashboard">
                                    <i ><DollarSign size={22} /></i><span>Expenses</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/organizations/${organization}/expense-types`} className="nav-link text-center" data-nav="dashboard">
                                    <i ><ShoppingBag size={22} /></i><span>Expense Types</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/organizations/${organization}/members`} className="nav-link text-center" data-nav="dashboard">
                                    <i ><Users size={22} /></i><span>Members</span>
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