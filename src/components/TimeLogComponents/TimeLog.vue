<template>
  <div class="box" v-if="!isLoading">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="getUserDataFromId(log.user_id).picture" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ getFirstNameAndLastNameFromUserId(log.user_id) }}</strong>
            <small>@{{ getUserDataFromId(log.user_id).username }}</small>
            <small>{{ timeGetHours(log.time) }}{{ timeGetMins(log.time) }}</small>
            <br>
            {{ log.contribution }}
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: ['log'],
  mounted () {
    this.$store.dispatch('fetchEmployees')
    .then(() => {
      this.loading = false
    })
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    users () {
      return this.$store.getters.getEmployees
    },
    isLoading () {
      return this.loading
    },
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    getUserDataFromId (userId) {
      return this.users.find(user => user.id === userId)
    },
    getFirstNameAndLastNameFromUserId (userId) {
      const user = this.getUserDataFromId(userId)

      return `${user.first_name} ${user.last_name}`
    },
    timeGetHours (time) {
      let hrs = time.split(':')[0]

      if (hrs[0] === '0') hrs = [hrs[1]]

      return hrs === '00' ? '' : `${hrs}h `
    },
    timeGetMins (time) {
      return `${time.split(':')[1]}m`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>