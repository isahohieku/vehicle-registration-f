import {
    CHANGE_AUTH,
    ORGANIZATION_ID
} from './types';

export function changeAuth(isLoggedIn) {
    return {
        type: CHANGE_AUTH,
        payload: isLoggedIn
    };
}

export function activeOrganization(payload) {
    return {
        type: ORGANIZATION_ID,
        payload
    }
}
