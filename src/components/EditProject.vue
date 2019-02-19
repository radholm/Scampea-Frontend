<template>
  <section class="section" v-if="!loading">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><router-link to="/projects">Projects</router-link></li>
          <li class="is-active"><a href="#" aria-current="page">Edit</a></li>
        </ul>
      </nav>

      <button v-if="isAdmin" class="deletebutton button is-danger is-outlined" @click="deleteProject()"><span>DELETE project</span><span class="icon is-small"><i class="fa fa-times"></i></span></button>

      <h1 class="title">Edit <input :disabled="!isAdmin" class="input" type="text" v-model="projectName" name="projectName"></h1>

      <div class="field">
        <div class="control">
            Project manager: 
          <div class="select is-primary">
            <select v-model="projectManager" :disabled="!isAdmin">
              <option v-for="user in projectUsers" :key="user.id" :value="user.id">{{ user.first_name }} {{ user.last_name }}</option>
            </select>
          </div>
        </div>
      </div>

      <hr>

      <button v-if="isAdmin" class="button update is-primary" @click="updateProjectName()">Update name / Project manager</button>

      <hr v-if="isAdmin">

      <h2 class="subtitle">Project members</h2>
      <button
        v-for="user in projectUsers"
        :key="user.id"
        :disabled="user.id === project.project_manager_id"
        @click="removeUserFromProject(user.id)"
        class="button is-inverted is-primary">{{ user.first_name }} {{ user.last_name }}</button>

      <hr>

      <h2 class="subtitle">Add project members</h2>

      <button
        v-for="user in usersNotInProject"
        :key="user.id"
        @click="addUserToProject(user.id)"
        class="button is-success is-inverted">{{ user.first_name }} {{ user.last_name }}</button>

    </div>

    <hr>
    <router-link to="/projects"><button class="button is-primary"><span>Back</span></button></router-link>
  </section>

  <loading v-else></loading>
</template>
<script>
import Loading from './Loading'

export default {
  props: ['id'],
  components: { Loading },
  mounted () {
    this.$store.dispatch('fetchEmployees')
    this.$store.dispatch('fetchProjectUsers', this.id)
    this.$store.dispatch('fetchProject', this.id)
    .then(() => {
      this.loading = false
      this.projectManager = this.project.project_manager_id
    })
    .then(() => {
      this.projectName = this.project.name
    })
  },
  data () {
    return {
      projectName: '',
      projectManager: '-1',
      loading: true
    }
  },
  computed: {
    project () {
      return this.$store.getters.getProject
    },
    projectUsers () {
      return this.$store.getters.getProjectEmployees
    },
    usersNotInProject () {
      const userIds = this.projectUsers.map(user => user.id)

      return this.$store.getters.getEmployees
        .filter(user => !userIds.includes(user.id))
    },
    isAdmin () {
      return this.$store.getters.getPermission
    }
  },
  methods: {
    updateProjectName () {
      const name = this.projectName
      const projectId = this.id
      const projectManagerId = this.projectManager
      this.$store.dispatch('updateProjectName', { projectId, name, projectManagerId })
    },
    removeUserFromProject (userId) {
      const projectId = this.id
      this.$store.dispatch('removeUserFromProject', { userId, projectId })
    },
    addUserToProject (userId) {
      const projectId = this.id
      this.$store.dispatch('addUserToProject', { userId, projectId })
    },
    deleteProject () {
      const r = confirm('Are you sure?')
      if (r === true) {
        const projectId = this.id
        this.$store.dispatch('deleteProject', projectId)
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .deletebutton
    float: right

  .input
    width: 50%
    
</style>
