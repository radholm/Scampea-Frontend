<template>
  <div id="app">
    <navbar></navbar>
    <main>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </main>
    <foot></foot>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'

export default {
  components: { Navbar, Foot }
}
</script>

<style lang="sass">
@import "~bulma"
@import '~font-awesome/css/font-awesome.css'

/** FIX FOR FOOTER **/
#app
  display: flex
  min-height: 100vh
  flex-direction: column

main
  flex: 1
/** END FIX FOR FOOTER **/

img
  user-drag: none
  user-select: none
  -moz-user-select: none
  -webkit-user-drag: none
  -webkit-user-select: none
  -ms-user-select: none

.fade-enter-active, .fade-leave-active
  transition-property: opacity
  transition-duration: .25s

.fade-enter-active
  transition-delay: .25s

.fade-enter, .fade-leave-active
  opacity: 0
</style>
