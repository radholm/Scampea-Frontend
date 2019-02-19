import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import News from '@/components/News'
import Projects from '@/components/Projects'
import Employees from '@/components/Employees'
import TimeLogs from '@/components/TimeLogs'
import Login from '@/components/Login'
import PageNotFound from '@/components/PageNotFound'
import Settings from '@/components/Settings'
import Project from '@/components/Project'
import CreateProject from '@/components/CreateProject'
import EditProject from '@/components/EditProject'
import CreateTimeLog from '@/components/CreateTimeLog'
import ManageUsers from '@/components/ManageUsers'
import CreateUser from '@/components/CreateUser'
import EditUser from '@/components/EditUser'
import CreateNewsMessage from '@/components/CreateNewsMessage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: News
    },
    {
      path: '/projects',
      component: Projects
    },
    {
      path: '/employees',
      component: Employees
    },
    {
      path: '/timelogs',
      component: TimeLogs
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/settings',
      component: Settings
    },
    {
      path: '/manageusers',
      component: ManageUsers
    },
    {
      path: '/manageusers/create',
      component: CreateUser
    },
    {
      path: '/manageusers/:id/edit',
      component: EditUser,
      props: true
    },
    {
      path: '/projects/:id',
      component: Project,
      props: true
    },
    {
      path: '/projects/:id/edit',
      component: EditProject,
      props: true
    },
    {
      path: '/createproject',
      component: CreateProject
    },
    {
      path: '/createtimelog',
      component: CreateTimeLog
    },
    {
      path: '/createnewsmessage',
      component: CreateNewsMessage
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.getLoginStatus

  if (to.path !== '/login' && !loggedIn) {
    next('/login')
  } else if (to.path === '/login' && loggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
