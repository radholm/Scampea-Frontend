<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <router-link to="/projects">Projects</router-link>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page">Create New</a>
          </li>
        </ul>
      </nav>
      <h1 class="title">Create Project</h1>
      <h2 class="subtitle">Add a new project</h2>
      <hr>

      <form v-on:submit.prevent="createProject()">
        <div class="field">
          <label class="label">Project Name</label>
          <div class="control">
            <input class="input" name="projectName" placeholder="New Project" v-model="projectName">
          </div>
        </div>

        <div class="field">
          <div class="control">
            <div class="select is-primary">
              <select v-model="projectManager">
                <option value=-1>Select a project manager</option>
                <option v-for="user in users" :key="user.id" :value="user.id">{{ user.first_name }} {{ user.last_name }}</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <input class="button submit is-primary" :disabled="allowed" name="createProjectBtn" type="submit" value="Create project">
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('fetchEmployees')
  },
  data () {
    return {
      projectName: '',
      projectManager: '-1'
    }
  },
  computed: {
    users () {
      return this.$store.getters.getEmployees
    },
    allowed () {
      return this.projectName === '' || this.projectManager === '-1'
    }
  },
  methods: {
    async createProject () {
      const project = await this.$store.dispatch('createProject', {
        name: this.projectName,
        projectManager: this.projectManager
      })

      await this.$store.dispatch('addUserToProject', {
        userId: this.projectManager,
        projectId: project.data.id
      })

      this.$router.push('/projects')
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.submit
  margin-top: 1em
</style>
