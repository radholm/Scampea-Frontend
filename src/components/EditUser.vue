<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <router-link to="/manageusers">Manage Users</router-link>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page">Edit {{ employee.first_name }} {{ employee.last_name }}</a>
          </li>
        </ul>
      </nav>
      <h1 class="title">Create User</h1>
      <h2 class="subtitle">Add a new user</h2>
      <hr>

      <form v-on:submit.prevent="edit()">
        <ImageUpload :picture="picture"></ImageUpload>
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input type="text" class="input" placeholder="Username" v-model="username">
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input type="password" class="input" placeholder="Password" v-model="password">
          </div>
        </div>
        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control">
            <input type="password" class="input" placeholder="Confirm Password" v-model="password_confirmation">
          </div>
        </div>
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input type="text" class="input" placeholder="First Name" v-model="first_name">
          </div>
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input type="text" class="input" placeholder="Last Name" v-model="last_name">
          </div>
        </div>
        <div class="field">
          <label class="label">Role</label>
          <div class="control">
            <div class="select">
              <select v-model="role.id">
                <option v-for="(role, id) in roles" :key="id" :value="role.id">{{ role.title }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Expertise</label>
          <div class="control">
            <textarea v-model="expertise" class="textarea" placeholder="Expertise"></textarea>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input v-model="permission" type="checkbox" value="Has admin permissions">
              Is admin
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" :class="{ 'is-loading': loading }" type="submit">Edit User</button>
          </div>
        </div>
      </form>
      <div v-if="submitted">
        <p v-if="res.ok" class="help is-success">User was successfully edited</p>
        <ul v-else>
          <li v-for="(error, index) in res.errors" :key="index">
            <p class="help is-danger">{{ index.toString() }}: {{ error.toString() }}</p>
          </li>
        </ul>
      </div>
      <div class="field">
        <div class="control">
          <button @click="deleteUser" class="button is-outline is-danger">
            Delete User
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ImageUpload from '@/components/SettingsComponents/ImageUpload'
export default {
  name: 'settings',
  data () {
    return {
      picture: {
        src: '',
        name: null
      },
      username: '',
      password: '',
      password_confirmation: '',
      first_name: '',
      last_name: '',
      role: '',
      permission: false,
      expertise: '',
      loading: false,
      submitted: false
    }
  },
  components: { ImageUpload },
  props: ['id'],
  mounted () {
    this.$store.dispatch('fetchRoles')
    this.$store.dispatch('fetchEmployees')
    .then(() => {
      this.picture.src = this.employee.picture
      this.expertise = this.employee.expertise
      this.permission = this.employee.permission
      this.role = this.roles.find(role => this.employee.role.id === role.id)
      this.last_name = this.employee.last_name
      this.first_name = this.employee.first_name
      this.username = this.employee.username
    })
  },
  computed: {
    loggedIn () {
      return this.$store.getters.getLoginStatus
    },
    employee () {
      let employee = this.$store.getters.getEmployees.find(employee => employee.id.toString() === this.id)
      return employee
    },
    roles () {
      return this.$store.getters.getRoles
    },
    res () {
      return this.$store.getters.getEditUserResult
    }
  },
  methods: {
    edit (e) {
      this.loading = true
      this.submitted = false
      this.$store.dispatch('editUser', {
        id: this.id,
        picture: this.picture.src === this.employee.picture ? undefined : this.picture.src,
        expertise: this.expertise === this.employee.expertise ? undefined : this.expertise,
        permission: this.permission === this.employee.permission ? undefined : this.permission,
        role_id: this.role.id === this.employee.id ? undefined : this.role.id,
        last_name: this.last_name === this.employee.last_name ? undefined : this.last_name,
        first_name: this.first_name === this.employee.first_name ? undefined : this.first_name,
        username: this.username === this.employee.username ? undefined : this.username,
        password: this.password.length < 3 && this.password_confirmation.length < 3 ? undefined : this.password,
        password_confirmation: this.password.length < 3 && this.password_confirmation.length < 3 ? undefined : this.password_confirmation

      })
      .then(() => {
        this.loading = false
        this.submitted = true
        this.$store.dispatch('fetchUserInfo')
        this.$store.dispatch('fetchEmployees')
      })
    },
    deleteUser () {
      this.$store.dispatch('deleteUser', this.id)
      .then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

</style>