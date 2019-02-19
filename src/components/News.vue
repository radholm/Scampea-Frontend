<template>
  <section class="section">
    <div class="container">
      <div class="is-pulled-right">
        <router-link v-if="permission" name="createNewsMessage" to="/createnewsmessage" class="button is-info">Create News</router-link>
      </div>
      <h1 class="title is-1"><i class="fa fa-newspaper-o" aria-hidden="true"></i> News</h1>
      <hr>
      <div class="columns is-multiline">
        <news-item v-for="(newsItem, index) in news" :key="index" :news="newsItem"></news-item>
      </div>
    </div>
  </section>
</template>

<script>
import NewsItem from './NewsComponents/NewsItem'
import _ from 'lodash'

export default {
  components: { NewsItem },
  mounted () {
    this.$store.dispatch('fetchUserNews')
  },
  computed: {
    news () {
      return _.cloneDeep(this.$store.getters.getUserNews).reverse()
    },
    permission () {
      return this.$store.getters.getPermission
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>