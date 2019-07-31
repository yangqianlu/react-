
import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import IcRoute from '@common-components/IcRoute';
import MenuConfig from '../../layouts/menu-config';
import L from '@common-components/Loadable';

class Index extends Component {
  // react-loadable 用于分片加载
  Mine = L({
    loader: () => import('./mine'),
  });

  render() {
    return (
      <Switch>
        <IcRoute
          title={MenuConfig[3].child[0].name}
          exact
          path={MenuConfig[3].child[0].path}
          component={this.Mine}
        />

        <Redirect to={MenuConfig[3].child[0].path} />
      </Switch>
    );
  }
}
export default Index;

