import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateObject, checkValidity } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input'
import MyButton from '../../../components/UI/Button/MyButton'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './Register.module.css';
import Footer from '../../../components/Footer/Footer'
import * as actions from '../../../store/actions/index';
import {Container,Col,Row} from 'react-bootstrap';

const Register = (props) => {
    const {onAuthFail} = props;

    const[RegisterForm,setRegisterForm]= useState({
        username: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Όνομα χρήστη'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Ηλεκτρονική διεύθυνση'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Κωδικός'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
        fname:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Όνομα'
            },
            value: '',
            validation: {
                required: true,        
            },
            valid: false,            
        },
        lname:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Επώνυμο'
            },
            value: '',
            validation: {
                required: true, 
            },
            valid: false,
        },
        userType: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'user', displayValue: 'Χρήστης'},
                    {value: 'mod', displayValue: 'Διαχειρηστής Επιχείρησης'}
                ]
            },
            value: 'user',
            validation: {},
            valid: true
        }

    });

    const inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject(RegisterForm, {
            [controlName]: updateObject(RegisterForm[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, RegisterForm[controlName].validation ),
                touched: true
            } )
        } );
        setRegisterForm(updatedControls)
    }

    const switchToRegisterHandler = ()=>{
        onAuthFail(null);
        props.history.push("/login");
    }

    const submitHandler = ( event ) => {
        event.preventDefault();
        props.onRegister( RegisterForm.username.value, 
                          RegisterForm.email.value,
                          RegisterForm.password.value,
                          RegisterForm.fname.value,
                          RegisterForm.lname.value,
                          RegisterForm.userType.value);            
    }

    const formElementsArray = [];
    for ( let key in RegisterForm ) {
        formElementsArray.push( {
            id: key,
            config: RegisterForm[key]
        } );
    }

    let form = formElementsArray.map( formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={( event ) => inputChangedHandler( event, formElement.id )}
        />
    ) );

    if ( props.loading ) { form = <Spinner />}

    let errorMessage = null;
    if ( props.error && props.error !== 'Unauthorized' ) {
        errorMessage = ( <p style={{fontWeight: 'bold',color:'red'}}> Σφάλμα <br/>Το όνομα χρήστη ή μαίλ μπορει να υπάρχει είδη </p> );
    }

    let authRedirect = null;
    if ( props.isAuthenticated ) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return(
        <>  
            {authRedirect}
            <Container   className={classes.Cont}>
                <Row>
                    <Col>
                        <h1 className={classes.Welcome}>Εγγραφείτε τώρα για να δείτε όλα τα οφέλη του FindMe </h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8} className={classes.Register}>
                        <h2 className={classes.Header}>Εγγραφή</h2>
                        <form >         
                            {form}
                            
                            <MyButton variant="outline-secondary"  clicked={submitHandler}>Υποβολή</MyButton>
                            <hr/>
                            {errorMessage}
                        </form>
                    </Col>
                    <Col xs={6} md={4} className={classes.Info}>
                        <p style={{fontSize:'18px',textAlign: 'justify' }}>Μπορείτε να εγγραφείτε ως χρήστης και να βρείτε οποιαδήποτε υπηρεσία συνεργάζεται με την πλατφόρμα μας.<br/><br/>
                        Εναλλακτικά, εγγραφείτε ως κάτοχος υπηρεσίας ή επιχείρησης και τοποθετήστε την στην πλατφόρμα για να την βρουν άλλοι.</p>
                        <br/>
                        <hr/>
                        <br/>
                        <p style={{fontSize:'18px',fontStyle:'italic'}}>Έχετε ήδη λογαριασμό ? </p>
                        <MyButton variant="info" clicked={switchToRegisterHandler}>Σύνδεση</MyButton>
                    </Col>
                </Row>  
            </Container>
            <Footer  />
        </>
    );

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: ( username,email, password,fname,lname,userType ) => dispatch( actions.registerUser(username,email, password,fname,lname,userType) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) ),
        onAuthFail: (error) => dispatch(actions.authFail(error))
    };
};
 
export default  connect( mapStateToProps, mapDispatchToProps )(Register) ;

