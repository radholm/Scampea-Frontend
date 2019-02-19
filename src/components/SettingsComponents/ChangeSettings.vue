<template>
  <section class="section">
    <h1 class="title is-3"><i class="fa fa-user" aria-hidden="true"></i> User Settings</h1>
    <h2 class="subtitle">Update {{ user.first_name }} {{ user.last_name }}'s general settings</h2>
    <hr>
    <form v-on:submit.prevent="update">

      <ImageUpload :picture="picture"></ImageUpload>

      <div class="field">
        <label class="label">Expertise</label>
        <div class="control">
          <textarea v-model="expertise" class="textarea" placeholder="Expertise"></textarea>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" :class="{ 'is-loading': loading }" type="submit">Change Settings</button>
        </div>
      </div>
    </form>
    <div v-if="submitted">
      <p v-if="res.ok" class="help is-success">The settings were successfully changed</p>
      <ul v-else>
        <li v-for="(error, index) in res.errors" :key="index">
          <p class="help is-danger">{{ index.toString() }}: {{ error.toString() }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import ImageUpload from '@/components/SettingsComponents/ImageUpload'
export default {
  name: 'settings',
  components: { ImageUpload },
  data () {
    return {
      picture: {
        src: '',
        name: null
      },
      expertise: '',
      pictureSrc: '',
      loading: false,
      submitted: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    res () {
      return this.$store.getters.getChangeSettingsResult
    }
  },
  mounted () {
    this.picture.src = this.user.picture
    this.expertise = this.user.expertise
  },
  methods: {
    update (e) {
      this.loading = true
      this.submitted = false
      this.$store.dispatch('changeSettings', {
        picture: this.picture.src === this.user.picture ? undefined : this.picture.src,
        expertise: this.expertise === this.user.expertise ? undefined : this.expertise
      })
      .then(() => {
        this.loading = false
        this.submitted = true
        this.$store.dispatch('fetchUserInfo')
        this.$store.dispatch('fetchEmployees')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.is-danger
  text-align: center  
  margin-right: 10em
</style>
