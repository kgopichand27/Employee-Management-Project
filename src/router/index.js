import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import AllEmployees from '../components/Operations/Admin/employees'
// import AddEmployee from '../components/Operations/Admin/addemployee'
import AddEmp from '../components/Operations/Admin/addEmp'
import EditEmployee from '../components/Operations/Admin/editemployee'
import Home from '../components/Operations/Admin/home'
import notifications from '../components/Operations/Admin/notifications'
import changepasswordAdmin from '../components/Operations/Admin/changepassword'
import EditAdmin from '../components/Operations/Admin/Edit'


import AllEmployeesMng from '../components/Operations/Manager/employees'
import AddEmployeeMng from '../components/Operations/Manager/addemployee'
import EditEmployeeMng from '../components/Operations/Manager/editemployee'
import leaveNotifications from '../components/Operations/Manager/leavenotifications'
import ManagerHome from '../components/Operations/Manager/home'
import AllEmployeestoMng from '../components/Operations/Manager/allemployees'
import leaveRequestMng from '../components/Operations/Manager/leaverequest'
import changepasswordMng from '../components/Operations/Manager/changepassword'
import Edit from '../components/Operations/Manager/edit'

import leaveRequestEmp from '../components/Operations/Employee/leaverequest'
import EmployeeHome from '../components/Operations/Employee/home'
import Employees from '../components/Operations/Employee/employees'
import changepasswordEmp from '../components/Operations/Employee/changepassword'
import EditEmployeeSelf from '../components/Operations/Employee/editEmp'

import forgetpassword from '../components/forgetpassword'
import reset from '../components/reset'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: forgetpassword
  },
  {
    path: '/Admin',
    name: 'Home',
    component: Home
  },
  {
    path: '/Employee',
    name: 'EmployeeHome',
    component: EmployeeHome
  },
  {
    path: '/Manager',
    name: 'ManagerHome',
    component: ManagerHome
  },
  {
    path: '/Admin/Employees',
    name: 'Employees',
    component: AllEmployees
  },
  // {
  //   path: '/Admin/Addemployee',
  //   name: 'AddEmployee',
  //   component: AddEmployee
  // },
  {
    path: '/Admin/Addemployee',
    name: 'AddEmp',
    component: AddEmp
  },
  {
    path: '/Admin/Employees/:id',
    name: 'EditEmployee',
    component: EditEmployee
  },
  {
    path:'/Admin/notifications',
    name: 'notifications',
    component:notifications
  },
  {
    path:'/Admin/changepassword',
    name: 'changepasswordAdmin',
    component:changepasswordAdmin
  },
  {
    path: '/Admin/Edit',
    name: 'EditAdmin',
    component: EditAdmin
  },
  {
    path: '/Manager/Employees',
    name: 'AllEmployeesMng',
    component: AllEmployeesMng
  },
  {
    path:'/Manager/AddEmployee',
    name:'AddEmployeeMng',
    component: AddEmployeeMng
  },
  {
    path:'/Manager/notifications',
    name:'leaveNotifications',
    component:leaveNotifications

  },
  {
    path:'/Manager/Employees/:id',
    name: 'EditEmployeeMng',
    component:EditEmployeeMng
  },
  {
    path:'/Manager/AllEmployees',
    name: 'AllEmployeestoMng',
    component:AllEmployeestoMng
  },
  {
    path:'/Manager/leave',
    name: 'leaveRequestMng',
    component:leaveRequestMng
  },
  {
    path:'/Manager/changepassword',
    name: 'changepasswordMng',
    component:changepasswordMng
  },
  {
    path:'/Manager/Edit',
    name: 'Edit',
    component:Edit
  },
  {
    path:'/Employee/leave',
    name: 'leaveRequestEmp',
    component:leaveRequestEmp
  },
  {
    path:'/Employee/Employees',
    name: 'Employeees',
    component:Employees
  },
  {
    path:'/Employee/changepassword',
    name: 'changepasswordEmp',
    component:changepasswordEmp
  },
  {
    path:'/Employee/Edit',
    name: 'EditEmployeeSelf',
    component:EditEmployeeSelf
  },
  {
    path: '/reset',
    name: 'reset',
    component: reset,
    meta: {
        requiresAuth: false,
        requiredRole: null
      }
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
