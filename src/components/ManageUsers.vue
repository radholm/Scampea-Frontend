<template>
  <div class="container" v-if="this.loggedIn && this.user.permission">
    <section class="section">
      <h1 class="title">Manage Users</h1>
      <hr>
      <nav class="panel">
        <p class="panel-heading">
          User
        </p>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input class="input is-small" type="text" placeholder="search" v-model="filter">
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </p>
        </div>
        <div class="panel-block">
          <router-link name="createNewUser" to="/manageusers/create" class="button is-primary is-fullwidth is-outlined">
            Create New
          </router-link>
        </div>
        <router-link v-for="(employee, id) in employees" :key="id" :to="`/manageusers/${employee.id}/edit`" class="panel-block">
          <span class="panel-icon">
            <i class="fa" :class="{ 'fa-toggle-on': employee.permission, 'fa-toggle-off': !employee.permission}"></i>
          </span>
          <span>{{ employee.first_name }} {{ employee.last_name }}</span>
        </router-link>
      </nav>
    </section>
  </div>
</template>

<script>
export default {
  name: 'manageusers',
  data () {
    return {
      filter: ''
    }
  },
  mounted () {
    if (!this.user.permission) {
      this.$router.push('/')
    }
    this.$store.dispatch('fetchEmployees')
  },
  computed: {
    loggedIn () {
      return this.$store.getters.getLoginStatus
    },
    user () {
      return this.$store.getters.getUser
    },
    employees () {
      return this.$store.getters.getEmployees
        .filter(employee => (employee.first_name + ' ' + employee.last_name).toLowerCase().match(this.filter.toLowerCase()))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

</style>