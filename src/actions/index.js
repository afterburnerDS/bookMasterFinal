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
