import React from 'react';

import classes from './Toolbar.module.css';
//import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
import * as Icon from 'react-bootstrap-icons';

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <NavigationItem link="/" exact> <Icon.HouseFill  size={30}/> </NavigationItem>
            {/* <Logo /> */}
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} role={props.role} />
        </nav>
    </header>
);

export default toolbar;