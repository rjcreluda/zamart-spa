<template>
  <div class="float-button">
    <v-btn
      color="primary"
      dark
      fab
      elevation="12"
      @click="$router.push(link)"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'ActionButton',
    props: {
      link: { required: true }
    }
  }
</script>

<style scoped>
  .float-button{
    position: fixed;
    bottom: 15%;
    right: 15%;
    z-index: 1;
  }
</style>