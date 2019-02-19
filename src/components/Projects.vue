<template>
  <section class="section" v-if="loggedIn">

    <section class="container">
      <div class="is-pulled-right">
        <div class="select is-info" >
          <select v-model="showAll">
            <option value="false">Show only associated projects</option>
            <option value="true">Show all projects</option>
          </select>
        </div>
        <router-link v-if="permission" to="/createproject" class="button is-info">Create New Project</router-link>
      </div>

      <h1 class="title is-1"><i class="fa fa-folder-open-o" aria-hidden="true"></i> Projects</h1>

      <hr>

      <div class="columns is-centered is-multiline ">
        <project-item v-for="(project, index) in projects" :key="index" :project="project"></project-item>
      </div>

    </section>
  </section>
</template>

<script>
import ProjectItem from './ProjectComponents/ProjectItem'
import _ from 'lodash'

export default {
  components: { ProjectItem },
  data () {
    return {
      showAll: false
    }
  },
  mounted () {
    this.$store.dispatch('fetchUserProjects', this.$store.getters.get)
    this.$store.dispatch('fetchProjects')
  },
  computed: {
    loggedIn () {
      return this.$store.getters.getLoginStatus
    },
    permission () {
      return this.$store.getters.getPermission
    },
    projects () {
      // Sort projects according to latest modified
      const projects = _.cloneDeep(this.showAll === 'true'
        ? this.$store.getters.getProjects : this.$store.getters.getUserProjects)
      projects.sort((a, b) => {
        if (a.created_at < b.created_at) return 1
        if (a.created_at > b.created_at) return -1
        return 0
      })

      return projects
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>
