<template>
  <div class="column is-3">
    <div class="card">
      <div class="card-image">
        <figure class="image is-1by1">
          <img :src="employee.picture" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ employee.first_name }} {{ employee.last_name }}</p>
            <p class="subtitle is-6">{{ employee.role.title }}</p>  
          </div>
        </div>
        <hr>
        <div class="content">
          <p><strong> Expertise </strong></p>
          {{ employee.expertise }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['employee']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.card
  width: 100%
</style>
