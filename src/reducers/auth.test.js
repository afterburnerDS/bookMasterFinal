import reducer from './auth';
// import {SET_AUTH_TOKEN, CLEAR_AUTH, AUTH_REQUEST, AUTH_SUCCESS,
//     AUTH_ERROR} from '../actions/auth';

    import {setAuthToken, clearAuth, authRequest, authSuccess, authError } from '../actions/auth';

    describe('Reducer', () => {
        it('Should set the initial state when nothing is passed in', () => {
            const state = reducer(undefined, {type: '__UNKNOWN'});
    
            expect(state.authToken).toEqual(null);
            expect(state.currentUser).toEqual(null);
            expect(state.loading).toEqual(false);
            expect(state.error).toEqual(null);
           
        });
    
        it('Should return the current state on an unknown action', () => {
            let currentState = {};
            const state = reducer(currentState, {type: '__UNKNOWN'});
            expect(state).toBe(currentState);
        });
    
        describe('setAuthToken', () => {
            it('set Authorazitaion token', () => {
                // Mess up the state a bit to simulate an existing game
               let state = {

                authToken: null, // authToken !== null does not mean it has been validated
                currentUser: null,
                loading: false,
                error: null
               }

                state = reducer(state, setAuthToken(25));
               
                expect(state.authToken).toEqual(25);
               
            });
        });


        describe('clearAuth', () => {
            it('set Authorazitaion token', () => {
                // Mess up the state a bit to simulate an existing game
               let state = {

                authToken: null, // authToken !== null does not mean it has been validated
                currentUser: null,
                loading: false,
                error: null
               }

                state = reducer(state, clearAuth());
               
                expect(state.authToken).toEqual(null);
                expect(state.currentUser).toEqual(null);
               
            });
        });


        describe('authRequest', () => {
            it('set Authorazitaion token', () => {
                // Mess up the state a bit to simulate an existing game
               let state = {

                authToken: null, // authToken !== null does not mean it has been validated
                currentUser: null,
                loading: false,
                error: null
               }

                state = reducer(state, authRequest());
               
                expect(state.loading).toEqual(true);
                expect(state.error).toEqual(null);
               
            });
        });


        describe('authSuccess', () => {
            it('set Authorazitaion token', () => {
                // Mess up the state a bit to simulate an existing game
               let state = {

                authToken: null, // authToken !== null does not mean it has been validated
                currentUser: null,
                loading: false,
                error: null
               
            }

            const user = {
                name: "daniel",
                email: "daniel",
                password: "daniel"
            };

                state = reducer(state, authSuccess(user));
               
                expect(state.loading).toEqual(false);
                expect(state.currentUser).toEqual(user);
               
            });
        });

        describe('authError', () => {
            it('set Authorazitaion token', () => {
                // Mess up the state a bit to simulate an existing game
               let state = {

                authToken: null, // authToken !== null does not mean it has been validated
                currentUser: null,
                loading: false,
                error: null
               }

               const error = "error"

                state = reducer(state, authError(error));
               
                expect(state.loading).toEqual(false);
                expect(state.error).toEqual(error);
               
            });
        });






    
    
       
    });