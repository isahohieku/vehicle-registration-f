import React, { Fragment, useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Lock, ChevronDown, Bell, Mail, Power } from 'react-feather';
import { getUserData } from '../../utils/helpers/';
import LogoDark from '../../svg/logo-dark.svg';
import ProfileImage from '../../img/author-img1.jpg';
import './index.scss';

function Header({ openMenu, history }) {
    const [messageDropdownOpen, setMessageDropdownOpen] = useState(false);
    const toggleMessageDropdown = () => setMessageDropdownOpen(!messageDropdownOpen);
    const [toggleOpenMenu, setOpenMenu] = useState(false);
    const [user] = useState(() => getUserData());

    const logout = () => {
        localStorage.clear();
        history.push('/');
    }
    return (
        <Fragment>
            <header className="vz_main_header flex-grow-1 top_nav">
                <div className="container-fluid d-flex flex-row h-100 align-items-center">
                    <div className="text-center rt_nav_wrapper d-flex align-items-center">
                        <NavLink to="/dashboard" className="nav_logo rt_logo"><img src={LogoDark} style={{ height: 30 }} alt="logo" /></NavLink>
                        <NavLink to="/dashboard" className="nav_logo nav_logo_mob"><img src="mobile-logo.svg" alt="logo" /></NavLink>

                    </div>
                    <div className="nav_wrapper_main d-flex align-items-center justify-content-between flex-grow-1">
                        <ul className="navbar-nav navbar-nav-right mr-0 ml-auto">
                            <li className="nav-item nav-profile dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="/" data-toggle="dropdown" id="profileDropdown">
                                    <span className="profile_sec">

                                        <span className="profile_name">
                                            <span className="hi_name">Hello,</span> {user.firstName} {user.lastName} <i className=""><ChevronDown size={14} /></i>
                                        </span>
                                        <img src={ProfileImage} alt="profile" />
                                    </span>
                                </NavLink>
                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown pt-2"
                                    aria-labelledby="profileDropdown">
                                    <button className="btn dropdown-item">
                                        <i className="ti-user text-dark mr-3"></i> Profile
                            </button>
                                    <button className="btn dropdown-item">
                                        <i className="ti-settings text-dark mr-3"></i> Account Settings
                            </button>
                                    <button className="btn dropdown-item">
                                        <Lock className="feather ft-lock text-dark mr-3" />
                                Update Password
                            </button>
                                </div>
                            </li>
                            <li className="nav-item d_none_sm">
                                <button className="btn nav-link logout_link" onClick={() => logout()}>
                                    Logout <i><Power size={16} /></i>
                                </button>
                            </li>
                        </ul>
                        <span className="d-lg-none">
                            <button className="btn vz_mobile_menu_icon ml-3" id="vz_mobileCollapseIconMobile"><span></span></button>
                        </span>
                    </div>
                </div>
            </header>
        </Fragment>
    );
}

export default withRouter(Header);