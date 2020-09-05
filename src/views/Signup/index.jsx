import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { postRequest } from '../../utils/axios';
import { emailValidator } from '../../utils/helpers';
import Background from '../../img/bg-01.jpg';
import LogoLogin from '../../svg/logo-login.svg';
import { NavLink } from 'react-router-dom';

function Signup({ changeAuth, history }) {

    const [signupForm, setSignupForm] = useState({
        email: { value: '', focus: false, error: '' },
        password: { value: '', focus: false, error: '' },
        firstName: { value: '', focus: false, error: '' },
        lastName: { value: '', focus: false, error: '' }
    });

    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        const copy = { ...signupForm };
        copy[e.target.name].value = e.target.value;
        setSignupForm(copy);
    }

    const handleFocus = e => {
        const copy = { ...signupForm };
        copy[e.target.name].focus = true;
        setSignupForm(copy);
    }

    const handleBlur = e => {
        if (e.target.value !== '') return;
        const copy = { ...signupForm };
        copy[e.target.name].focus = false;
        setSignupForm(copy);
    }

    const onsubmit = e => {
        e.preventDefault();
        const { email, password, firstName, lastName } = signupForm;
        email.error = '';
        password.error = '';
        firstName.error = '';
        lastName.error = '';

        if (!email.value || !emailValidator(email.value)) {
            email.error = 'Enter a valid email address';
        }

        if (!firstName.value) {
            firstName.error = 'Enter a valid name';
        }

        if (!lastName.value) {
            lastName.error = 'Enter a valid name';
        }

        if (!password.value || (password.value.length < 6)) {
            password.error = 'Enter a minimum of 6 character password';
        }

        setSignupForm({ email, password, firstName, lastName });

        if (email.error || password.error || firstName.error || lastName.error) {
            return;
        }

        const path = 'auth';
        const data = {
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value
        }

        setLoading(true);
        postRequest(path, data)
            .then(res => {
                history.push('/');

                setLoading(false);
            })
            .catch(e => { console.log(e); setLoading(false); });
    }

    return (
        <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100">
                    <form class="login100-form validate-form">
                        <div class="login-form-body text-center p-4">
                            <img src={LogoLogin} className="mb-5" alt="Logo" />

                            <div class={"form-gp" + (signupForm.firstName.focus ? ' focused' : '')}>
                                <label htmlFor="exampleInputName1">FirstName</label>
                                <input type="text" name="firstName" id="exampleInputName1"
                                    value={signupForm.firstName.value}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <i class="ti ti-user"></i>
                            </div>
                            {signupForm.firstName.error && <p className="text-danger text-left pb-4">{signupForm.firstName.error}</p>}

                            <div class={"form-gp" + (signupForm.lastName.focus ? ' focused' : '')}>
                                <label htmlFor="exampleInputName1">LastName</label>
                                <input type="text" name="lastName" id="exampleInputName1"
                                    value={signupForm.lastName.value}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <i class="ti ti-user"></i>
                            </div>
                            {signupForm.lastName.error && <p className="text-danger text-left pb-4">{signupForm.lastName.error}</p>}

                            <div class={"form-gp" + (signupForm.email.focus ? ' focused' : '')}>
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" name="email" id="exampleInputEmail1"
                                    value={signupForm.email.value}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <i class="ti ti-email"></i>
                            </div>
                            {signupForm.email.error && <p className="text-danger text-left pb-4">{signupForm.email.error}</p>}

                            <div class={"form-gp" + (signupForm.password.focus ? ' focused' : '')}>
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" name="password" id="exampleInputPassword1"
                                    value={signupForm.password.value}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <i class="ti ti-lock"></i>
                            </div>
                            {signupForm.password.error && <p className="text-danger text-left pb-4">{signupForm.password.error}</p>}

                            <div class="submit-btn-area">
                                <button id="form_submit" type="submit"
                                    className="btn btn-primary d-flex align-items-center justify-content-center" disabled={loading}
                                    onClick={(e) => onsubmit(e)}>
                                    Submit {loading ? <i className="fa fa-spinner fa-spin ml-2"></i> : <i className="ti ti-arrow-right"></i>}</button>
                            </div>
                            <div class="form-footer text-center mt-5">
                                <p class="text-muted">Already have an account? <NavLink to="/" class="er-text-primary">Sign in</NavLink></p>
                            </div>
                        </div>

                    </form>

                    <div class="login100-more" style={{ backgroundImage: `url(${Background})` }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(Signup);