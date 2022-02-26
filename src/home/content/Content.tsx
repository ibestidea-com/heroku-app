import React from "react";
import {Row, Col, message, Button} from 'antd';
import classNames from 'classnames';
import CSS from './content.module.scss';
import Moralis from "moralis";


/* 初始化Moralis */
const serverUrl = "https://qpzvt0kqtt9w.usemoralis.com:2053/server";
const appId = "WWuDM6Un8ZAUDPbWnf3I3w8dNFR8j2SL6yzROrBp";
Moralis.start({serverUrl, appId});

/**
 * 内容页面
 *
 * @author 李元坝
 * @date 20220226
 */
class Content extends React.Component {

    state = {
        address: '',
        logOutLoadings: false,
        loginLoadings: false,
    };

    /**
     * 检测MetaMask是否已经安装
     */
    isMetaMaskInstalled = () => {
        // @ts-ignore
        const {ethereum} = window
        return Boolean(ethereum && ethereum.isMetaMask)
    }

    /* 获取钱包地址*/
    login = async () => {
        let that = this;
        if (!this.isMetaMaskInstalled()) {
            message.error('您没有安装MetaMask插件，请先安装插件，插件地址：https://metamask.io');
        } else {
            let user: any = Moralis.User.current();
            if (user == null) {
                that.setState({loginLoadings: true})
                // @ts-ignore
                user = await Moralis.authenticate({signingMessage: "Log in using Moralis"}).then(function (user) {
                    // console.log("logged in user:", user);
                    // console.log(user.get("ethAddress"));
                    that.setState({loginLoadings: false, address: user.get("ethAddress")})
                    message.warn('您已获取账户信息，ETH地址:' + user.get("ethAddress"));
                    window.sessionStorage.setItem('ethAddress', user.get("ethAddress"));
                }).catch((error) => {
                    console.log(error);
                    that.setState({loginLoadings: false, address: ''})
                    window.sessionStorage.removeItem('ethAddress');
                });
                //
            } else {
                // console.log(user);
                // console.log(user.get("ethAddress"));
                that.setState({address: user.get("ethAddress")});
                window.sessionStorage.setItem('ethAddress', user.get("ethAddress"));
                message.warn('您已经获取账户信息，ETH地址:' + user.get("ethAddress"));
            }
        }
    }
    /**
     * 断开钱包链接
     */
    logOut = async () => {
        let that = this;
        that.setState({logOutLoadings: true})
        await Moralis.User.logOut().then(() => {
            that.setState({logOutLoadings: false, address: ''})
            window.sessionStorage.removeItem('ethAddress');
        }).catch(() => {
            that.setState({logOutLoadings: false, address: ''})
        });
        message.info('钱包链接已断开');
        // console.log("logged out");
    }

    render() {
        const {address, loginLoadings, logOutLoadings} = this.state;
        return (
            <div>
                <Row justify="end">
                    <Col>
                        <span>Accounts: {address}</span>
                        <Button type="primary" onClick={this.login} style={{margin: '16px 16px'}}
                                loading={loginLoadings}>点击链接钱包</Button>
                        <Button type="primary" onClick={this.logOut} style={{margin: '16px 16px'}}
                                loading={logOutLoadings}>断开钱包</Button>
                    </Col>
                </Row>
                <div className={CSS.content}>
                    <Row justify="space-between">
                        <Col span={4} className={CSS.contentCol}>A</Col>
                        <Col span={4} className={CSS.contentCol}>B</Col>
                        <Col span={4} className={CSS.contentCol}>C</Col>
                    </Row>
                    <div className={CSS.container}>
                        <div className={`${CSS.top} ${CSS.A}`}>A</div>
                        <div className={[CSS.top, CSS.B].join(' ')}>B</div>
                        <div className={classNames(CSS.top, CSS.C)}>C</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;
