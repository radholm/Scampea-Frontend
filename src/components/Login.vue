<template>
  <section class="section">
    <div class="top-title">
      <h1 class="title">Scampea</h1>
      <h2 class="subtitle">Intranet login</h2>
    </div>

    <hr>

    <div class="container">
      <form v-on:submit.prevent="login" class="column is-half is-offset-one-quarter">
        <div class="field">
          <ul>
            <li v-for="(error, index) in errors" :key="index">
              <p class="help is-danger">{{ error }}</p>
            </li>
          </ul>
        </div>

        <div class="field">
          <div class="control has-icons-left">
            <input name="username" class="input" type="text" placeholder="Username" v-model="username" spellcheck="false">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left">
            <input name="password" class="input" type="password" placeholder="Password" v-model="password">
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button name="login" class="button is-info" :class="{ 'is-loading': loading }" type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  computed: {
    errors () {
      this.loading = false
      return this.$store.getters.getLoginErrors
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.top-title
  text-align: center
</style>