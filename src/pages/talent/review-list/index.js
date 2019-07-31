
import React, { useState, useEffect } from 'react';
import {  Button } from 'antd';
import Url from 'url'
function Index(props) {
  function goToDetail() {
    const url = Url.format({
      pathname: '/talent/review-detail',
      // query: {
      //   id: item.key
      // },
    });
    window.open(url);
  }
  return (
    <React.Fragment>
      <Button onClick={() => goToDetail()}>详情</Button>

    </React.Fragment>
  )
}

export default Index;
