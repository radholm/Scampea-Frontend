<template>
  <section class="section" v-if="ready">
    <div class="tabs is-medium">
      <ul class="is-left is-medium">
        <li><router-link to="/projects">Projects</router-link></li>
        <li>/ {{project.name}}</li>
      </ul>
      
      <div class="tabs is-boxed is-right is-medium" v-if="allowedToSeeReport">
        <ul>
          <li :class="{ 'is-active': isWeekly}"><a @click="doToggle(true)">Weekly Report</a></li>
          <li :class="{ 'is-active': !isWeekly}"><a @click="doToggle(false)">Monthly Report</a></li>
        </ul>
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <h2 class="title is-4">{{ project.id }}: {{ project.name }}</h2>
        <h3 class="subtitle is-6">Created at: {{ project.created_at }}</h3>

        <h2>Project manager: {{ projectManagerName }}</h2>

        <br>

        <h2>Users in this project: </h2>
        <ul v-for="(user, index) in projectUsers" :key="user.id">
          <li>{{ user.first_name }} {{ user.last_name }}</li>
        </ul>
      </div>

      <div class="column" v-if="allowedToSeeReport">
        <div v-if="isWeekly">
          <ul v-for="user in projectUsers" :key="user.id">
            <li>User: {{ user.first_name }} {{ user.last_name }}</li>
            <li>Time spent: </li>
            <ul v-for="(tim, index) in compDatesW(userTimelog(user.id))" :key="index">
              <li>Entry {{index+1}}: {{tim.time}}</li>
            </ul>
            <br>
          </ul>
        </div>
        <div v-if="!isWeekly">
          <ul v-for="user in projectUsers" :key="user.id">
            <li>User: {{ user.first_name }} {{ user.last_name }}</li>
            <li>Time spent: </li>
            <ul v-for="(tim, index) in compDatesM(userTimelog(user.id))" :key="index">
              <li>Entry {{index+1}}: {{tim.time}}</li>
            </ul>
            <br>
          </ul>
        </div>
      </div>
    </div>
    
    <hr>

    <button class="button"><router-link to="/projects">Back</router-link></button>

  </section>
  <loading v-else></loading>
</template>

<script>
import Loading from '@/components/Loading'
import moment from 'moment'

export default {
  components: { Loading },
  props: ['id'],
  data () {
    return {
      loading: true,
      isWeekly: true
    }
  },
  mounted () {
    Promise.all([
      this.$store.dispatch('fetchProject', this.id),
      this.$store.dispatch('fetchUserLogTime'),
      this.$store.dispatch('fetchEmployees'),
      this.$store.dispatch('fetchProjectUsers', this.id)
    ]).then(() => {
      if (this.allowedToSeeReport) {
        this.$store.dispatch('fetchProjectLogTime', this.id)
          .then(() => {
            this.loading = false
          })
      } else {
        this.loading = false
      }
    })
  },
  methods: {
    userTimelog (userId) {
      return this.timeLog.filter(time => time.user_id === userId)
    },
    doToggle (report) {
      this.isWeekly = report
    },
    compDatesW (projDate) {
      const oneWeekAgo = moment().subtract(1, 'w')
      return projDate.filter(d => moment(d.date).isSameOrAfter(oneWeekAgo))
    },
    compDatesM (projDate) {
      const oneMonthAgo = moment().subtract(1, 'months')
      return projDate.filter(d => moment(d.date).isSameOrAfter(oneMonthAgo))
    }
  },
  computed: {
    ready () {
      return this.loggedIn && !this.loading
    },
    loggedIn () {
      return this.$store.getters.getLoginStatus
    },
    project () {
      return this.$store.getters.getProject
    },
    projectUsers () {
      return this.$store.getters.getProjectEmployees
    },
    timeLog () {
      return this.$store.getters.getProjectTimelogs
    },
    projectManager () {
      return this.projectUsers.find(user => user.id === this.project.project_manager_id)
    },
    projectManagerName () {
      const manager = this.projectManager

      return `${manager.first_name} ${manager.last_name}`
    },
    allowedToSeeReport () {
      return this.$store.getters.getPermission === 1 || this.projectManager.id === this.$store.getters.getUser.id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>