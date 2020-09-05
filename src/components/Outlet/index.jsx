import React from 'react';
import { Route } from 'react-router-dom';
import Organization from '../../views/Organization';
import Expenses from '../../views/Expenses';
import ExpenseTypes from '../../views/ExpenseTypes';
import Members from '../../views/Members';

export default function Outlet() {
    return (
        <div className="vz_main_container">
            <div className="vz_main_content">
                <Route exact path="/organizations/:id" component={Organization} />
                <Route  path="/organizations/:id/expenses" component={Expenses} />
                <Route  path="/organizations/:id/expense-types" component={ExpenseTypes} />
                <Route  path="/organizations/:id/members" component={Members} />
            </div>
        </div>
    )
}