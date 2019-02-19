<template>
  <div class="content">
    <label class="label">Select project members</label>
    <form >
    <div v-for="employee in employees" >
      <input type="checkbox" name="vehicle" value="Bike"> {{employee.first_name}} {{employee.last_name}}<br>

      </div>
            <input type="submit" value="Submit">
    </form>
<!--
      <ul>
      <li v-for="employee in employees">{{employee.first_name}} {{employee.last_name}}</li>
      </ul>
      -->
  </div>
</template>

<script>
  export default{
    props: ['employee'],
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

.news-text
  margin-left: 13px

.fa-quote-left, .fa-quote-right
  font-size: 75%
  position: absolute;

</style>
