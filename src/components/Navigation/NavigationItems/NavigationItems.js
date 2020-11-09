import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        {/* <NavigationItem link="/" exact>Main</NavigationItem> */}
        {props.isAuthenticated ? <NavigationItem link="/kato---">Orders</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/login">Log In</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;