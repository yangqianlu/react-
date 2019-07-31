
import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import IcRoute from '@common-components/IcRoute';
import MenuConfig from '../../layouts/menu-config';
import L from '@common-components/Loadable';

class Index extends Component {
  // react-loadable 用于分片加载
  CollectionList = L({
    loader: () => import('./collection-list'),
  });
  CollectioDetail = L({
    loader: () => import('./collection-detail'),
  });
  render() {
    return (
      <Switch>
        <IcRoute
          title={MenuConfig[1].child[0].name}
          exact
          path={MenuConfig[1].child[0].path}
          component={this.CollectionList}
        />
        <IcRoute
          title={MenuConfig[1].child[1].name}
          path={MenuConfig[1].child[1].path}
          component={this.CollectioDetail}
        />
        <Redirect to={MenuConfig[1].child[0].path} />
      </Switch>
    );
  }
}
export default Index;

