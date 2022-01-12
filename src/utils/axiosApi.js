import axios from 'axios'
import {Message} from 'element-ui';
import router from "@/router";

//请求拦截器
axios.interceptors.request.use(confiq => {
    //如果存在token，请求携带token
    if (window.sessionStorage.getItem('tokenStr')) {
        confiq.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return confiq;
}, error => {
    console.log(error);
});


//响应拦截器
axios.interceptors.response.use(success => {
    //业务逻辑错误
    if (success.status && success.status == 200) {
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403||success.data.code == 400) {
            Message.error({message: success.data.message});
            return;
        }
        if (success.data.message) {
            Message.success({message: success.data.message});
        }
    }
    return success.data;
}, error => {
    if (error.response.code == 504 || error.response.code == 404) {
        Message.error({message: '服务器被吃了'});
    } else if (error.response.code == 403) {
        Message.error({message: '权限不足，请联系管理员'});
    } else if (error.response.code == 401) {
        Message.error({message: '尚未登陆，请登录'});
        router.replace('/home');
    } else {
        if (error.response.data.message) {
            Message.error({message: error.response.data.message});
        } else {
            Message.error({message: '未知错误!'});
        }
    }
    return;
});

let base = '';

//传送json格式的post请求
export const postLogin = (params1,params2,params3) => {
    return axios({
        url: "http://localhost:8884/user/login",
        method: "post",
        data: {
            account: params1,
            password: params2,
            whichpeople: params3
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}

export const postRegister = (params1,params2,params3,params4,params5,params6,params7,params8,params9) => {
    return axios({
        url: "http://localhost:8884/user/regist",
        method: "post",
        data: {
            email:params1,
            whichpeople: params2,
            account:params3,
            password:params4,
            code:params5,
            studentid:params6,
            stu_name:params7,
            sex:params8,
            grade:params9,
            college:"",
            class_:"",
            tutor_name:"",
            dormitory:"",
            nativeplace:"",
            address:"",
            phone:"",
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}

export const postEmail = (params1,params2) => {
    return axios({
        url: "http://localhost:8884/user/sendRegistEmail",
        method: "post",
        data: {
            email:params1,
            whichPeople: params2,
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}

export const postFind = (params1) => {
    return axios({
        url: "http://localhost:8884/user/findPassword",
        method: "post",
        data: {
            email:params1,
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}
//传送json的put请求
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: '${base}${url}',
        data: params
    })
}

//传送json的get请求
export const getAdmin = (params1,params2) => {
    return axios({
        url: "http://localhost:8884/user/getUser",
        method: "post",
        data: {
            whichpeople:params1,
            account:params2
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}

//传送json的delete请求
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: '${base}${url}',
        data: params
    })
}