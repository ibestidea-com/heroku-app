import React from "react";
import {Layout} from 'antd';
import CSS from './footer.module.scss';


/**
 * 页脚页面
 *
 * @author 李元坝
 * @date 20220226
 */
class Footer extends React.Component {
    render() {
        return (
            <Layout.Footer className={CSS.footer}>This Page ©2022 Created by Li YuanBa</Layout.Footer>
        );
    }
}

export default Footer;
