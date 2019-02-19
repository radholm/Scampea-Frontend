<template>
  <section class="section">
    <h1 class="title">Change Password</h1>
    <h2 class="subtitle">Update your password</h2>
    <form v-on:submit.prevent="update">
      <div class="field">
        <label class="label">Old password</label>
        <div class="control">
          <input v-model="old_password" class="input" type="password" placeholder="Old password">
        </div>
      </div>
      <div class="field">
        <label class="label">New password</label>
        <div class="control">
          <input v-model="new_password" class="input" type="password" placeholder="New password">
        </div>
      </div>
      <div class="field">
        <label class="label">Confirm new password</label>
        <div class="control">
          <input v-model="new_password_confirmation" class="input" type="password" placeholder="Confirm new password">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" :class="{ 'is-loading': loading }" type="submit">Change Password</button>
        </div>
      </div>
    </form>
    <div v-if="submitted">
      <p v-if="res.ok" class="help is-success">The password was successfully changed</p>
      <ul v-else>
        <li v-for="(error, index) in res.errors" :key="index">
          <p class="help is-danger">{{ index }}: {{ error }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>"

<script>
export default {
  name: 'settings',
  data () {
    return {
      old_password: '',
      new_password: '',
      new_password_confirmation: '',
      password: false,
      loading: false,
      submitted: false
    }
  },
  computed: {
    res () {
      return this.$store.getters.getChangePasswordResult
    }
  },
  mounted () {
  },
  methods: {
    update () {
      this.loading = true
      this.submitted = false
      this.$store.dispatch('changePassword', {
        old_password: this.old_password,
        new_password: this.new_password,
        new_password_confirmation: this.new_password_confirmation
      })
      .then(() => {
        this.loading = false
        this.submitted = true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

</style>