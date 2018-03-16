import {SET_AUTH_TOKEN, setAuthToken,  CLEAR_AUTH, clearAuth, AUTH_REQUEST, authRequest, AUTH_SUCCESS, authSuccess, AUTH_ERROR,
    authErro, login} from './auth';

    import {API_BASE_URL} from '../config';



describe('setAuthToken', () => {
    it('Should return the action', () => {
        const authToken = 'token';
        const action = setAuthToken(authToken);
        expect(action.type).toEqual(SET_AUTH_TOKEN);
        expect(action.authToken).toEqual(authToken);
    });
});

describe('clearAuth', () => {
    it('Should return the action', () => {
        const action = clearAuth();
        expect(action.type).toEqual(CLEAR_AUTH);
     
    });
});

describe('authRequest', () => {
    it('Should return the action', () => {
        
        const action = authRequest();
        expect(action.type).toEqual(AUTH_REQUEST);
      
    });
});

describe('authSuccess', () => {
    it('Should return the action', () => {
        const user = {
            name: "daniel",
            emai: "daniel@gmail.com",
            password: "12345"
        }
       
        const action = authSuccess(user);
        expect(action.type).toEqual(AUTH_SUCCESS);
        expect(action.currentUser).toEqual(user);
    });
});


describe('authError', () => {
    it('Should return the action', () => {
        const error = 'error';
    
        const action = authError(error);
        expect(action.type).toEqual(AUTH_ERROR);
        expect(action.error).toEqual(error);
       
    });
});


describe('login', () => {

    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWFhMjdlMzkzOTdmNTIxMjg0YTFlNjk3IiwibmFtZSI6ImRhbmllbCIsImVtYWlsIjoiZGFuaUBnbWFpbC5jb20ifSwiaWF0IjoxNTIwNjAwNDA5LCJleHAiOjE1MjEyMDUyMDksInN1YiI6ImRhbmlAZ21haWwuY29tIn0.a96I8m53skkAmAqG2VNzLofBX39Z3VqHeI24YOMnWgE"
    it.only('Should login', () => {
       

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return Promise.resolve({authToken : authToken});
                }
            })
        );

        const dispatch = jest.fn();
        return login("joao","banana")(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/login`, {

                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: "joao",
                    password: "banana"
                }),
                
                method: 'POST'
            });
        });
    });
});

