import React, { useState } from 'react';
import { emailValidator } from '../../utils/helpers';
import LogoLogin from '../../svg/logo-login.svg';
import Man from '../../img/bg-01.jpg';
import { postRequest } from '../../utils/axios';
import { NavLink } from 'react-router-dom';



function ForgotPassword({history}) {

    const [forgotPasswordForm, setForgotPasswordForm] = useState({
        email: { value: '', focus: false, error: '' },
    });

    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        const copy = { ...forgotPasswordForm };
        copy[e.target.name].value = e.target.value;
        setForgotPasswordForm(copy);
    }

    const handleFocus = e => {
        const copy = { ...forgotPasswordForm };
        copy[e.target.name].focus = true;
        setForgotPasswordForm(copy);
    }

    const handleBlur = e => {
        if (e.target.value !== '') return;
        const copy = { ...forgotPasswordForm };
        copy[e.target.name].focus = false;
        setForgotPasswordForm(copy);
    }

    function onsubmit(e) {
        e.preventDefault();
        const { email } = forgotPasswordForm;
        email.error = '';

        if (!email.value || !emailValidator(email.value)) {
            email.error = 'Enter a valid email address'
        }

        setForgotPasswordForm({ email });

        if (email.error) {
            return;
        }

        const path = 'auth/user/forgot-password';
        const data = {
            email: email.value,
        }

        setLoading(true);
        postRequest(path, data)
            .then(res => {
                setLoading(false);
                // history.push('/organizations');
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

                            <p className="er-text-primary text-center">Forgot Password</p>
                            <div className={"form-gp" + (forgotPasswordForm.email.focus ? ' focused' : '')}>
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" name="email" className={"" + (forgotPasswordForm.email.error ? 'border-bottom-danger' : '')}
                                    value={forgotPasswordForm.email.value}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    id="exampleInputEmail1"
                                />
                                <i className="ti ti-email"></i>
                            </div>
                            {forgotPasswordForm.email.error && <p className="text-danger text-left pb-4">{forgotPasswordForm.email.error}</p>}

                            <div className="submit-btn-area">
                                <button id="form_submit" type="submit" 
                                className="btn btn-primary d-flex align-items-center justify-content-center" disabled={loading}
                                onClick={(e) => onsubmit(e)}>
                                    Submit {loading ? <i className="fa fa-spinner fa-spin ml-2"></i> : <i className="ti ti-arrow-right"></i>}</button>
                            </div>

                            <div className="row mt-4 rmber-area">
                                <div className="col text-center">
                                <p class="text-muted">Know your login details? <NavLink to="/" class="er-text-primary">Login</NavLink></p>
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

export default ForgotPassword;