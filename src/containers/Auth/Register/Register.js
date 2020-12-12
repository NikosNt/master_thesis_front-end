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

    const[RegisterForm,setRegisterForm]= useState({
        username: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Username'
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
                placeholder: 'Mail Address'
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
                placeholder: 'Password'
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
                placeholder: 'First Name'
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
                placeholder: 'Last Name'
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
                    {value: 'user', displayValue: 'User'},
                    {value: 'mod', displayValue: 'Business owner'}
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
        errorMessage = ( <p style={{fontWeight: 'bold',color:'red'}}>{props.error}</p> );
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
                        <h1 className={classes.Welcome}>Register now to view all the benefits of ___ </h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8} className={classes.Register}>
                        <h2 className={classes.Header}>Register</h2>
                        <form >         
                            {form}
                            {errorMessage}
                            <MyButton variant="outline-secondary"  clicked={submitHandler}>SUBMIT</MyButton>
                            <hr/>
                        </form>
                    </Col>
                    <Col xs={6} md={4} className={classes.Info}>
                        <p style={{fontSize:'18px',textAlign: 'justify' }}>You can register as a User and find any sevice thats connected(sunergazetai) with our platform.<br/><br/>
                        Or Register as a services-Bussines owner and get your company-business on the platform for others to find </p>
                        <br/>
                        <hr/>
                        <br/>
                        <p style={{fontSize:'18px',fontStyle:'italic'}}>Do you already have an acount ? </p>
                        <MyButton variant="info" clicked={switchToRegisterHandler}>Log In</MyButton>
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
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};
 
export default  connect( mapStateToProps, mapDispatchToProps )(Register) ;

