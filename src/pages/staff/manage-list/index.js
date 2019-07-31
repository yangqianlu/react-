
import React, { useEffect, useState } from 'react';
import Util from '@common-js/utils.js'
const setUrl = Util.setUrl
const getRandomLength=Util.getRandomLength
function Index(props) {
  useEffect(() => {
    console.log(getRandomLength(15))
  })
  return <div></div>
}

export default Index