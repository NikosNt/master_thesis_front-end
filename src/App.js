import React,{Suspense} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import './App.module.css'; 
import MainPage from './containers/MainPage/MainPage'
import Layout from './hoc/Layout/Layout'

const Login = React.lazy(() => {
  return import('./containers/Auth/Login/Login');
});

const Register = React.lazy(() => {
  return import('./containers/Auth/Register/Register');
});

const Profile = React.lazy(() => {
  return import('./containers/Profile/Profile');
});

const app = (props) => {



  let routes = (
    <Switch>
      <Route path="/login" render={(props) => <Login {...props}/>} />
      <Route path="/register" render={(props) => <Register {...props}/>} />
      <Route path="/profile" render={(props) => <Profile {...props}/>} />
      <Route path="/" exact component={MainPage} />
      <Redirect to="/" />
    </Switch>
  );

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

export default withRouter(app);


