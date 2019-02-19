<template>
  <div class="container" v-if="loggedIn">
    <ChangeSettings></ChangeSettings>
    <ChangePassword></ChangePassword>
  </div>
</template>

<script>
import ChangeSettings from '@/components/SettingsComponents/ChangeSettings'
import ChangePassword from '@/components/SettingsComponents/ChangePassword'
export default {
  name: 'settings',
  components: { ChangeSettings, ChangePassword },
  computed: {
    loggedIn () {
      return this.$store.getters.getLoginStatus
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

</style>