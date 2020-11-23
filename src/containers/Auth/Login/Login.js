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
                placeholder: 'username'
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
                placeholder: 'Password'
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

    const { onSetAuthRedirectPath,authRedirectPath } = props;

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

    if ( props.loading ) {
        form = <Spinner />
    }

    let errorMessage = null;
    if ( props.error ) {
        errorMessage = (
            <p style={{fontWeight: 'bold',color:'red'}}>{props.error}</p>
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
                        <h1>Welcome to ____ Log In to proceed with more feautures !! </h1>
                    </Col>
                </Row>
                <Row>
                    <Col  xs={12} md={8} className={classes.Login}>
                        <form  >
                            <h2 className={classes.Header}>Log In</h2>
                            {form}
                            {errorMessage}
                            <MyButton variant="outline-secondary" clicked={submitHandler}>SUBMIT</MyButton>
                        </form>
                    </Col>
                    <Col xs={6} md={4} className={classes.Info}>
                        <p className={classes.Par}>Don't have an account ?<br/>Register now to unlock all the features</p> 
                        <MyButton  size="lg" variant="info" clicked={switchToRegisterHandler}>Register</MyButton>
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
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};

 export default connect( mapStateToProps, mapDispatchToProps )(LogIn) ;





{/* <Row  className={classes.MoreInfo}>          
    <Col xs={12} md={6}  >
        <p style={{fontWeight: 'bold',fontSize:'22px'}}>Popular Services</p>
        <p>Doctors<br/>Restaurants<br/>Bars<br/>Gyms<br/>Mechanics<br/></p>
    </Col>
    <Col xs={12} md={6} > 
        <p style={{fontWeight: 'bold',fontSize:'22px'}}>Popular towns</p>
        <p>Athina<br/>Thesalonikh<br/>Hrakleio<br/>Patra<br/>Xania<br/></p>
    </Col>
</Row> */}