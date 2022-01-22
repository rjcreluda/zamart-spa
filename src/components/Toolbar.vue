<template>
  <v-toolbar class="page-title elevation-0">
        <v-btn
          icon
        >
          <v-icon @click="$router.go(-1)">mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-icon @click="$router.push({name: 'Home'})">mdi-home</v-icon>

        <v-badge
            class="ml-3"
            color="orange"
            :content="count"
            :value="count"
          >
            <v-icon @click="$router.push({ name: 'Commands'})">
              mdi-cart
            </v-icon>
        </v-badge>


        <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="$router.push({ name: 'Categories'})">
            <v-list-item-title>Catégories</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
</template>

<script>
  export default {
    name: 'Toolbar',
    props: {
      title: { type: String, required: true }
    },
    computed: {
      count(){
        return this.$store.state.newOrder;
      }
    }
  }
</script>

<style scoped>
  .page-title{
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
  }
</style>