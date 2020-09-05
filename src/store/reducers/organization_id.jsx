import { ORGANIZATION_ID } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case ORGANIZATION_ID:
            return action.payload
        default:
            return state;
    }
}