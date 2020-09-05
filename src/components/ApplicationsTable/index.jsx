import React from 'react';
import { getFullMonth } from '../../utils/month';

export default function ApplicationsTable({ applications }) {
    const getDate = (item) => {
        const date = new Date(item);
        return `${getFullMonth(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
    }

    return (
        <table className="table table-bordered text-center">
            <thead className="text-uppercase">
                <tr>
                    <th scope="col">Application type</th>
                    <th scope="col">Application</th>
                    <th scope="col">Application date</th>
                    <th scope="col">Approved By Reviewer</th>
                    <th scope="col">Approved By Processor</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {applications.map(item => <tr key={item._id}>
                    <td>{item.type}</td>
                    <td>{item.trials === 'first' ? 'First time' : 'Renewal'}</td>
                    <td>{item.createdAt && getDate(item.createdAt)}</td>
                    <td>{item.isReviewerApproved ? 'Approved': 'Pending'}</td>
                    <td>{item.isProcessorApproved ? 'Approved': 'Pending'}</td>
                    <td><span className="text-capitalize">{item.status}</span></td>
                </tr>)}
            </tbody>
        </table>
    )
}