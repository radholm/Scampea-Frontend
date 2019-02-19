<template>
  <section class="section">

    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <router-link to="/">News</router-link>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page">Create News</a>
          </li>
        </ul>
      </nav>
      <form v-on:submit.prevent="createNews()" class="column is-half">
        <h1 class="title">Create News</h1>
        <h2 class="subtitle">Add a new message</h2>
        <hr>

        <div class="field">
          <div class="control">
            <input class="input" type="text" v-model="title" placeholder="Title">
          </div>
        </div>

        <div class="field">
          <div class="control">
            <textarea class="textarea" v-model="text" placeholder="News message..."></textarea>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input class="button is-primary" type="submit" :disabled="valid" value="Post">
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  mounted () {
  },
  data () {
    return {
      title: '',
      text: ''
    }
  },
  computed: {
    valid () {
      return this.title === '' || this.text === ''
    }
  },
  methods: {
    createNews () {
      this.$store.dispatch('addNewsItem', { title: this.title, text: this.text })
      this.$router.push('/') // Go to news page
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>