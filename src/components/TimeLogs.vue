<template>
  <section class="section">
    <router-link name="createNewTimelog" to="/createtimelog" class="button create is-info">New timelog</router-link>
    <h1 class="title"><i class="fa fa-calendar" aria-hidden="true"></i> Timelogs</h1>
    <h2 class="subtitle">Record collected effort</h2>
    <hr>
    <time-log v-for="(log, index) in timelogs" :key="index" :log="log"></time-log>
  </section>
</template>

<script>
import TimeLog from './TimeLogComponents/TimeLog'
import _ from 'lodash'

export default {
  components: { TimeLog },
  mounted () {
    this.$store.dispatch('fetchUserLogTime')
  },
  computed: {
    timelogs () {
      const timelogs = _.cloneDeep(this.$store.getters.getUserTimeLogs)
      timelogs.sort((a, b) => {
        if (a.date < b.date) return 1
        if (a.date > b.date) return -1
        return 0
      })

      return timelogs
    },
    permission () {
      return this.$store.getters.getPermission
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.create
  float: right
</style>