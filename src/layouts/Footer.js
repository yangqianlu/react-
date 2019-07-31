import './scss/footer.scss';
import React from 'react';

export default function Footer({ className = '' }) {
  return (
    <div className={'u-footer ' + className}>
      <p>
        义橙网络科技(上海)有限公司 Copyright © 2012 - {new Date().getFullYear()}
        沪ICP备12043691号-1沪公网安备 31010102002040 号
      </p>
    </div>
  );
}
