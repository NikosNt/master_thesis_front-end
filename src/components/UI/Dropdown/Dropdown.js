import React from 'react';

import DropdownList from 'react-widgets/lib/DropdownList'
import 'react-widgets/dist/css/react-widgets.css';
import classes from './Dropdown.module.css';


const Dropdown = (props) =>{


return(
    <DropdownList   className={classes.Dropdown}
                    data={props.list}
                    valueField='id'
                    textField='name'
                    defaultValue={props.label}
                    onChange={props.changed}
  />
)

}


export default Dropdown;







































