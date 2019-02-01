// Vendor Imports
import { AsyncStorage, Alert } from 'react-native';

// Custom Imports
import { LOGIN, setError, setUser, NAME, PASSWORD, SIGN_OUT, resetUser } from '../../ducks/user';
import { apiRequest, API_SUCCESS, API_ERROR, apiError } from '../../ducks/api';
import NavigationService from '../../../bin/navigationService';
import CONFIG from '../../../config';

const userMiddleware = ({ dispatch, getState }) => (next) => async (action) => {
    next(action);
    switch(action.type) {
        case NAME:
        case PASSWORD:
            if (getState().user.error !== '') {
                next(setError(''));
            }
            break;
        case LOGIN: 
            const {
                name,
                password,
            } = getState().user;

            next(apiRequest({ 
                data: { name, password },
                method: 'POST',
                url: `${CONFIG.ProxyUrl}/login`,
                feature: LOGIN,
            }));
            break;

        case `${LOGIN} ${API_SUCCESS}`:
            processLoginData(next, action);
            break;     

        case `${LOGIN} ${API_ERROR}`:
            next(setError('You suck, get it right!'));
            break;
        case SIGN_OUT:
            processSignOut(next);
            break;
    }
};

export default userMiddleware;

const processLoginData = async (next, { payload }) => {
    if (payload.statusCode === 200) {
        try {
            await AsyncStorage.setItem('@reactPOC:session', JSON.stringify({ ...payload.sessionInfo, email: payload.profile.email }));     
        } catch (e) {
            console.log(e);
        }
        next(setUser( {
            email: payload.profile.email,
            cookieName: payload.sessionInfo.cookieName,
            cookieValue: payload.sessionInfo.cookieValue,
        }));
        NavigationService.navigate('App');
    } else {
        next(setError(payload.errorDetails));
    }
};

const processSignOut = async (next) => {
    next(resetUser());
    try {
        await AsyncStorage.removeItem('@reactPOC:session');
    } catch (e) {
        Alert.alert('Oops...', 'Unable to destroy session');
    }
    NavigationService.navigate('Auth');
};