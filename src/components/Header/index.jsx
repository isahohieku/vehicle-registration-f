import React, { Fragment, useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Lock, ChevronDown, Bell, Mail, Power } from 'react-feather';
import { Dropdown } from 'react-bootstrap';
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
                        <NavLink to="/organizations" className="nav_logo rt_logo"><img src={LogoDark} style={{ height: 30 }} alt="logo" /></NavLink>
                        <NavLink to="/organizations" className="nav_logo nav_logo_mob"><img src="mobile-logo.svg" alt="logo" /></NavLink>

                    </div>
                    <div className="nav_wrapper_main d-flex align-items-center justify-content-between flex-grow-1">
                        <button onClick={() => { setOpenMenu(!toggleOpenMenu); openMenu() }} className={"btn vz_mobile_menu_icon mr-3 d-md-flex d_none_sm " + (toggleOpenMenu ? 'on' : '')}
                            id="vz_mobileCollapseIcon"><span></span></button>
                        <form className="search-field d-md-flex d_none_sm">
                            <div className="form-group mb-0">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="feather ft-search"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="search here..." />
                                </div>
                            </div>
                        </form>
                        <ul className="navbar-nav navbar-nav-right mr-0 ml-auto">
                            <li className="nav-item dropdown">
                                <button className="nav-link count-indicator dropdown-toggle" id="notificationDropdown"
                                    data-toggle="dropdown">
                                    <Bell size={16} />
                                    <span className="count"></span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown rt-notification-list"
                                    aria-labelledby="notificationDropdown">
                                    <div className="dropdown-item">
                                        <p className="mb-0 font-weight-normal float-left">You have 3 new notifications</p>
                                        <NavLink to="/" className="btn view_btn">view all</NavLink>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item rt-notification-item">
                                        <div className="rt-notification-thumbnail">
                                            <div className="rt-notification-icon">
                                                <i className="ti-map-alt text-info mx-0"></i>
                                            </div>
                                        </div>
                                        <div className="rt-notification-item-content">
                                            <h6 className="rt-notification-subject text-info font-weight-normal mb-1">You added your Location</h6>
                                            <p className="font-weight-light small-text mb-0">
                                                Just now
                                    </p>
                                        </div>
                                    </button>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item rt-notification-item">
                                        <div className="rt-notification-thumbnail">
                                            <div className="rt-notification-icon">
                                                <i className="ti-bolt-alt text-primary mx-0"></i>
                                            </div>
                                        </div>
                                        <div className="rt-notification-item-content">
                                            <h6 className="rt-notification-subject font-weight-normal text-primary mb-1">Your Subscription Expired</h6>
                                            <p className="font-weight-light small-text mb-0">
                                                30 Seconds ago</p>
                                        </div>
                                    </button>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item rt-notification-item">
                                        <div className="rt-notification-thumbnail">
                                            <div className="rt-notification-icon">
                                                <i className="ti-heart text-secondary mx-0"></i>
                                            </div>
                                        </div>
                                        <div className="rt-notification-item-content">
                                            <h6 className="rt-notification-subject text-secondary font-weight-normal mb-1">Some special like you</h6>
                                            <p className="font-weight-light small-text mb-0">
                                                Just Now</p>
                                        </div>
                                    </button>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item rt-notification-item">
                                        <div className="rt-notification-thumbnail">
                                            <div className="rt-notification-icon">
                                                <i className="ti-comments text-danger mx-0"></i>
                                            </div>
                                        </div>
                                        <div className="rt-notification-item-content">
                                            <h6 className="rt-notification-subject text-danger font-weight-normal mb-1">New Commetns On Post</h6>
                                            <p className="font-weight-light small-text mb-0">
                                                Just Now
                                    </p>
                                        </div>
                                    </button>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item rt-notification-item">
                                        <div className="rt-notification-thumbnail">
                                            <div className="rt-notification-icon">
                                                <i className="ti-settings text-success mx-0"></i>
                                            </div>
                                        </div>
                                        <div className="rt-notification-item-content">
                                            <h6 className="rt-notification-subject text-success font-weight-normal mb-1">You changed your Settings</h6>
                                            <p className="font-weight-light small-text mb-0">
                                                Just Now
                                    </p>
                                        </div>
                                    </button>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <Dropdown show={messageDropdownOpen} onToggle={toggleMessageDropdown}>
                                    <Dropdown.Toggle className="nav-link count-indicator dropdown-toggle" id="messageDropdown">
                                        <Mail size={16} />
                                        <span className="count"></span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right navbar-dropdown rt-notification-list" aria-labelledby="messageDropdown" style={{ width: 342 }}>
                                        <Dropdown.Item>
                                            <p className="mb-0 font-weight-normal float-left">You have 3 New Messages</p>
                                            <NavLink to="/" className="view_btn">view all</NavLink>
                                        </Dropdown.Item>
                                        <div className="dropdown-divider"></div>
                                        <Dropdown.Item className="dropdown-item rt-notification-item">
                                            <div className="rt-notification-thumbnail">
                                                <img src="author-img1.jpg" className="profile-pic" alt="avatar" />
                                            </div>
                                            <div className="rt-notification-item-content flex-grow">
                                                <h6 className="rt-notification-subject ellipsis font-weight-medium">Jhon Doe
                                                    <span className="float-right font-weight-light small-text">3:15 PM</span>
                                                </h6>
                                                <p className="font-weight-light small-text">Hello are you there?</p>
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown rt-notification-list"
                                    aria-labelledby="messageDropdown">
                                    <div className="dropdown-item">
                                        <p className="mb-0 font-weight-normal float-left">You have 3 New Messages</p>
                                        <NavLink to="/" className="view_btn">view all</NavLink>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <button className="btn dropdown-item rt-notification-item">
                                        <div className="rt-notification-thumbnail">
                                            <img src={ProfileImage} className="profile-pic" alt="avatar" />
                                        </div>
                                        <div className="rt-notification-item-content flex-grow">
                                            <h6 className="rt-notification-subject ellipsis font-weight-medium">Jhon Doe
                                        <span className="float-right font-weight-light small-text">3:15 PM</span>
                                            </h6>
                                            <p className="font-weight-light small-text">
                                                Hello are you there?
                                    </p>
                                        </div>
                                    </button>
                                    <div className="btn dropdown-divider"></div>
                                    <button className="btn dropdown-item rt-notification-item">
                                        <div className="rt-notification-thumbnail">
                                            <img src="author/author-img2.jpg" className="profile-pic" alt="avatar" />
                                        </div>
                                        <div className="rt-notification-item-content flex-grow">
                                            <h6 className="rt-notification-subject ellipsis font-weight-medium">David Boos
                                        <span className="float-right font-weight-light small-text">1:25 PM</span>
                                            </h6>
                                            <p className="font-weight-light small-text">
                                                Waiting for your Response...
                                    </p>
                                        </div>
                                    </button>
                                    <div className="dropdown-divider"></div>
                                    <button className="btn dropdown-item rt-notification-item">
                                        <div className="rt-notification-thumbnail">
                                            <img src="user.jpg" className="profile-pic" alt="avatar" />
                                        </div>
                                        <div className="rt-notification-item-content flex-grow">
                                            <h6 className="rt-notification-subject ellipsis font-weight-medium"> Jason Roy
                                        <span className="float-right font-weight-light small-text">5:21 PM</span>
                                            </h6>
                                            <p className="font-weight-light small-text">
                                                Hi there, Hope you are well
                                    </p>
                                        </div>
                                    </button>
                                    <div className="dropdown-divider"></div>
                                    <button className="btn dropdown-item rt-notification-item">
                                        <div className="rt-notification-thumbnail">
                                            <img src="author/author-img3.jpg" className="profile-pic" alt="avatar" />
                                        </div>
                                        <div className="rt-notification-item-content flex-grow">
                                            <h6 className="rt-notification-subject ellipsis font-weight-medium"> Malika Roy
                                        <span className="float-right font-weight-light small-text">2:30 PM</span>
                                            </h6>
                                            <p className="font-weight-light small-text">
                                                Your Product Dispatched ...
                                    </p>
                                        </div>
                                    </button>
                                </div>
                            </li>
                            <li className="nav-item nav-profile dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="/" data-toggle="dropdown" id="profileDropdown">
                                    <span className="profile_sec">

                                        <span className="profile_name">
                                            <span className="hi_name">Hello,</span> {user.fullName} <i className=""><ChevronDown size={14} /></i>
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