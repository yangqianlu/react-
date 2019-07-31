import React, { useCallback, useState } from 'react'
import { Modal } from 'antd';

function ToolModal(props) {
  console.log(props.visible, 'vis')
  let [val, setVal] = useState('0')

  function handleOk() {
    props.onOk(val)
  }
  // const handChange =useCallback((e)=>{
  //   setVal(e.target.value)
  // },[])
  function handChange(e) {
    setVal(e.target.value)
  }

  return <div>
    <Modal
      title="Basic Modal"
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onClose}
    >
      <input value={val} onChange={(e) => handChange(e)} />
    </Modal>
  </div>

}
export default ToolModal