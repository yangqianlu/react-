// 全局菜单栏目
import './src/scss/index.scss';
import React, { Component, Fragment } from 'react';
import { withRouter ,NavLink} from 'react-router-dom';
import { Icon, Menu,Layout } from 'antd';
import classNames from 'classnames';
import { isFunction, debounce } from 'lodash';
const { Sider } = Layout;
@withRouter
class SideMenu extends Component {
  static defaultProps = {
    menuMap: [],
    className: '',
    mode: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isT: true,
    };

  }
  componentWillMount() { }



  /**
   * 路由跳转
   *  @param {object} info
   *  eg:
   *  {
   *    key: 路由地址,
   *    item: {
   *      props: { name: 路由名称, icon: 路由对应的icon名称 }
   *    }
   *  }
   */
  onJumpForPath = (info) => {
    console.log(info,'info')
    const props = this.props;
    props.history.push(info.key);
    isFunction(props.onChange) && props.onChange(info.item.props);
  };

  gotoUrl=(path)=>{
    console.log(path,'path=')
  }
  render() {

    const state = this.state;
    const props = this.props;
    const { pathname } = props.location;
    const { menuMap } = props;

    const urls = this.props.url;
    let childMenu = [];
    menuMap.map((item) => {
      if (item.path === urls) {
        childMenu = item.child;
      }
    });

    return (
      
            <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[pathname]}
              
              >
              {childMenu.map((item) => {
                //是否展示导航item
                if (!item.showNav) {
                  return null
                }
                return (
                  <Menu.Item key={item.path} >
                      <NavLink to={item.path} >{item.name}</NavLink> 
                  </Menu.Item>
                );
              })}
            </Menu>
            </Sider>
           
        
    );
  }
}
export default SideMenu;
