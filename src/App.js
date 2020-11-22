import React,{useEffect,Suspense} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.module.css'; 
import MainPage from './containers/MainPage/MainPage'
import Layout from './hoc/Layout/Layout'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

const Login = React.lazy(() => {
  return import('./containers/Auth/Login/Login');
});

const Register = React.lazy(() => {
  return import('./containers/Auth/Register/Register');
});

const Profile = React.lazy(() => {
  return import('./containers/Profile/Profile');
});

const App = (props) => {

  const { onTryAutoSignup } = props;  //to kanw giati apo ta props  mono to "onTryAutoSignup" 8a alaksei



  useEffect (()=>{
    //props.onTryAutoSignup();
    onTryAutoSignup();
  },[onTryAutoSignup])  //meta to komma gia na treksei mia fora ...an balw kati mesa an allaze auto 8a ksanakane render

console.log(props.hasRole);
console.log(props.token);

  let routes = (
    <Switch>
      <Route path="/login" render={(props) => <Login {...props}/>} />
      <Route path="/register" render={(props) => <Register {...props}/>} />
      <Route path="/" exact component={MainPage} />
      <Redirect to="/" />
    </Switch>
  );
    
  if(props.isAuthenticated && props.hasRole === 'ROLE_USER'){
    console.log("user")
     routes = (
      <Switch>
        <Route path="/profile" render={(props) => <Profile {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={MainPage} />
        <Redirect to="/" />
      </Switch>
    );
  }

  if(props.isAuthenticated && props.hasRole === 'ROLE_ADMIN'){
    console.log("admin")
     routes = (
      <Switch>
        <Route path="/profile" render={(props) => <Profile {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={MainPage} />
        <Redirect to="/" />
      </Switch>
    );
  }

  if(props.isAuthenticated && props.hasRole === 'ROLE_MODERATOR'){
    console.log("mod")
     routes = (
      <Switch>
        <Route path="/profile" render={(props) => <Profile {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={MainPage} />
        <Redirect to="/" />
      </Switch>
    );
  }


  return(
      <div >
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            {routes}
          </Suspense>
        </Layout>
      </div>
  )

}

const mapStateToProps = state => {
  return {
    hasRole:state.auth.role,
    token:state.auth.token,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )(App));


