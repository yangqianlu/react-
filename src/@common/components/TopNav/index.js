import './index.scss';
import React, { Component } from 'react';
import { Menu ,Layout} from 'antd';
import { withRouter ,NavLink} from 'react-router-dom';
const { Header, Content, Sider } = Layout;
@withRouter
class TopNav extends Component {
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.location.pathname,'nextProps')
    if (nextProps.location.pathname !== this.props.location.pathname) {
         this.props.changeSide(nextProps.location.pathname)
    } 
 }
 
  render() {
    const props = this.props;
    const { pathname } = props.location;
    //onepathname=/staff /tanlent ...
    const onepathname = '/' + pathname.split('/')[1];

    const { menuMap } = props;    
    return (  
      <Header className="hook-header">
        <Menu selectedKeys={[onepathname]}   mode="horizontal">
          {menuMap.map((item, index) => {
            if (item.path !== '/account') {
              return (
                <Menu.Item key={item.path} name={item.name}>
                  <NavLink to={item.path}>{item.name}</NavLink> 
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Header>   
    );
  }
}

export default TopNav;
