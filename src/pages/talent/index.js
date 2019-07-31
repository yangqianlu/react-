
import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import IcRoute from '@common-components/IcRoute';
import MenuConfig from '../../layouts/menu-config';
import L from '@common-components/Loadable';
class Index extends Component {
  // react-loadable 用于分片加载
  ReviewList = L({
    loader: () => import('./review-list'),
  });
  ReviewDetail = L({
    loader: () => import('./review-detail'),
  });

  render() {
    return (
      <Switch>
        <IcRoute
          title={MenuConfig[0].child[0].name}
          exact
          path={MenuConfig[0].child[0].path}
          component={this.ReviewList}
        />
        <IcRoute
          title={MenuConfig[0].child[1].name}
          exact
          path={MenuConfig[0].child[1].path}
          component={this.ReviewDetail}
        />
        <Redirect to={MenuConfig[0].child[0].path} />
      </Switch>
    );
  }
}
export default Index;
