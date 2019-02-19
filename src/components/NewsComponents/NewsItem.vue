<template>
	<div class="column is-one-third">
		<div class="card">
			<div class="card-content">
				<p class="subtitle">{{ fromNow(news.created_at) }}</p>
				<hr>
				<p class="title">{{ news.title }}</p>
				<p class="subtitle">{{ news.text }}</p>
				
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['news'],
  methods: {
    fromNow (date) {
      return moment(date).fromNow()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.card
	width: 100%
.column
	display: flex
</style>
