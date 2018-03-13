// import * as actions from '../actions';


// const initialState = {
//     books: []
// };

// const defaultBook = {
//     annotations: [] 
// };

// export const bookReducer = (state=initialState, action) => {
//     if (action.type === actions.ADD_BOOK) {
//         const {title, author} = action;
//         let books = state.books
//         books = [...state.books, {
//             annotations: [],
//             title,
//             author
//         }];
//         return Object.assign({}, state, {
//             books: books
//         });
//     }
//     else if (action.type === actions.ADD_ANNOTATION) {
//         const {title, annotation, bookIndex} = action;
//         console.log(bookIndex);
//         console.log(annotation);
//         console.log(title);
//         let books = state.books;
//         books = state.books.map((book, index) => {
//             if (book.title.replace(/ /g, "-") !== bookIndex) {
//                 return book;
//             }
//              let newBook = Object.assign({}, book, {
//                 annotations: [...book.annotations, {
//                     title,
//                     annotation
//                 }]
//             });
//             console.log(newBook);
//             return newBook;
//         });

//         let finalBooks =  Object.assign({}, state, {
//             books: books
//         });
//         console.log(finalBooks);
//         return finalBooks;
//     }
//     return state;
// };

