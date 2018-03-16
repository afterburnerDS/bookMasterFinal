import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty} from '../validators';
import {fetchProtectedData} from '../actions/protected-data';
import 'react-quill/dist/quill.snow.css'; // ES6
// import InputField from './inputfield'; 
import {newAnnotation} from '../actions/index';
import {withRouter } from 'react-router-dom' // 4.0.0 

export  class FormNewAnnot extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }
    onSubmit(values) {
        const idAnnot = this.guid(); 
        const title = values.title.trim();
        const annotation = values.annotation.trim();
        const idEditBook = this.props.idEditBook;
        const annotations = this.props.annotations;


        this.props.dispatch(newAnnotation(idEditBook, annotations, idAnnot, title, annotation ))
        
        
        return this.props.dispatch(fetchProtectedData()).then(  
            () => {

            this.props.history.push(`/bookpage/${this.props.idBook}`)

        }
    );
   

        
    }

    render() {
        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <div className="message message-success">
                    Annotation added successfully
                </div>
            );
        }

        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <div className="message message-error">{this.props.error}</div>
            );
        }

        return (
            <form
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {successMessage}
                {errorMessage}
                <Field
                    name="title"
                    type="text"
                    component={Input}
                    className ="inputTitleAnnot"
                    label="Title"
                    validate={[required, nonEmpty]}
                />

                 <Field
                    name="annotation"
                    element="textarea"
                    className="inputTextAnnot"
                    component={Input}
                    label="Annotation"
                    validate={[required, nonEmpty]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting || this.props.submitSucceeded}>
                    Add Annotation
                </button>
            </form>
        );
    }
}


export const  routedForm =  withRouter(FormNewAnnot);

export const form =  reduxForm({
    form: 'editform',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('editform', Object.keys(errors)[0]))
})(FormNewAnnot);



export default withRouter(form);



