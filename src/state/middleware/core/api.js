/*---------- Vendor Imports ----------*/
import axios from 'axios';

/*---------- Custom Imports ----------*/
import {
    API_REQUEST,
    apiSuccess,
    apiError,
} from '../../ducks/api';

/*---------- apiMiddleware ----------*/
const apiMiddleware = ({ dispatch }) => (next) => async (action) => {
    next(action);
    if (action.type.includes(API_REQUEST)) {
        console.log(action);
        const { url, method, feature } = action.meta;
        let request = {
            method,
            url,
            data: action.payload,
        };
        let thunk;
        try {
            thunk = await axios(request);
        } catch (error) {
            dispatch(apiError({ error, feature }));
        }

        if (thunk && thunk.data) {
            const { data } = thunk;
            dispatch(apiSuccess({ data, feature }));
        } else {
            dispatch(apiError({ error: 'Unknown error', feature: feature }));
        }
    } // end if
}; // end apiMiddleware

export default apiMiddleware;
