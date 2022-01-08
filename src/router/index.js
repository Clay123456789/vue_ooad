import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from "../views/NotFound";
import Home from "../views/Home"
import Student_Login from "../views/Student/Login"
import Student_Register from "../views/Student/Register"
import Student_FindPW from "../views/Student/FindPW"
import Student_Home from "../views/Student/Home/Student"
import Student_PersonalCenter from "../views/Student/Home/PersonalCenter"
import Student_HomePage from "../views/Student/Home/HomePage"
import Staff_Login from "../views/Staff/Login"
import Staff_Register from "../views/Staff/Register"
import Staff_FindPW from "../views/Staff/FindPW"
import Staff_Home from "../views/Staff/Home/Staff"
import Staff_PersonalCenter from "../views/Staff/Home/PersonalCenter"
import Staff_HomePage from "../views/Staff/Home/HomePage"
import Manager_Login from "../views/Manager/Login"
import Manager_Register from "../views/Manager/Register"
import Manager_FindPW from "../views/Manager/FindPW"
import Manager_Home from "../views/Manager/Home/Manager"
import Manager_PersonalCenter from "../views/Manager/Home/PersonalCenter"
import Manager_HomePage from "../views/Manager/Home/HomePage"

Vue.use(VueRouter)

//创建路由对象并配置路由规则
const router = new VueRouter({
    mode:'history',
    routes : [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/student',
            redirect: '/student/login'
        },
        {
            path: '/staff',
            redirect: '/staff/login'
        },
        {
            path: '/manager',
            redirect: '/manager/login'
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
        },
        //学生端
        {
            path: '/student/login',
            name: 'Student_Login',
            component:Student_Login
        },
        {
            path: '/student/register',
            name: 'Student_Register',
            component:Student_Register
        },
        {
            path: '/student/findPW',
            name: 'Student_FindPW',
            component:Student_FindPW
        },
        {
            // 学生端主页
            path: '/student/home',
            name: 'Student_Home',
            component: Student_Home,
            children:[
                {
                    // 学生个人信息
                    path: '/student/personalcenter',
                    name: 'Student_PersonalCenter',
                    component: Student_PersonalCenter
                },
                {
                    // 其他主页信息
                    path: '/student/homepage',
                    name: 'Student_HomePage',
                    component: Student_HomePage
                }
            ]
        },
        //教职工端
        {
            path: '/staff/login',
            name: 'Staff_Login',
            component:Staff_Login
        },
        {
            path: '/staff/register',
            name: 'Staff_Register',
            component:Staff_Register
        },
        {
            path: '/staff/findPW',
            name: 'Staff_FindPW',
            component:Staff_FindPW
        },
        {
            // 教职工端主页
            path: '/staff/home',
            name: 'Staff_Home',
            component: Staff_Home,
            children:[
                {
                    // 教职工个人信息
                    path: '/staff/personalcenter',
                    name: 'Staff_PersonalCenter',
                    component: Staff_PersonalCenter
                },
                {
                    // 其他主页信息
                    path: '/staff/homepage',
                    name: 'Staff_HomePage',
                    component: Staff_HomePage
                }
            ]
        },
        //管理员端
        {
            path: '/manager/login',
            name: 'Manager_Login',
            component:Manager_Login
        },
        {
            path: '/manager/register',
            name: 'Manager_Register',
            component:Manager_Register
        },
        {
            path: '/manager/findPW',
            name: 'Manager_FindPW',
            component:Manager_FindPW
        },
        {
            // 管理员端主页
            path: '/manager/home',
            name: 'Manager_Home',
            component: Manager_Home,
            children:[
                {
                    // 管理员个人信息
                    path: '/manager/personalcenter',
                    name: 'Student_PersonalCenter',
                    component: Manager_PersonalCenter
                },
                {
                    // 其他主页信息
                    path: '/manager/homepage',
                    name: 'Manager_HomePage',
                    component:Manager_HomePage
                }
            ]
        },
        {
            // 404 Not Found
            path: '*',
            component:NotFound
        },
    ]
})

export default router
