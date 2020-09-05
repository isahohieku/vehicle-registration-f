import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToken, getUserData } from '../../util/helpers';
// import Toast from './util/toast';
import * as actions from '../../store/actions';

export default (ChildComponent) => {
    class ComposedComponent extends Component {

        componentDidMount() {
            this.navigateAway();
        }

        componentDidUpdate() {
            this.navigateAway();
        }

        navigateAway() {
            if (!this.props.auth || !this.checkLocalStorage()) {
                this.props.history.push('/');
                this.props.changeAuth(false);
                return;
            }

            // Restrict modules by user role here
            // checkIfShouldAccessDashbord()
        }

        checkLocalStorage() {
            if (getUserData() === null && !getToken()) {
                return false;
            }
            return true;
        }

        checkIfShouldAccessDashbord(location, role) {
            if (this.checkLocation(location) && !getUserData().roles.includes(role)) {
                Toast('You have no access to this dashboard', 'error');
                this.props.history.push('/');
                localStorage.clear();
                return;
            }
        }

        checkLocation(term) {
            const result = this.props.location.pathname.includes(term);
            return result;
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return { auth: state.auth }
    }

    return connect(mapStateToProps, actions)(ComposedComponent);
} 