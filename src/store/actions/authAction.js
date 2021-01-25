import axios from '../../axios-orders'
import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId,role,username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        username:username,
        role:role
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password,
            returnSecureToken: true
        };
        axios.post('api/auth/signin', authData)
            .then(response => {
                 console.log(response);
               // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.accessToken);
                //localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('username',response.data.username);    
                localStorage.setItem('role',response.data.roles[0]);
                dispatch(authSuccess(response.data.accessToken, response.data.id,response.data.roles[0],response.data.username));
                //dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err));
            });
    };
};

export const registerUser = (username,email, password,fname,lname,userType) => {
    return dispatch => {
        const authData = {
            username: username,
            email:email,
            password: password,
            fname:fname,
            lname:lname,
            role:[userType]
        };
        axios.post('api/auth/signup', authData)
            .then(response => {
                console.log("epitixos",response)
                dispatch(auth(authData.username,authData.password));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if (expirationDate <= new Date()) {
            //     dispatch(logout());
            // } else {
                const userId = localStorage.getItem('userId');
                const role = localStorage.getItem('role')
                const username = localStorage.getItem('username')
                dispatch(authSuccess(token, userId,role,username));
               // dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
           // }   
        }
    };
};