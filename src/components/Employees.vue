<template>
<section class="section">

  <section class="container">
    <h1 class="title is-1"><i class="fa fa-users" aria-hidden="true"></i> Employees</h1>

    <hr>

    <div class="columns is-centered is-multiline ">
      <employee v-for="(employee, index) in employees" :key="index" :employee="employee"></employee>
    </div>
  </section>

  </section>
</template>

<script>
import Employee from './EmployeeComponents/Employee'

export default {
  components: { Employee },
  mounted () {
    this.$store.dispatch('fetchEmployees')
  },
  computed: {
    employees () {
      return this.$store.getters.getEmployees
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.column
  display: flex
</style>