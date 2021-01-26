import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
//import * as Icon from 'react-bootstrap-icons';

const navigationItems = ( props ) => {
    return(
        <>
            <ul className={classes.NavigationItems}>
        
                {/* <NavigationItem link="/" exact>Main</NavigationItem> */}
                {/* <NavigationItem link="/profile" >Profile</NavigationItem> */}

                {props.isAuthenticated && props.role === 'ROLE_USER' ? <NavigationItem link="/profile">Προφίλ</NavigationItem> : null}

            </ul>
        </>)

};

export default navigationItems;