import React from 'react';

import classes from './MyButton.module.css';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const mybutton = (props) => (
    <Button
        disabled={props.disabled}
        variant={props.variant}
        size={props.size}
        className={classes.Button}
        onClick={props.clicked}
    >
        {props.children}
    </Button> 
);

export default mybutton;