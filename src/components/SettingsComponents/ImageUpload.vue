<template>
  <div class="field media">
    <figure class="media-left">
      <p class="image is-128x128">
        <img :src="picture.src">
      </p>
    </figure>
    <div class="file media-content">
    <div class="file has-name is-right">
      <label class="file-label">
        <input v-on:change="onFileChange" class="file-input" type="file" accept="image/png, image/jpg">
        <span class="file-cta">
              <span class="file-icon">
                <i class="fa fa-file-image-o"></i>
              </span>
        </span>
        <span class="file-name">{{ fileName }}</span>
      </label>
      </div>
    </div>
  </div>
</template>
      
<script>
export default {
  name: 'imageupload',
  props: ['picture'],
  computed: {
    fileName () {
      return this.picture.name ? this.picture.name : 'Select file...'
    }
  },
  methods: {
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        this.picture.src = this.user.picture
        this.picture.name = null
      } else {
        this.createImage(files[0])
        this.picture.name = files[0].name
      }
    },
    createImage (file) {
      let reader = new FileReader()
      let vm = this
      reader.onload = (e) => {
        vm.picture.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
      
<style>

</style>
      