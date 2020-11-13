import React, { useState } from 'react';
import { withRouter } from "react-router-dom";

import { updateObject, checkValidity } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input'
import MyButton from '../../../components/UI/Button/MyButton'
import classes from './Register.module.css';
import Footer from '../../../components/Footer/Footer'
import {Container,Col,Row} from 'react-bootstrap';

const Register = (props) => {

    const[logInForm,setLogInForm]= useState({
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
        bdate:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Birth Date  DD/MM/YYYY'
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
                    {value: 'businessOwner', displayValue: 'Business owner'}
                ]
            },
            value: 'user',
            validation: {},
            valid: true
        }

    });

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
        props.history.push("/login");
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



    return(
        <>  
          <Container   className={classes.Cont}>
            <Row>
                <Col xs={12} md={8} className={classes.Register}>
                    <form >
                        <h2 className={classes.Header}>Register</h2>
                        {form}
                        <MyButton variant="outline-secondary">SUBMIT</MyButton>
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

export default withRouter(Register) ;

