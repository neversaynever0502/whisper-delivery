import React, { Component } from 'react';
// import './App.css';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Textarea,Breadcrumb } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}



class PostLettersForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        fetch('/api/letters',{
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then((resJson)=>{
          console.log(resJson.passport)
          prompt("讀取密碼(只會出現一次，請存下)：", resJson.passport)
          //回到上一層
        })
        .catch((e)=>{
          console.log(e)
        })
      }
    });
    console.log('finish')
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Secret</Breadcrumb.Item>
        <Breadcrumb.Item>Read</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{padding: 24, background: '#fff', minHeight: 720 }}>
      密語傳遞
        <Form style={{ "marginTop":30}}  onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('fromName', {
              rules: [{ required: true, message: 'Please input your fromName!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="From" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('toName', {
              rules: [{ required: true, message: 'Please input your toName!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="To" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input your Title!' }],
            })(
              <Input prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Title" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('message', {
              rules: [{ required: true, message: 'Please input your message!' }],
            })(
              <TextArea prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Message(secret)" />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Send
            </Button>
          </FormItem>
        </Form>
        </div>
        </div>
    );
  }
}

const WrappedPostLettersForm = Form.create()(PostLettersForm);

export default WrappedPostLettersForm;
