import React from 'react';

import classes from './SearchBar.module.css';
import InputGroup  from 'react-bootstrap/InputGroup';
import FormControl  from 'react-bootstrap/FormControl';

import 'bootstrap/dist/css/bootstrap.min.css';



const searchbar = (props) =>{


    return(
        <div className={classes.Search}>
            <InputGroup size="lg" >
            <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">⌕</InputGroup.Text>
            </InputGroup.Prepend>
                <FormControl placeholder={props.textS}
                            aria-label="Search"
                            aria-describedby="basic-addon1"
                            onChange={props.changed} />
            </InputGroup>            
        </div>

    )

}

export default searchbar;