import { combineReducers } from 'redux';
import authReducer from './auth';
import organizationIdReducer from './organization_id';


export default combineReducers({
    auth: authReducer,
    organizationId: organizationIdReducer
});
