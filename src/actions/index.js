export const ADD_BOOK = 'ADD_BOOK';
export const addBook = (title, author) => ({
    type: ADD_BOOK,
    title,
    author
});

export const ADD_ANNOTATION = 'ADD_ANNOTATION';
export const addAnnotation = (title, annotation,bookIndex) => ({
    type: ADD_ANNOTATION,
    title,
    annotation,
    bookIndex
});

// export const fetchBooks = () => dispatch => {
//     fetch(`${API_BASE_URL}/books`).then(res => {
//         if (!res.ok) {
//             return Promise.reject(res.statusText);
//         }
//         return res.json();
//     }).then(board => {
//         dispatch(fetchBooksSuccess(board));
//     });
// };
