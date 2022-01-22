<template>
  <div class="text-center">
    <v-snackbar
      v-model="show"
    >
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    name: 'SnackBar',
    props: {
      show: { type: Boolean, default: false },
      message: { type: String, required: true }
    },
  }
</script>