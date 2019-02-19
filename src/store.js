import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

import router from './router'

// Centralized app data
Vue.use(Vuex)

// Auth request interceptor
// Adds token to the request if it exists
axios.interceptors.request.use(config => {
  const token = store.getters.getAccessToken
  if (token) config.headers['Authorization'] = `Bearer ${token}`

  return config
})

// Auth error interceptor
axios.interceptors.response.use(null, (error) => {
  const { status } = error.response
  console.log(error.response)

  switch (status) {
    case 401: {
      store.dispatch('logout') // Remove access token and user info if there is any
      router.push('/login')
      break
    }
    case 403: {
      alert('You must be an admin to access this page...') // TODO: Change this
      router.push('/')
      break
    }
    case 500: {
      alert('Server error')
      break
    }
    case 504: {
      alert('Unable to reach server')
      break
    }
  }

  return Promise.reject(error)
})

const store = new Vuex.Store({
  state: {
    accessToken: null,
    user: null,
    login: { errors: {} },
    projects: [],
    userProjects: [],
    project: null,
    news: [],
    timelogs: [],
    projectTimelogs: [],
    employees: [],
    projectUsers: [],
    changePassword: { errors: {}, ok: false },
    changeSettings: { errors: {}, ok: false },
    editUser: { errors: {}, ok: false },
    roles: []
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getLoginStatus: state => state.user !== null,
    getLoginErrors: state => state.login.errors,
    getPermission: state => state.user ? state.user.permission : 0,
    getUser: state => state.user || {},
    getUserPicture: state => state.user ? state.user.picture : '',
    getProjects: state => state.projects,
    getUserProjects: state => state.userProjects,
    getProject: state => state.project,
    getUserNews: state => state.news,
    getUserTimeLogs: state => state.timelogs,
    getProjectTimelogs: state => state.projectTimelogs,
    getEmployees: state => state.employees,
    getProjectEmployees: state => state.projectUsers,
    getChangePasswordResult: state => state.changePassword,
    getChangeSettingsResult: state => state.changeSettings,
    getEditUserResult: state => state.editUser,
    getRoles: state => state.roles
  },
  mutations: {
    removeAccessToken (state) {
      state.accessToken = ''
    },
    removeUserInfo (state) {
      state.user = null
    },
    setDefaultState (state) {
      Object.assign(state, {
        accessToken: null,
        user: null,
        login: { errors: {} },
        projects: [],
        userProjects: [],
        project: null,
        news: [],
        timelogs: [],
        projectTimelogs: [],
        employees: [],
        projectUsers: [],
        changePassword: { errors: {}, ok: false },
        changeSettings: { errors: {}, ok: false },
        editUser: { errors: {}, ok: false },
        roles: []
      })
    },
    addLoginErrors (state, errors) {
      if (typeof errors === 'string') {
        state.login.errors = { error: errors }
      } else {
        state.login.errors = errors
      }
    },
    removeLoginErrors (state) {
      state.login.errors = ''
    },
    addAccessToken (state, accessToken) {
      state.accessToken = accessToken
    },
    addUserInfo (state, userInfo) {
      state.user = userInfo
    },
    addProjects (state, projects) {
      state.projects = projects
    },
    addUserProjects (state, projects) {
      state.userProjects = projects
    },
    addProject (state, project) {
      state.project = project
    },
    addNews (state, news) {
      state.news = news
    },
    addTimelogs (state, timelogs) {
      state.timelogs = timelogs
    },
    addProjectTimelogs (state, timelogs) {
      state.projectTimelogs = timelogs
    },
    addEmployees (state, employees) {
      state.employees = employees
    },
    addProjectUsers (state, users) {
      state.projectUsers = users
    },
    addChangePasswordOk (state, ok) {
      state.changePassword.ok = ok
    },
    addChangePasswordErrors (state, errors) {
      if (typeof errors === 'string') {
        state.changePassword.errors = { error: errors }
      } else {
        state.changePassword.errors = errors
      }
    },
    removeChangePasswordErrors (state) {
      state.changePassword.errors = {}
    },
    addChangeSettingsOk (state, ok) {
      state.changeSettings.ok = ok
    },
    addChangeSettingsErrors (state, errors) {
      if (typeof errors === 'string') {
        state.changeSettings.errors = { error: errors }
      } else {
        state.changeSettings.errors = errors
      }
    },
    removeChangeSettingsErrors (state) {
      state.changeSettings.errors = {}
    },
    addRoles (state, roles) {
      state.roles = roles
    },
    addEditUserOk (state, ok) {
      state.editUser.ok = ok
    },
    addEditUserErrors (state, errors) {
      if (typeof errors === 'string') {
        state.editUser.errors = { error: errors }
      } else {
        state.editUser.errors = errors
      }
    },
    removeEditUserErrors (state) {
      state.editUser.errors = {}
    }
  },
  actions: {
    async login ({ commit, dispatch }, { username, password }) {
      try {
        const res = await axios({
          url: '/oauth/token',
          method: 'POST',
          data: {
            grant_type: 'password',
            client_id: process.env.OAUTH_CONFIG.client_id,
            client_secret: process.env.OAUTH_CONFIG.client_secret,
            username,
            password
          }
        })

        commit('removeLoginErrors') // Remove any login errors
        commit('addAccessToken', res.data.access_token) // Add access token to store
        dispatch('fetchUserInfo')
        .then(() => {
          router.push('/')
        })
      } catch (e) {
        commit('addLoginErrors', e.response.data.message)
      }
    },
    async deleteUser ({ commit, state, dispatch }, id) {
      await axios({
        url: `/api/user/delete/${id}`,
        method: 'DELETE'
      })

      if (state.user.id.toString() === id) {
        dispatch('logout')
      } else {
        dispatch('fetchEmployees')
        router.push('/manageusers')
      }
    },
    async fetchUserInfo ({ commit, state }, token) {
      const res = await axios({
        url: '/api/user',
        method: 'GET'
      })

      commit('addUserInfo', res.data)
    },
    async fetchUserNews ({ commit, state }) {
      const res = await axios({
        url: '/api/news',
        method: 'GET'
      })

      commit('addNews', res.data)
    },
    async fetchProjectUsers ({ commit, state }, projectId) {
      const res = await axios({
        url: `/api/project/${projectId}/users`,
        method: 'GET'
      })

      commit('addProjectUsers', res.data)
    },
    async fetchProjects ({ commit, state }) {
      const res = await axios({
        url: '/api/projects',
        method: 'GET'
      })

      commit('addProjects', res.data)
    },
    async fetchUserProjects ({ commit, state }) {
      const res = await axios({
        url: `/api/projects/${state.user.id}`,
        method: 'GET'
      })

      commit('addUserProjects', res.data)
    },
    async updateProjectName ({ commit, state, dispatch }, { projectId, name, projectManagerId }) {
      await axios({
        url: `/api/project/${projectId}`,
        method: 'PUT',
        data: {
          name,
          project_manager_id: projectManagerId
        }
      })

      dispatch('fetchProject', projectId)
    },
    async deleteProject ({ commit, state }, projectId) {
      await axios({
        url: `/api/project/${projectId}`,
        method: 'DELETE'
      })

      router.push('/projects')
    },
    async createProject ({ commit, state }, { name, projectManager }) {
      const project = await axios({
        url: '/api/project/create',
        method: 'POST',
        data: {
          name,
          project_manager_id: projectManager
        }
      })

      return project
    },
    async fetchProject ({ commit, state }, id) {
      const res = await axios({
        url: `/api/project/${id}`,
        method: 'GET'
      })

      commit('addProject', res.data)
    },
    async fetchUserLogTime ({ commit, state }) {
      const res = await axios({
        url: '/api/timelogs',
        method: 'GET'
      })

      commit('addTimelogs', res.data)
    },
    async fetchProjectLogTime ({ commit, state }, id) {
      const res = await axios({
        url: `/api/timelogs/project/${id}`,
        method: 'GET',
        data: {
          id
        }
      })

      commit('addProjectTimelogs', res.data)
    },
    async addNewsItem ({ commit }, { title, text }) {
      await axios({
        url: '/api/news/create',
        method: 'POST',
        data: {
          title,
          text
        }
      })
    },
    async addTimelog ({ commit }, { date, time, contribution, projectId }) {
      await axios({
        url: '/api/timelog',
        method: 'POST',
        data: {
          date,
          time,
          contribution,
          project_id: projectId
        }
      })
    },
    async removeUserFromProject ({ commit, state, dispatch }, { userId, projectId }) {
      await axios({
        url: `/api/project/${projectId}/user/${userId}`,
        method: 'DELETE'
      })

      dispatch('fetchProjectUsers', projectId)
    },
    async addUserToProject ({ commit, state, dispatch }, { userId, projectId }) {
      await axios({
        url: `/api/project/${projectId}/user/${userId}`,
        method: 'POST'
      })

      dispatch('fetchProjectUsers', projectId)
    },
    async fetchEmployees ({ commit, state }) {
      const res = await axios({
        url: '/api/users',
        method: 'GET'
      })

      commit('addEmployees', res.data)
    },
    logout ({ commit }) {
      commit('removeAccessToken')
      commit('removeUserInfo')
      commit('setDefaultState')

      router.push('/login')
    },
    async changePassword ({commit, state}, {
      old_password,
      new_password,
      new_password_confirmation
    }) {
      try {
        await axios({
          url: '/api/user/changePassword',
          method: 'PUT',
          data: {
            old_password,
            new_password,
            new_password_confirmation
          }
        })
        commit('addChangePasswordOk', true)
        commit('removeChangePasswordErrors')
      } catch (e) {
        commit('addChangePasswordOk', false)
        commit('addChangePasswordErrors', e.response.data.errors || e.response.data.error)
      }
    },
    async changeSettings ({commit, state}, {
      picture,
      expertise
    }) {
      try {
        await axios({
          url: '/api/user/update',
          method: 'PUT',
          data: {
            picture,
            expertise
          }
        })
        commit('addChangeSettingsOk', true)
        commit('removeChangeSettingsErrors')
      } catch (e) {
        commit('addChangeSettingsOk', false)
        commit('addChangeSettingsErrors', e.data.errors || e.data.error)
      }
    },
    async fetchRoles ({ commit, store }) {
      const res = await axios({
        url: '/api/roles',
        method: 'GET'
      })

      commit('addRoles', res.data)
    },
    async createUser ({ commit, store }, {
      picture,
      username,
      password,
      password_confirmation,
      first_name,
      last_name,
      role,
      permission
    }) {
      await axios({
        url: '/api/user/create',
        method: 'POST',
        data: {
          picture,
          username,
          password,
          password_confirmation,
          first_name,
          last_name,
          role,
          permission
        }
      })

      router.push('/manageusers')
    },
    async editUser ({commit, state}, {
      id,
      picture,
      expertise,
      username,
      password,
      password_confirmation,
      first_name,
      last_name,
      role_id,
      permission
    }) {
      try {
        await axios({
          url: `/api/user/update/${id}`,
          method: 'PUT',
          data: {
            picture,
            expertise,
            username,
            password,
            password_confirmation,
            first_name,
            last_name,
            role_id,
            permission
          }
        })
        commit('addEditUserOk', true)
        commit('removeEditUserErrors')
      } catch (e) {
        commit('addEditUserOk', false)
        commit('addEditUserErrors', e.response.data.errors || e.response.data.error)
      }
    }
  },
  plugins: [createPersistedState()]
})

export default store
