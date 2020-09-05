import React, { useState } from 'react';
import LogoLogin from '../../svg/logo-login.svg';
import Man from '../../img/bg-01.jpg';
import { postRequest } from '../../utils/axios';
import { withRouter } from 'react-router-dom';

function ResetPassword({ location, history }) {
    const query = new URLSearchParams(location.search);

    const [resetPasswordForm, setResetPasswordForm] = useState({
        password: { value: '', focus: false, error: '' },
    });

    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        const copy = { ...resetPasswordForm };
        copy[e.target.name].value = e.target.value;
        setResetPasswordForm(copy);
    }

    const handleFocus = e => {
        const copy = { ...resetPasswordForm };
        copy[e.target.name].focus = true;
        setResetPasswordForm(copy);
    }

    const handleBlur = e => {
        if (e.target.value !== '') return;
        const copy = { ...resetPasswordForm };
        copy[e.target.name].focus = false;
        setResetPasswordForm(copy);
    }

    function onsubmit(e) {
        e.preventDefault();
        const { password } = resetPasswordForm;
        password.error = '';

        if (!password.value || (password.value.length < 6)) {
            password.error = 'Enter a minimum of 6 character password'
        }

        setResetPasswordForm({ password });

        if (password.error) {
            return;
        }

        const path = 'auth/user/reset-password';
        const data = {
            password: password.value,
            token: query.get('token'),
            email: query.get('email')
        }

        setLoading(true);
        postRequest(path, data)
            .then(res => {
                setLoading(false);
                (res.data.code === 'SUCCESS') && history.push('/');
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

                            <p className="er-text-primary text-center">Reset Password</p>
                            <div className={"form-gp" + (resetPasswordForm.password.focus ? ' focused' : '')}>
                                <label htmlFor="exampleInputEmail1">Password</label>
                                <input type="password" name="password" className={"" + (resetPasswordForm.password.error ? 'border-bottom-danger' : '')}
                                    value={resetPasswordForm.password.value}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    id="exampleInputEmail1"
                                />
                                <i className="ti ti-password"></i>
                            </div>
                            {resetPasswordForm.password.error && <p className="text-danger text-left pb-4">{resetPasswordForm.password.error}</p>}

                            <div className="submit-btn-area">
                                <button id="form_submit" type="submit"
                                    className="btn btn-primary d-flex align-items-center justify-content-center" disabled={loading}
                                    onClick={(e) => onsubmit(e)}>
                                    Submit {loading ? <i className="fa fa-spinner fa-spin ml-2"></i> : <i className="ti ti-arrow-right"></i>}</button>
                            </div>
                        </div>
                    </form>
                    <div className="login100-more" style={{ backgroundImage: `url(${Man})` }}></div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(ResetPassword);