<template>
  <header>
    <nav class="navbar is-info">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img class="logo" src="//i.imgur.com/ukWDwc9.png" height="50" width="50">
        </router-link>

        <div v-if="loggedIn" class="navbar-burger burger" :class="{ 'is-active' : showNav }" @click="toggle" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div v-if="loggedIn" id="navMenu" class="navbar-menu" :class="{ 'is-active' : showNav }">
        <div class="navbar-end">
          <router-link to="/" class="navbar-item" exact-active-class="is-active" @click.native="toggle">News</router-link>
          <router-link to="/projects" class="navbar-item" active-class="is-active" @click.native="toggle">Projects</router-link>
          <router-link to="/employees" class="navbar-item" active-class="is-active" @click.native="toggle">Employees</router-link>
          <router-link to="/timelogs" class="navbar-item" active-class="is-active" @click.native="toggle">Time Logs</router-link>

          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link account-hover">Account</div>
            <div id="accountDropdown" class="navbar-dropdown is-right dropdown-content-radius">
              <router-link v-if="user.permission" name="manage" to="/manageusers" class="navbar-item" @click.native="toggle"><i class="fa fa-wrench" aria-hidden="true"></i>Manage Users</router-link>
              <router-link to="/settings" class="navbar-item" @click.native="toggle"><i class="fa fa-cog" aria-hidden="true"></i>User Settings</router-link>
              <router-link to="/login" class="navbar-item" @click.native="logout" name="logout"><i class="fa fa-user-o" aria-hidden="true"></i>Logout</router-link>
            <hr class="navbar-divider">
              <router-link to="" class="navbar-item" @click.native="disabled"><i class="fa fa-circle" style="color:#00FF00" aria-hidden="true"></i>
                  <p class="user-info">{{ user.first_name }} {{ user.last_name }}</p></router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    loggedIn () {
      return this.$store.getters.getLoginStatus
    },
    user () {
      return this.$store.getters.getUser
    }
  },
  data () {
    return {
      showNav: false
    }
  },
  methods: {
    toggle () {
      this.showNav = !this.showNav
    },
    logout () {
      this.toggle()
      this.$store.dispatch('logout')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

.is-info
  background-color:#2C50A2

.account-hover:hover
  cursor: pointer
  
.user-info
  width: 10em
  text-overflow: ellipsis
  white-space: nowrap
  overflow: hidden
  display: inline-block
  cursor: default

.logo
  margin-bottom: -10px
  width: 70px
  height: 100%
  object-fit: cover
  position: relative
  margin-right: -30px

.fa-cog, .fa-user-o, .fa-wrench, .fa-circle
  margin-right: 1em
  float: left
  margin-top: 2px
  max-width: 0.5em
  
.navbar-divider
  height: 0.75px
  margin-top: 0px
  margin-bottom: 0px
  
</style>
