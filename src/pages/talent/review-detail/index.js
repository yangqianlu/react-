
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss'
import Url from 'url'
function Index(props) {
  console.log(Url.parse(window.location.href, true).query)
  return (<React.Fragment>
    <div>盘点详情</div>
  </React.Fragment>)
}
export default Index;