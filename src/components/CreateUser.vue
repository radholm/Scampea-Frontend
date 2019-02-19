<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><router-link to="/manageusers">Manage Users</router-link></li>
          <li class="is-active"><a href="#" aria-current="page">Create New</a></li>
        </ul>
      </nav>
      <h1 class="title">Create User</h1>
      <h2 class="subtitle">Add a new user</h2>
      <hr>

      <form v-on:submit.prevent="createUser()">
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
              <select v-model="role">
                <option v-for="(role, id) in roles" :key="id" :value="role.id">{{ role.title }}</option>
              </select>
            </div>
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
          <button class="button submit is-primary" type="submit">
            Create User
          </button>
        </div>
     </form>
    </div>
  </section>
</template>

<script>
import ImageUpload from '@/components/SettingsComponents/ImageUpload'
export default {
  components: { ImageUpload },
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
      permission: false
    }
  },
  mounted () {
    this.$store.dispatch('fetchRoles')
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    loggedIn () {
      return this.$store.getters.getLoginStatus
    },
    roles () {
      return this.$store.getters.getRoles
    }
  },
  methods: {
    createUser () {
      this.$store.dispatch('createUser', {
        username: this.username,
        password: this.password,
        password_confirmation: this.password_confirmation,
        first_name: this.first_name,
        last_name: this.last_name,
        role: this.role,
        permission: this.permission,
        picture: this.picture.src
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.submit
  margin-top: 1em
</style>
