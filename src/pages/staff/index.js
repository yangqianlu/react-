
import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import IcRoute from '@common-components/IcRoute';
import MenuConfig from '../../layouts/menu-config';
import L from '@common-components/Loadable';
import Url from 'url'
class Index extends Component {
  // react-loadable 用于分片加载
  StaffList = L({
    loader: () => import('./manage-list'),
  });
  StaffDetail = L({
    loader: () => import('./manage-detail'),
  });
  Depart = L({
    loader: () => import('./depart'),
  });
  Post = L({
    loader: () => import('./post'),
  });
 
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props.location.pathname, 'lac')
  }
  componentDidUpdate(prevProps) {
    console.log(this.props.location.pathname, 'prevProps')
    // console.log(Url.parse(window.location.href), 'href====')
  }

  render() {
    return (
      <Switch>
        <IcRoute
          title={MenuConfig[2].child[0].name}
          exact
          path={MenuConfig[2].child[0].path}
          component={this.StaffList}
        />
        <IcRoute
          title={MenuConfig[2].child[1].name}
          exact
          path={MenuConfig[2].child[1].path}
          component={this.StaffDetail}
        />
        <IcRoute
          title={MenuConfig[2].child[2].name}
          exact
          path={MenuConfig[2].child[2].path}
          component={this.Depart}
        />
        <IcRoute
          title={MenuConfig[2].child[3].name}
          exact
          path={MenuConfig[2].child[3].path}
          component={this.Post}
        />
      

        <Redirect to={MenuConfig[2].child[0].path} />
      </Switch>
    );
  }
}
export default Index;

