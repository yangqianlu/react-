import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import axios from 'axios'
import L from '@common-components/Loadable';
import IcRoute from '@common-components/IcRoute';
import BasicLayout from './layouts/BasicLayout';
import MenuConfig from './layouts/menu-config';
import './App.css';
// react-loadable 用于分片加载
let Talent = L({
  loader: () => import('./pages/talent'),
});
let Information = L({
  loader: () => import('./pages/information'),
});
let Staff = L({
  loader: () => import('./pages/staff'),
});
let Account = L({
  loader: () => import('./pages/account'),
});

class App extends React.Component {
  componentDidMount() {
    console.log(process.env, 'process.env.NODE_ENV')
    axios.post('/api/auth/login/account', {

    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (<div className="App">
      <BasicLayout>
        <Switch>
          <IcRoute
            title={MenuConfig[0].name}
            path={MenuConfig[0].path}
            component={Talent}
          />
          <IcRoute
            title={MenuConfig[1].name}
            path={MenuConfig[1].path}
            component={Information}
          />
          <IcRoute
            title={MenuConfig[2].name}
            path={MenuConfig[2].path}
            component={Staff}
          />
          <IcRoute
            title={MenuConfig[3].name}
            path={MenuConfig[3].path}
            component={Account}
          />
          {/* 无匹配到的路由默认转到首页 */}
          <Redirect to={MenuConfig[0].path} />
        </Switch>
      </BasicLayout>
    </div>)
  }
}



export default App;


