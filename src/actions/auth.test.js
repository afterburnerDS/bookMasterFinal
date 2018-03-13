import {SET_AUTH_TOKEN, setAuthToken,  CLEAR_AUTH, clearAuth, AUTH_REQUEST, authRequest, AUTH_SUCCESS, authSuccess, AUTH_ERROR,
    authError} from './auth';

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


// describe('login', () => {
//     it.only('Should login', (email, password) => {
       

//         global.fetch = jest.fn().mockImplementation(() =>
//             Promise.resolve({
//                 ok: true,
//                 json() {
//                     return bookshelf;
//                 }
//             })
//         );

//         const dispatch = jest.fn();
//         return fetchProtectedData()(dispatch).then(() => {
//             expect(fetch).toHaveBeenCalledWith('/board');
//             expect(dispatch).toHaveBeenCalledWith(fetchBoardSuccess(board));
//         });
//     });
// });

