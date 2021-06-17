import React, { Component } from "react";
import './index.less'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import Icon from "@ant-design/icons"
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.jpg'
const { SubMenu } = Menu;
export default class Index extends Component {
    getMenuNodes_map = (menuList) => {
            return menuList.map(item => {
                    if (!item.children) {
                        return ( <
                            Menu.Item key = { item.key } >
                            <
                            link to = { item.key } >
                            <
                            Icon type = { item.icon } >
                            <
                            /Icon> <
                            span > { item.title } < /span> <
                            /link> <
                            /Menu.Item>
                        )
                    } else {
                        return ( <
                            SubMenu key = { item.key }
                            title = { < span > < Icon type = { item.icon } > < /Icon><span>{item.title}</span > < /span>}> {
                                    this.getMenuNodes(item.children)
                                } <
                                /SubMenu>

                            )
                        }
                        return
                    });
            }
            getMenuNodes = (menuList) => {
                    const path = this.props.location.pathname;
                    return menuList.reduce((pre, item) => {
                            if (!item.children) {
                                pre.push(( <
                                    Menu.Item key = { item.key } >
                                    <
                                    link to = { item.key } >
                                    <
                                    Icon type = { item.icon } >
                                    <
                                    /Icon> <
                                    span > { item.title } < /span> <
                                    /link> <
                                    /Menu.Item>
                                ))
                            } else {
                                const cItem = item.children.find(cItem => cItem.key === path)
                                if (cItem) {
                                    this.openKey = item.key
                                }

                                pre.push(( <
                                        SubMenu key = { item.key }
                                        title = { < span > < Icon type = { item.icon } > < /Icon><span>{item.title}</span > < /span>}> {
                                                this.getMenuNodes(item.children)
                                            } <
                                            /SubMenu>
                                        ))
                                }
                                return pre
                            }, [])
                    }
                    componentWillMount() {
                        this.menuNodes = this.getMenuNodes(menuList)
                    }

                    render() {
                        // const menusNodes=this.getMenuNodes(menuList)
                        const path = this.props.location.pathname;
                        const openKey = this.openKey
                        return ( <
                            div >
                            <
                            div className = "left-nav" >
                            <
                            Link to = '/'
                            className = "left-nav-header" >
                            <
                            img src = { logo }
                            alt = "logo" / >
                            <
                            h1 > 硅谷后台 < /h1> <
                            /Link> <
                            /div> <
                            Menu selectedKeys = {
                                [path] }
                            defaultOpenKeys = {
                                [openKey] }
                            mode = "inline"
                            theme = "dark" >
                            {
                                this.menuNodes
                            } <
                            /Menu> <
                            /div>
                        )
                    }
                }
                // export default withRouter(LeftNav)