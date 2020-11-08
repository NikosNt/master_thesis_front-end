import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';


import { updateObject, checkValidity } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import classes from './Register.module.css';

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
                placeholder: 'Birth Date'
            },
            value: '',
            validation: {
                required: true,      
            },
            valid: false,
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
        <Redirect to={"/Register"} />
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
        <div  className={classes.Login}>
            
            <form >
                <h3 className={classes.Text}>Register</h3>
                {form}
                <Button btnType="Submit">SUBMIT</Button>
                <hr/>
                <p>If you are not registered  <Button 
                    btnType="Danger" clicked={switchToRegisterHandler}>Log In</Button>
                </p>
                
            </form>
            
            {/* <Button
                clicked={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
            </Button>  */}
        </div>
    );

}

export default Register ;

