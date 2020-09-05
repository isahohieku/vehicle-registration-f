import React from 'react';

export default function ApplicationsTable({ applications }) {
    return (
        <table className="table table-bordered text-center">
            <thead className="text-uppercase">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Added by</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Approved By</th>
                </tr>
            </thead>
            <tbody>
                {applications.map(item => <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.createdBy.fullName}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.amount}</td>
                    <td>{item.approvedBy}</td>
                </tr>)}
            </tbody>
        </table>
    )
}