import './src/scss/index.scss';
import React, { Component } from 'react';
import { isFunction } from 'lodash';
import { render, unmountComponentAtNode as unmount } from 'react-dom';
import Icon from '../Icon';

class ToastStruct extends Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
  }

  // toast 消失时需要移除容器
  componentWillUnmount() {
    let props = this.props;

    isFunction(props.onClose) && props.onClose();
    document.body.removeChild(props.container);
  }

  componentDidMount() {
    let props = this.props;
    props.time !== 0 &&
      setTimeout(() => {
        unmount(props.container);
      }, props.time);
  }

  close = () => {
    unmount(this.props.container);
  };

  render() {
    let props = this.props;

    let { icon, type, time } = props;

    icon =
      icon ||
      {
        info: '',
        success: 'status_succeed',
        warning: 'warning-line',
        error: 'status_failed',
      }[type];

    let className = `
      ic-toast-wrapper
      ic-toast-${type}
      ic-toast-${props.position}
    `.replace(/[\r\n]+|\s+/g, ' ');

    return (
      <div
        className={className}
        style={{
          animation: `ic-toast-animation ${time}ms forwards`,
        }}>
        <div className="ic-toast">
          {icon && <Icon type={icon} />}
          {props.content}
        </div>
      </div>
    );
  }
}

ToastStruct.defaultProps = {
  position: 'middle',
  time: 3000,
};

function showToast(type, content, props) {
  let container = document.createElement('div');

  document.body.appendChild(container);

  return render(
    <ToastStruct
      {...props}
      content={content}
      type={type}
      container={container}
    />,
    container
  );
}

let Toast = {};
[
  'info',
  'success',
  'successnoicon',
  'warningnoicon',
  'errornoicon',
  'warning',
  'error',
  'newwarning',
].forEach((type) => {
  Toast[type] = (content, options) => {
    return showToast(type, content, options);
  };
});

export default Toast;
