import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty} from '../validators';
import {fetchProtectedData} from '../actions/protected-data';
import { withRouter } from "react-router-dom";
import {editAnnotation} from '../actions/index';


export  class EditAnnotationForm extends React.Component {

    componentDidMount() {
        this.props.initialize({ title: `${this.props.title}`,
    annotation: `${this.props.annotation}` });
        // set the value individually
        // this.props.dispatch(change('myFormName', 'anotherField', 'value'));
      }

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

   
    onSubmit(values) {
        
       const title = values.title.trim();
        const annotation = values.annotation.trim();
        const idAnnot = this.props.idAnnot;

        const newAnnotations =  this.props.annotations.map(annota => {

            if(annota.idAnnot === this.props.idAnnot){

                return {
                    idAnnot,
                     title,
                     annotation
                }
            }else{
                return annota;
            }
        })

        const idEditBook = this.props.idEditBook;

        this.props.dispatch(editAnnotation(idEditBook,newAnnotations ));

        return this.props.dispatch(fetchProtectedData()).then(
            
            () => {
                
         this.props.history.push(`/annotation/${this.props.idBook}/${this.props.idAnnot}`);
            }
        );
    }

    render() {
        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <div className="message message-success">
                    Annotation saved successfully
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
                    label="Title"
                    value={this.props.title}
                    validate={[required, nonEmpty]}
                />

                 <Field
                    name="annotation"
                    element="textarea"
                    component={Input}
                    label="Annotation"
                    value={this.props.annotation}
                    validate={[required, nonEmpty]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Save Annotation
                </button>
            </form>
        );
    }
}



export const  routedForm =  withRouter(EditAnnotationForm);


export default reduxForm({
    form: 'editannotform',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('editannotform', Object.keys(errors)[0]))
})(routedForm);





