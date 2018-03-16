
 import {API_BASE_URL} from '../config';
 import {registerUser} from './users';

describe('registerUser', () => {


    const user = {

        name: "daniel",
        email:"joao",
        password: "banana"
    }

    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWFhMjdlMzkzOTdmNTIxMjg0YTFlNjk3IiwibmFtZSI6ImRhbmllbCIsImVtYWlsIjoiZGFuaUBnbWFpbC5jb20ifSwiaWF0IjoxNTIwNjAwNDA5LCJleHAiOjE1MjEyMDUyMDksInN1YiI6ImRhbmlAZ21haWwuY29tIn0.a96I8m53skkAmAqG2VNzLofBX39Z3VqHeI24YOMnWgE"
    it.only('Should register', () => {
       

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return Promise.resolve(
                        {id : "asdf",
                        name: "daniel",
                        email: "joao"

                });
                }
            })
        );

        const dispatch = jest.fn();
        return registerUser(user)(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/users`, {

                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user),
                
                method: 'POST'
            });
        });
    });
});