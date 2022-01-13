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

//登录请求
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

//学生注册
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
//教职工注册
export const postRegister1 = (params1,params2,params3,params4,params5,params6,params7,params8) => {
    return axios({
        url: "http://localhost:8884/user/regist",
        method: "post",
        data: {
            email:params1,
            whichpeople: params2,
            account:params3,
            password:params4,
            code:params5,
            staffid:params6,
            sta_name:params7,
            sex:params8,
            college:"",
            department:"",
            nativeplace:"",
            address:"",
            phone:"",
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}
//管理员注册
export const postRegister2 = (params1,params2,params3,params4,params5,params6,params7) => {
    return axios({
        url: "http://localhost:8884/user/regist",
        method: "post",
        data: {
            email:params1,
            whichpeople: params2,
            account:params3,
            password:params4,
            code:params5,
            managerid:params6,
            phone:params7,
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}
//传送邮箱验证码
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

//找回密码
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


//获取用户信息
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
//修改学生信息
export const postAdmin = (params1,params2,params3,params4,params5,params6,params7,params8,params9,params10,params11,params12,params13,params14,params15) => {
    return axios({
        url: "http://localhost:8884/user/updateUser",
        method: "post",
        data: {
            whichpeople:params1,
            email:params2,
            account:params3,
            password:params4,
            studentid:params5,
            stu_name:params6,
            sex:params7,
            grade:params8,
            college:params9,
            class_:params10,
            tutor_name:params11,
            dormitory:params12,
            nativeplace:params13,
            address:params14,
            phone:params15,
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}
//修改教师信息
export const postAdmin1 = (params1,params2,params3,params4,params5,params6,params7,params8,params9,params10,params11,params12) => {
    return axios({
        url: "http://localhost:8884/user/updateUser",
        method: "post",
        data: {
            whichpeople: params1,
            email:params2,
            account:params3,
            password:params4,
            staffid:params5,
            sta_name:params6,
            sex:params7,
            college:params8,
            department:params9,
            nativeplace:params10,
            address:params11,
            phone:params12,
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}
//修改管理员信息
export const postAdmin2 = (params1,params2,params3,params4,params5,params6) => {
    return axios({
        url: "http://localhost:8884/user/updateUser",
        method: "post",
        data: {
            whichpeople: params1,
            email:params2,
            account:params3,
            password:params4,
            managerid:params5,
            phone:params6,
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}

//删除学生信息
export const deleteAdmin = (params1,params2) => {
    return axios({
        url: "http://localhost:8884/user/deleteUser",
        method: "post",
        data: {
            whichpeople: params1,
            studentid:params2
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}
//老师
export const deleteAdmin1 = (params1,params2) => {
    return axios({
        url: "http://localhost:8884/user/deleteUser",
        method: "post",
        data: {
            whichpeople: params1,
            staffid:params2
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}
//管理员
export const deleteAdmin2 = (params1,params2) => {
    return axios({
        url: "http://localhost:8884/user/deleteUser",
        method: "post",
        data: {
            whichpeople: params1,
            managerid:params2
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}

export const newPass = (params1,params2,params3) => {
    return axios({
        url: "http://localhost:8884/user/changePassword",
        method: "post",
        data: {
            email:params1,
            password:params2,
            newPassword:params3
        },
        header: {
            "Content-Type": "application/json",
        },
    })
}