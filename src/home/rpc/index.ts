import axios from 'axios';

let base = 'https://enigmatic-gorge-44583.herokuapp.com';

//request interceptor request拦截器,可在发送请求之前设置token
axios.interceptors.request.use((config: any) => {
    config.timeout = 8000;//超时设置
    config.headers['accept'] = 'application/json';//请求头设置
    config.headers['Content-Type'] = 'application/json';//请求头设置
    let token = window.sessionStorage.getItem('token');
    if (token) {
        config.headers.common['Authorization'] = "Bearer " + token;//设置token
    }
    return config
});
//response拦截器==>对响应做处理
axios.interceptors.response.use(
    response => {  //成功请求到数据
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            console.error(response)
            return "请求错误";
        }
    },
    error => {  //响应错误处理
        if (error.response.status === 401) {
            // 401 说明 token 验证失败,直接跳转到登录页面，重新登录获取 token
            console.error('登录验证失败-' + error);
            window.location.href = '/login'
        } else if (error.response.status === 404) {
            // 服务器后服务后端没有请求的地址错误
            console.error('请求的后台地址不存在-' + error);
        } else if (error.response.status === 500) {
            // 服务器后台程序错误
            return error
        } else {
            // 返回 response 里的错误信息
            return error
        }

    }
);
/**
 * 封装http请求公用方法
 */
const rpc = {
    //post请求
    post: (url: any, params: any, transformResponse: any) => {
        let trans: any = axios.defaults.transformResponse;
        trans = (typeof (transformResponse) == 'function') ? trans.concat(transformResponse) : trans;
        return axios.post(base + url, params, {transformResponse: trans})
    },
    //get请求
    get: (url: any, params: any) => {
        return axios.get(base + url, {params: params})
    },
    transformResponse: (data: any) => {
        // eslint-disable-next-line no-console
        console.log(data);
        return data;
    },
    //文件下载
    downloadFileRequest: (url: any, params: any) => {
        return axios.get(base + url, {
            params: params,
            responseType: 'blob',
            headers: {
                'Authorization': "Bearer " + window.sessionStorage.getItem('token')//设置token
            }
        });
    }
};
/**
 * axios封装
 *
 * @author 李元坝
 * @date 20220226
 */
export default rpc;
