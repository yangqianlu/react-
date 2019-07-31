import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BrowserRouter>
  <Switch>
    <Route
      path="/"
      render={(props) => {
        // if (!Cookies.get('dhr_b_token')) {
        //   document.title = 'e成科技AI咨询-账号登录';
        //   return <Login {...props} />;
        // }
        return <App {...props} />;
      }}
    />
    
  </Switch>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
