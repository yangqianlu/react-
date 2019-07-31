import React from 'react';
import classNames from 'classnames';
import './index.scss';

export default function Icon({ type, size, className, style, ...rest }) {
  const clsString = classNames('u-icon', className, {
    [`icon-${type}`]: !!type,
  });

  const styles = {
    ...style,
    fontSize: size,
  };

  return <i className={clsString} style={styles} {...rest} />;
}
