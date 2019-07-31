import './scss/account.scss';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import DialogShortcut from '@components/DialogShortcut';
import Img from '@components/Img';
// import SoftDeletePopover from '@components/SoftDeletePopover';
import user_avatar_img from './img/defaulthead.svg';
import retract from './img/retract.svg';
import { Drawer, Icon } from 'antd';
import { userLogOut } from '@api/login';
@withRouter
class Account extends Component {
  state = {
    visible: false,
  };
  constructor(props) {
    super(props);
    this.accountName = Cookies.get('company_name') || '';
    this.companyEmail = Cookies.get('company_email') || '';
    window.log('this.companyEmail', this.companyEmail);
  }
  // 退出登录
  Logout = () => {
    DialogShortcut.confirm({
      width: 360,
      height: 174,
      closable: false,
      content: <span style={{ whiteSpace: 'nowrap' }}>确定退出吗？</span>,
      onOk: () => {
        try {
          userLogOut({});
          Cookies.remove('dhr_b_token');
          this.props.history.push('/');
        } catch (error) {
          window.log(error);
        }
      },
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  openDrawer = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };
  setting = () => {
    this.props.history.push('/account/mine');
  };
  render() {
    return (
      <div className="u-account__wrapper">
        <Img
          className="u-account__avatar"
          onClick={this.openDrawer}
          src={user_avatar_img}
        />
        <Drawer
          className="account_drawer"
          title={null}
          mask={true}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={'266px'}>
          <div className="account_drawer__bodys">
            <div className="per_head">{this.accountName.substr(0, 1)}</div>
            <div className="email">{this.companyEmail}</div>
            <div className="lines">
              <div className="blocks" />
            </div>
            <div className="acount">
              <a onClick={this.setting}>
                <Icon type="setting" theme="filled" className="iocs" />
                设置
                <img src={retract} />
              </a>
            </div>
            <div className="lout">
              <a onClick={this.Logout}>
                <Icon type="poweroff" className="iocs" />
                退出登录
              </a>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}
export default Account;
