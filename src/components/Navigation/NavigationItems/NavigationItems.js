import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => {
    return(
        <>
            <ul className={classes.NavigationItems}>
        
                {/* <NavigationItem link="/" exact>Main</NavigationItem> */}
                {/* <NavigationItem link="/profile" >Profile</NavigationItem> */}

                {props.isAuthenticated && props.role === 'ROLE_USER' ? <NavigationItem link="/profile">Profile</NavigationItem> : null}
                {!props.isAuthenticated ? <NavigationItem link="/login">Log In</NavigationItem> : <NavigationItem link="/logout">Logout</NavigationItem>}

            </ul>
        </>)

};

export default navigationItems;