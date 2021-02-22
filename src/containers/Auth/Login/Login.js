import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateObject, checkValidity } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input'
import MyButton from '../../../components/UI/Button/MyButton'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Footer from '../../../components/Footer/Footer'
import classes from './Login.module.css';
import * as actions from '../../../store/actions/index';

import {Container,Col,Row} from 'react-bootstrap';

const LogIn = (props) => {

    const[logInForm,setLogInForm]= useState({
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
        }
    });

    const { onSetAuthRedirectPath,authRedirectPath,onAuthFail } = props;

    useEffect(()=>{
        if (authRedirectPath !== '/' ) {
            onSetAuthRedirectPath();
        }
    },[onSetAuthRedirectPath,authRedirectPath])

    const inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject(logInForm, {
            [controlName]: updateObject(logInForm[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, logInForm[controlName].validation ),
                touched: true
            } )
        } );
        setLogInForm(updatedControls)
    }

    const switchToRegisterHandler = ()=>{
        onAuthFail(null);
        props.history.push("/register");
    }

    const submitHandler = ( event ) => {
        event.preventDefault();
        props.onAuth( logInForm.username.value, logInForm.password.value );
    }

    const formElementsArray = [];
    for ( let key in logInForm ) {
        formElementsArray.push( {
            id: key,
            config: logInForm[key]
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

    if ( props.loading ) {form = <Spinner />}

    let errorMessage = null;
    if ( props.error ) {
        errorMessage = (
            <p style={{fontWeight: 'bold',color:'red'}}> Σφάλμα </p>
        );
    }


    let authRedirect = null;
    if ( props.isAuthenticated ) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return(
        <>
            {authRedirect}  
            <Container   className={classes.Cont}>
                <Row className={classes.Welcome}>
                    <Col>
                        <h1>Καλώς ήλθατε στο FindMe !</h1>
                    </Col>
                </Row>
                <Row>
                    <Col  xs={12} md={8} className={classes.Login}>
                        <form  >
                            <h2 className={classes.Header}>Σύνδεση</h2>
                            {form}
                            {errorMessage}
                            <MyButton variant="outline-secondary" clicked={submitHandler}>Υποβολή</MyButton>
                        </form>
                    </Col>
                    <Col xs={6} md={4} className={classes.Info}>
                        <p className={classes.Par}>Δεν έχετε λογαριασμό;<br/>Εγγραφείτε τώρα για να ξεκλειδώσετε όλες τις δυνατότητες</p> 
                        <MyButton  size="lg" variant="info" clicked={switchToRegisterHandler}>Εγγραφή</MyButton>
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
        onAuth: ( username, password ) => dispatch( actions.auth( username, password ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) ),
        onAuthFail: (error) => dispatch(actions.authFail(error))
    };
};

 export default connect( mapStateToProps, mapDispatchToProps )(LogIn) ;