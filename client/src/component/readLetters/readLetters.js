import React, { Component } from 'react';
// import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon ,Row, Col,Input,Button,Modal} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class ReadLetters extends React.Component {
  constructor(props){
    super(props);
    this.state={
      users: [],
      collapsed: false,
      value:{},
      visible: false,
      letterContent:''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }
  // state = {
  //   size: 'large',
  // };

  handleChange(event) {
    // console.log(event.target.id)
    var stateValue = this.state.value
    stateValue[event.target.id]=event.target.value
    this.setState({value: stateValue});
  }

  handleSubmit(event) {
    console.log('!!!',event.target)
    // alert('A name was submitted: ' + this.state.value[event.target.id]);
    event.preventDefault();
    fetch('/api/letters/readthis',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        _id:event.target.id,
        passport: this.state.value[event.target.id]
      })
    })
    .then(res => res.json())
    .then((resJson)=>{
      console.log(resJson.passport)
      if(resJson.message=="密碼錯誤"){
        alert("通關密語錯囉！請再確認！")
      }else{
      // alert("密語傳遞內容："+resJson.message)
      this.showModal(resJson.message)
      }
      //回到上一層
    })
    .catch((e)=>{
      console.log(e)
    })
  }


  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  componentDidMount() {
    fetch('/api/letters')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  showModal = (content) => {
    this.setState({
      visible: true,
      letterContent:content
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return(
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Secret</Breadcrumb.Item>
          <Breadcrumb.Item>Read</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 720 }}>
        密語傳遞
        <Modal
          title="密語傳遞內容"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{this.state.letterContent}</p>
          
        </Modal>
          <div style={{padding:20}}>
            <Row type="flex" justify="center">
              {this.state.users.map(user =>
                <Col style={{margin:10}} span={5} offset={1}>
                  <div style={{'text-align':'center','border-radius':10,'padding-top':65,minHeight:250,background: 'hsla(240, 0%, 50%, 0.6)'}}>
                    <div style={{'vertical-align':'middle'}} id={user._id}>
                      <h3>{user.fromName}</h3>
                      <h5>{user.title}</h5>
                      <h3>{user.toName}</h3>
                      <div style={{width:'80%',"marginTop":'130',margin:'0px auto'}}>
                      <form onSubmit={this.handleSubmit} id={user._id}>
                        <label>
                     
                          <Input placeholder="通關密語" type="text" onChange={this.handleChange} id={user._id}/>
                        </label>
                        <Input style={{color:"black"}} type="submit" value="Read"/>
                      </form>
                       
                        
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default ReadLetters;