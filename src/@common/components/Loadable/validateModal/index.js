import './index.scss';
import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import Dialog from '@common-components/Dialog';
import { trimAndLimit } from '@common-js/tool';
import tool from '@common/js/tool';
import MInput from '@common-components/MInput/MInput';
class Index extends Component {
  state = {
    len: 0,
    visible: false,
  };
  static defaultProps = {
    loading: false,
    visible: false,
    maxlen: 20,
    title: '',
    okText: '确认',
    cancelText: '取消',
    content: {},
    onOk: () => {},
    onChangeStatus: () => {},
  };
  static getDerivedStateFromProps(nextProps, preState) {
    if (nextProps.visible === void 0) {
      return null;
    }
    if (preState.visible !== nextProps.visible) {
      return {
        visible: nextProps.visible,
        len: tool.strLen(nextProps.content.name),
      };
    }
    return null;
  }
  //点击保存
  handleOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onChangeStatus();
        this.props.onOk && this.props.onOk(values);
      }
    });
  };
  //点击取消
  handleCancel = () => {
    this.props.onChangeStatus();
  };
  checkName = (rule, value, callback) => {
    if (value) {
      return callback(
        this.props.form.setFieldsValue({
          Name: value,
        })
      );
    }
    return callback();
  };

  changeFn = (e) => {
    this.setState({
      len: tool.strLen(e),
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, info, title, okText, cancelText, content } = this.props;
    // console.log(content)
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div>
        {this.state.visible ? (
          <Dialog
            title={`${title}`}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}>
            <Form {...formItemLayout}>
              <Form.Item className="validate_container" label={title}>
                {getFieldDecorator('Name', {
                  initialValue: content.name,
                  rules: [
                    {
                      whitespace: true,
                      message: ' ',
                      required: true,
                    },
                    { validator: this.checkName },
                  ],
                })(
                  <MInput
                    onChange={this.changeFn}
                    len={this.state.len}
                    maxlen={this.props.maxlen}
                    restriction={trimAndLimit.bind(null, this.props.maxlen)}
                  />
                )}
              </Form.Item>
            </Form>
          </Dialog>
        ) : null}
      </div>
    );
  }
}
export default Form.create({})(Index);
