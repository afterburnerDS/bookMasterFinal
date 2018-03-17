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
