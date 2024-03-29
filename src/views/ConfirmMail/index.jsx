import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { updateRequest } from '../../utils/axios';

function ConfirmMail({ location, history }) {
    const query = new URLSearchParams(location.search);

    useEffect(() => {
        const url = `user/confirm-email`;
        const data = {
            verificationToken: query.get('token'),
            email: query.get('email')
        };

        updateRequest(url, data)
            .then(res => {
                if (res.data.code === 'SUCCESS') {
                    history.push('/');
                }
            })
            .catch(e => { console.log(e); });
    }, [query.get('token')]);
    return (
        <p>Verifying Email</p>
    )
}

export default withRouter(ConfirmMail);