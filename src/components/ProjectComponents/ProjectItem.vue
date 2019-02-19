<template>
	<div class="column is-one-third">
		<div class="card">
			<header class="card-header">
				<p class="card-header-title">{{ project.name }}</p>
			</header>
			<footer class="card-footer">
				<router-link class="card-footer-item" :to="`/projects/${project.id}`">Info</router-link>
				<router-link class="card-footer-item" v-if="permission" :to="`/projects/${project.id}/edit`">Edit</router-link>
			</footer>
		</div>
	</div>
</template>

<script>
export default {
  props: ['project'],
  computed: {
    permission () {
      return this.$store.getters.getPermission || this.project.project_manager_id === this.$store.getters.getUser.id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.card
	width: 100%
</style>