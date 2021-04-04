import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToken, getUserData } from '../../utils/helpers';
// import Toast from './util/toast';
import * as actions from '../../store/actions';

export default (ChildComponent) => {
    class ComposedComponent extends Component {

        component

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
        }

        checkLocalStorage() {
            if (getUserData() === null && !getToken()) {
                return false;
            }
            return true;
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