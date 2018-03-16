import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    fetchProtectedDataSuccess,
    fetchProtectedData,
    fetchProtectedDataError
} from './protected-data';



describe('fetchProtectedDataSuccess', () => {
    it('Should return the action', () => {
        const bookshelf = {
            books: []
        };
        const action = fetchProtectedDataSuccess(bookshelf);
        expect(action.type).toEqual(FETCH_PROTECTED_DATA_SUCCESS);
        expect(action.data).toEqual(bookshelf);
    });
});


describe('fetchProtectedDataError', () => {
    it('Should return the action', () => {
        const error = "error";
        const action = fetchProtectedDataError(error);
        expect(action.type).toEqual(FETCH_PROTECTED_DATA_ERROR);
        expect(action.error).toEqual(error);
    });
});


// describe('fetchProtectedData', () => {

//     const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWFhMjdlMzkzOTdmNTIxMjg0YTFlNjk3IiwibmFtZSI6ImRhbmllbCIsImVtYWlsIjoiZGFuaUBnbWFpbC5jb20ifSwiaWF0IjoxNTIwNjAwNDA5LCJleHAiOjE1MjEyMDUyMDksInN1YiI6ImRhbmlAZ21haWwuY29tIn0.a96I8m53skkAmAqG2VNzLofBX39Z3VqHeI24YOMnWgE"

//     it('Should get Books ', () => {
//         const bookshelf = [];


//         let state = {

//             auth: {
//                 authToken: authToken
//             }
//            }

       
//         global.fetch = jest.fn().mockImplementation(() =>
//             Promise.resolve({
//                 ok: true,
//                 json() {
//                     return bookshelf;
//                 }
//             })
//         );

//         const dispatch = jest.fn();
//         const getState = jest.fn().mockImplementation(() =>state );
        

//         return fetchProtectedData()(dispatch, getState).then(() => {
//             expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/books`, {
//                 method: 'GET',
//                 headers: {
//                     // Provide our auth token as credentials
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${authToken}`,
//                     // 'Cache-Control': 'no-cache',
//                     // 'Pragma': 'no-cache',
//                     // 'Expires' : 0      
//             }
//             });
//             // expect(dispatch).toHaveBeenCalledWith(fetchProtectedDataSuccess(bookshelf));
//         });
//     });
// });
