import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Outlet from '../../components/Outlet';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function Dashboard({ auth }) {
    const [openMenu, setOpenMenu] = useState(false);
    // if (!auth) {
    //     return;
    // }
    return (
        <div className="vz_main_sec">
            <Sidebar openMenu={openMenu} />
            <Header openMenu={()=> setOpenMenu(!openMenu)} />
            <Outlet />
            <Footer />
        </div>
    )
}

function mapStatesToProps(state) {
    return { auth: state.auth };
}

export default compose(withRouter, connect(mapStatesToProps))(Dashboard);