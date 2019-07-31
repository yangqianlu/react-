
import React, { useEffect, useState } from 'react';
import Util from '@common-js/utils.js'
const setUrl = Util.setUrl
function Index(props) {
  useEffect(() => {
    console.log(setUrl())
  })
  return <div></div>
}

export default Index