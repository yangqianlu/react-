import './scss/layout.scss';
import React, { Component } from 'react';
// import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import TopNav from '@common-components/TopNav';
import SideMenu from '@common-components/SideMenu';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';


import menuMap from './menu-config';
import { withRouter } from 'react-router';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
@withRouter
// @inject('globalStore')
// @observer
class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: '',
      titleIcon: void 0,
      isT: true, //侧边栏是否展开
      url: null,
      hasSilde: false, //侧边栏是存在
      hasFoot: true,
      mode: null, //侧边栏自定义布局
    };
  }


  componentWillMount() {
    //监听侧边栏自定义布局 和url
    let path = this.props.location.pathname;
    this.changeSideMenu(path);
  }

  changeSideMenu(path) {
    let patthFather = '/' + path.split('/')[1];
    let mode = null; //模块
    let hasSilde = null; //是否有侧边栏
    for (let key in menuMap) {
      let child = menuMap[key].child;
      if (child && child.length > 0) {
        for (let key2 in child) {
          //判断二级地址是否一致，一致的话获取是否展示侧边栏属性
          if (child[key2].path === path) {
            hasSilde = child[key2].hasSilde;
            break;
          }
        }
      }
      //判断一级地址是否一致，一致的话获取是是否展示dom
      if (menuMap[key].path === patthFather) {
        mode = menuMap[key].dom;
        break;
      }
    }
    this.setState(
      {
        mode: mode,
        url: patthFather,
        isT: hasSilde,
        hasSilde: hasSilde,
      }
    );
  }
  render() {
    const state = this.state;
    const props = this.props;
    return (
        <Layout>
        <TopNav changeSide={this.changeSideMenu.bind(this)} menuMap={menuMap} />
        <Layout>
        {this.state.hasSilde ? (
          <SideMenu
            url={state.url}
            mode={state.mode}
            menuMap={menuMap}
            onToggle={this.onToggle}
            onChange={this.onSideMenuChange}
            initHandler={this.onSideMenuChange}
          />
        ) : null}      
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {props.children}
            </Content>
          </Layout>
          </Layout>
          </Layout>
    
    );
  }
}
export default BasicLayout;
