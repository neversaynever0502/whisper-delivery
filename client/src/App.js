import React, { Component } from 'react';
import { Switch, Route ,Link} from 'react-router-dom'
import ReadLetter from './component/readLetters/readLetters'
import PostLetter from './component/postLetters/postLetters'

import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon ,Row, Col,Input} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  // componentDidMount() {
  //   fetch('/api/letters')
  //     .then(res => res.json())
  //     .then(users => this.setState({ users }));
  // }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            
          <Menu.Item key="1">
              <Link to="/">
                <Icon type="pie-chart" />
                <span>Read</span>
              </Link>
            </Menu.Item>

            
            <Menu.Item  key="2">
              <Link to="/new">
                <Icon type="desktop" />
                <span>New</span>
              </Link>
            </Menu.Item>
            
            
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>Rank</span></span>}
            >
              <Menu.Item key="3">This Week</Menu.Item>
              <Menu.Item key="4">This Month</Menu.Item>
              <Menu.Item key="5">This Year</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Rule</span></span>}
            >
              <Menu.Item key="6">Limit</Menu.Item>
              <Menu.Item key="8">Secret</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>About</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>


          

          <Route exact path='/' component={ReadLetter}/>
          <Route path='/new' component={PostLetter}/>


          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Secret Message ©2017 Created by Kai5
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

// ReactDOM.render(<SiderDemo />, mountNode);
export default SiderDemo;

// import React, { Component } from 'react';
// import './App.css';
// import 'antd/dist/antd.css';
// // ReactDOM.render(<DatePicker />, mountNode);
// import { Table, Icon } from 'antd';

// const { Column } = Table;


// class App extends Component {
//   state = {users: []}

//   componentDidMount() {
//     fetch('/users')
//       .then(res => res.json())
//       .then(users => this.setState({ users }));
//   }

//   render() {
//     return (
//       <div className="App">
//         <h1>Users</h1>
//         <Table dataSource={this.state.users}>
//           <Column
//           title="id"
//           dataIndex="id"
//           key="id"
//           />
//           <Column
//             title="username"
//             dataIndex="username"
//             key="username"
//           />
//           <Column
//             title="email"
//             dataIndex="email"
//             key="email"
//           /> 
//          </Table>
//         {this.state.users.map(user =>
//           <div key={user.id}>{user.username}=>{user.email}</div>
//         )}
//       </div>
//     );
//   }
// }

// export default App;