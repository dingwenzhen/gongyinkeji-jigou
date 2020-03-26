import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon, Row, Col, Modal } from 'antd';
import renderTabBar from "@utils/renderTabBar"
import { layoutRoute } from "@router"
import { withRouter } from "react-router-dom"
import Cookies from "js-cookie";
import { LayoutStyled } from "./styled"
import { UserNameApi, MenuListApi } from '@api'
import NewPassword from './NewPassword'
const { Header, Content, Footer, Sider } = Layout;

@withRouter
class LayoutComponent extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            sidebar: [],
            visible: false
        }
    }
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
                <Menu.Item key="EditInformation">
                    <Icon type="user" />
                    个人信息
              </Menu.Item>
                <Menu.Item key="EditPassword">
                    <Icon type="user" />
                    修改密码
              </Menu.Item>
                <Menu.Item key="signout">
                    <Icon type="user" />
                    退出登录
              </Menu.Item>
            </Menu>
        );
        return (
            <Layout style={{ height: "100%" }}>
               
                {/* 右边的内容区 */}
                <Layout>
                    
                    <Content style={{ overflow: 'auto', height: "100%" }}>
                        <div style={{ background: '#f4f4f4' }}>
                            {this.props.children}
                        </div>
                    </Content>

                </Layout>
                <Modal
                    title="修改密码"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <NewPassword CloseClick={this.handleOk.bind(this)} />
                </Modal>
            </Layout>
        )
    }
    componentDidMount() {
        // this.username()//获取用户名
        // this.MenuList()
    }
    async username() {
        let data = await UserNameApi()
        this.setState({
            name: data.data.username
        })
    }
    async MenuList() {
        let data = await MenuListApi()
        this.setState({
            sidebar: data.data
        })
    }
    handleTo({ key }) {
        this.props.history.push(key);
    }
    handleMenuClick({ key }) {
        console.log(key)
        if (key === 'signout') {
            Cookies.remove("token");
            this.props.history.push("/login")
        } else if (key === 'EditInformation') {
            this.props.history.push('/EditInformation')
        } else if (key === 'EditPassword') {
            this.setState({
                visible: true
            })
        }
    }
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
            EditPasswodBool: false
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            EditPasswodBool: false
        });
    }
}
export default LayoutComponent;