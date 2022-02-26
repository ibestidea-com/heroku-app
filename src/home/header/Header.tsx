import React from 'react';
import {Layout, Menu, Row, Col, Modal, message, Button} from 'antd';
import CSS from './header.module.scss';
import {
    FireOutlined,
    RedEnvelopeOutlined,
    UsergroupAddOutlined,
    BookOutlined,
    BorderInnerOutlined,
    BulbTwoTone, SmileOutlined
} from '@ant-design/icons';
import avatar from '../../assets/img/avatar.png';
import rpc from '../rpc/index'


/**
 * 页头页面
 *
 * @author 李元坝
 * @date 20220226
 */
class Header extends React.Component {
    state = {
        current: 'create',
        createLoading: false,
        createDisabled: false
    };

    /**
     * 创建账户
     */
    createAccount = () => {
        let ethAddress = window.sessionStorage.getItem('ethAddress');
        if (ethAddress != null) {
            let param = {address: ethAddress,}
            let that = this;
            that.setState({createLoading: true, createDisabled: true})
            rpc.post('/account/create', param, {}).then((resp: any) => {
                // console.log(resp)
                let json = JSON.stringify(resp);
                let data = JSON.parse(json);
                let content = 'serialId:' + data.result.serialId + ' \n ' +
                    'id:' + data.result.id + ' \n ' +
                    'address:' + data.result.address + '\n' +
                    'userName:' + data.result.userName + '\n' +
                    'createdAt:' + data.result.createdAt + '\n' +
                    'updatedAt:' + data.result.updatedAt + '\n' +
                    'roleId:' + data.result.roleId + '\n' +
                    'status:' + data.result.status + '\n' +
                    'displayName:' + data.result.displayName + '\n' +
                    'country:' + data.result.country + '\n' +
                    'biography:' + data.result.biography + '\n' +
                    'phone:' + data.result.phone + '\n' +
                    'language:' + data.result.language + '\n' +
                    'email:' + data.result.email + '\n';
                if (data.statusCode === 200) {
                    Modal.confirm({
                        title: '您已经成功创建账户信息',
                        icon: <SmileOutlined style={{color: '#108ee9'}}/>,
                        content: content,
                        okText: '保存',
                        cancelText: '取消',
                        okType: 'primary',
                        onOk() {
                            console.log('OK');
                            //先进行缓存清理，在进行存储
                            window.sessionStorage.removeItem('user');
                            window.sessionStorage.setItem('user', JSON.stringify(data.result));
                            that.setState({createLoading: false, createDisabled: false})
                        },
                        onCancel() {
                            console.log('Cancel');
                            that.setState({createLoading: false, createDisabled: false})
                        },
                    });
                } else {
                    message.warn(JSON.stringify(resp));
                    that.setState({createLoading: false, createDisabled: false})
                }
            })
        } else {
            message.warn('请先链接钱包获取ETH地址');
        }

    }

    /**
     * 菜单点击方法
     *
     * @param e 菜单对象参数
     * @author 李元坝
     * @date 20220226
     */
    handleClick = (e: any) => {
        this.setState({current: e.key});
        if (e.key === 'create') {
            this.createAccount();
        }
    };

    render() {
        const {current, createLoading, createDisabled} = this.state;
        return (<Layout.Header className={CSS.header}>
            <BulbTwoTone className={CSS.logo}/>
            <span className={CSS.title}>HerokuApp</span>
            <Row justify="end">
                <Col span={10}>
                    <Menu onClick={this.handleClick} theme='dark' selectedKeys={[current]}
                          mode="horizontal">
                        <Menu.Item key="mint" icon={<FireOutlined/>}>
                            Mint
                        </Menu.Item>
                        <Menu.Item key="drops" icon={<RedEnvelopeOutlined/>}>
                            Drops
                        </Menu.Item>
                        <Menu.Item key="team" icon={<UsergroupAddOutlined/>}>
                            Team
                        </Menu.Item>
                        <Menu.Item key="blog" icon={<BookOutlined/>}>
                            Blog
                        </Menu.Item>
                        <Menu.Item key="create" disabled={createDisabled}>
                            <Button type="primary" loading={createLoading} icon={<BorderInnerOutlined/>}/>创建账号
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={1}> <img className={CSS.avatar} src={avatar} alt="avatar"/></Col>
            </Row>

        </Layout.Header>);
    }
}

export default Header;
