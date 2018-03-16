import React from 'react';
import {reduxForm, focus} from 'redux-form';
import { withRouter } from "react-router-dom";
import {deleteBook} from '../actions/index';

export class DeleteBookForm extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit() {
       

        const id =this.props.idEditBook
       

        return this.props.dispatch(deleteBook(id))
        
        // return this.props.dispatch(fetchProtectedData()).then(

          .then(    () => {
                
                this.props.history.push(`/bookshelf`);
            }
            
   

        )

    }

    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit()
                )}>
               
               <div>
                   Are you sure you want to delete this book ?
                </div>
                <button
                    type="submit">
                    Delete Book
                </button>
            </form>
        );
    }
}


// export const routedForm = withRouter(DeleteBookForm);

export const form =  reduxForm({
    form: 'deleteBook',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('contact', Object.keys(errors)[0]))
})(DeleteBookForm);

export default withRouter(form);


