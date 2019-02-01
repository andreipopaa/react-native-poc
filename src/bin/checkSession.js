// Vendor Imports
import React from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

// Custom Imports
import { setUser } from '../state/ducks/user';

const checkSession = Component => {
    class CheckSession extends React.Component {
        constructor(props) {
            super(props);
            this.state = { ready: false };
        }

        async componentDidMount() {
            let session;

            try {
                session = await AsyncStorage.getItem('@reactPOC:session');
                session = JSON.parse(session);
            } catch (e) {
                this.setState({ ready: true });
            }
            
            console.log(session);
            if (session && session.email && session.cookieName && session.cookieValue) {
                this.props.dispatchSetUser(session);
            }
            this.setState({ ready: true });
        }

        render() {
            return this.state.ready ? <Component ref={ this.props.innerRef } { ...this.props }/> : null;
        };
    }

    const mapDispatchToProps = (dispatch) => ({ 
        dispatchSetUser: ({ email, cookieName, cookieValue }) => dispatch(setUser({ email, cookieName, cookieValue })),
    })

    return connect(null, mapDispatchToProps)(CheckSession);
}

export default checkSession;