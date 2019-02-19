<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><router-link to="/timelogs">Timelogs</router-link></li>
            <li class="is-active"><a href="#" aria-current="page">Create New</a></li>
        </ul>
      </nav>
      <form v-on:submit.prevent="createTimelog()" class="column is-half">
        <h1 class="title">Create Timelog</h1>
        <h2 class="subtitle">Add a new timelog</h2>
        <hr>
        <div class="field">
          <div class="control">
            <div class="select is-primary">
              <select v-model="projectId">
                <option value="-1">Select a project</option>
                <option v-for="project in userProjects" :key="project.id" :value="project.id">{{ project.name }}</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="field">
          <div class="control">
            <input class="input" type="date" v-model="date" :max="today">
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input class="input" type="time" v-model="duration">
          </div>
        </div>

        <div class="field">
          <div class="control">
            <textarea class="textarea" v-model="contribution" placeholder="Contribution..."></textarea>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input class="button is-primary" type="submit" :disabled="valid" value="Create timelog">
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  mounted () {
    this.$store.dispatch('fetchUserProjects')
  },
  data () {
    return {
      projectId: '-1',
      date: moment().format('Y-M-DD'),
      today: moment().format('Y-M-DD'),
      duration: '00:00',
      contribution: ''
    }
  },
  computed: {
    userProjects () {
      return this.$store.getters.getUserProjects
    },
    valid () {
      return this.projectId === '-1' || this.duration === '00:00' || this.contribution === ''
    }
  },
  methods: {
    createTimelog () {
      const obj = {
        date: this.date,
        time: this.duration,
        contribution: this.contribution,
        projectId: this.projectId
      }

      this.$store.dispatch('addTimelog', obj)
        .then(() => this.$router.push('/timelogs'))
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>