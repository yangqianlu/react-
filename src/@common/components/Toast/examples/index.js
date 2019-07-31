import './index.scss';

import React, { Component } from 'react';
import { render } from 'react-dom';

import Toast from '../index';

import Button from '../../Button';

class ToastExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;
    let { className, ...other } = props;

    return (
      <div className="toast-example">
        <Button
          type="primary"
          onClick={() => {
            let to = Toast.info('info', {
              time: 3000,
            });
          }}>
          info
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          type="primary"
          onClick={() => {
            let to = Toast.successnoicon('success-no-icon', {
              time: 3000,
            });
          }}>
          success-no-icon
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          type="primary"
          onClick={() => {
            let to = Toast.warningnoicon('warning-no-icon', {
              time: 3000,
            });
          }}>
          warning-no-icon
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          type="primary"
          onClick={() => {
            let to = Toast.errornoicon('error-no-icon', {
              time: 3000,
            });
          }}>
          error-no-icon
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          type="primary"
          onClick={() => {
            let to = Toast.success('success', {
              time: 3000,
            });
          }}>
          success
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          type="primary"
          onClick={() => {
            let to = Toast.warning('warning', {
              time: 3000,
            });
          }}>
          warning
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          type="primary"
          onClick={() => {
            let to = Toast.error('error', {
              time: 3000,
            });
          }}>
          error
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          type="primary"
          onClick={() => {
            let to = Toast.newwarning('new-warning', {
              time: 3000,
            });
          }}>
          new-warning
        </Button>
      </div>
    );
  }
}

render(<ToastExample />, document.getElementById('j-react-root'));
