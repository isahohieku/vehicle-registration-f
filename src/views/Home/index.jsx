import React, { useState } from 'react';
import { connect } from 'react-redux';
import { emailValidator, setToken, setUserData } from '../../utils/helpers';
import * as actions from '../../store/actions';
import LogoLogin from '../../svg/logo-login.svg';
import Man from '../../img/bg-01.jpg';
import { postRequest } from '../../utils/axios';
import { NavLink } from 'react-router-dom';



function Home({ changeAuth, history }) {

    const [loginForm, setLoginForm] = useState({
        email: { value: '', focus: false, error: '' },
        password: { value: '', focus: false, error: '' }
    });

    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        const copy = { ...loginForm };
        copy[e.target.name].value = e.target.value;
        setLoginForm(copy);
    }

    const handleFocus = e => {
        const copy = { ...loginForm };
        copy[e.target.name].focus = true;
        setLoginForm(copy);
    }

    const handleBlur = e => {
        if (e.target.value !== '') return;
        const copy = { ...loginForm };
        copy[e.target.name].focus = false;
        setLoginForm(copy);
    }

    function onsubmit(e) {
        e.preventDefault();
        const { email, password } = loginForm;
        email.error = '';
        password.error = '';

        if (!email.value || !emailValidator(email.value)) {
            email.error = 'Enter a valid email address'
        }

        if (!password.value || (password.value.length < 6)) {
            password.error = 'Enter a minimum of 6 character password'
        }

        setLoginForm({ email, password });

        if (email.error || password.error) {
            return;
        }

        const path = 'auth/login';
        const data = {
            email: email.value,
            password: password.value
        }

        setLoading(true);
        postRequest(path, data)
            .then(res => {
                if (!res.data.data.isEmailVerified) {
                    setLoading(false);
                    alert('Go to email to verify email');
                    return;
                }
                setToken(res.data.data.token);
                setUserData(res.data.data);
                setLoading(false);
                changeAuth(true);
                history.push('/organizations');
            })
            .catch(e => { console.log(e); setLoading(false); });
    }

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form">
                        <div className="login-form-body text-center p-4">
                            <img src={LogoLogin} className="mb-5" alt="Logo" />
                            <div className={"form-gp" + (loginForm.email.focus ? ' focused' : '')}>
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" name="email" className={"" + (loginForm.email.error ? 'border-bottom-danger' : '')}
                                    value={loginForm.email.value}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    id="exampleInputEmail1"
                                />
                                <i className="ti ti-email"></i>
                            </div>
                            {loginForm.email.error && <p className="text-danger text-left pb-4">{loginForm.email.error}</p>}

                            <div className={"form-gp" + (loginForm.password.focus ? ' focused' : '')}>
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" name="password" className={"" + (loginForm.password.error ? 'border-bottom-danger' : '')}
                                    value={loginForm.password.value}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    id="exampleInputPassword1"
                                />
                                <i className="ti ti-lock"></i>
                            </div>
                            {loginForm.password.error && <p className="text-danger text-left">{loginForm.password.error}</p>}
                            <div className="row mb-4 rmber-area">
                                <div className="col-6">

                                </div>
                                <div className="col-6 text-right">
                                    <NavLink to="/forgot-password" className="er-text-primary">Forgot Password?</NavLink>
                                </div>
                            </div>
                            <div className="submit-btn-area">
                                <button id="form_submit" type="submit"
                                    className="btn btn-primary d-flex align-items-center justify-content-center" disabled={loading}
                                    onClick={(e) => onsubmit(e)}>
                                    Submit {loading ? <i className="fa fa-spinner fa-spin ml-2"></i> : <i className="ti ti-arrow-right"></i>}</button>
                            </div>

                            <div className="row mt-4 rmber-area">
                                <div className="col text-center">
                                    <p class="text-muted">Don't have an account? <NavLink to="/signup" class="er-text-primary">Sign up</NavLink></p>
                                </div>
                            </div>
                        </div>

                    </form>

                    <div className="login100-more" style={{ backgroundImage: `url(${Man})` }}></div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(Home);