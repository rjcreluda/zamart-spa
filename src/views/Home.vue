<template>
    <div class="fill-height d-flex flex-column">
      <v-card flat dark color="primary"  v-for="menu in menus" :key="menu.title" class="fill-height d-flex align-center justify-content-center rounded-0">
            <div>
              <v-icon size="40" class="mx-5">{{ menu.icon }}</v-icon>
            <router-link class="text-h6 align-self-center white--text text-decoration-none" :to="menu.link">
              {{ menu.title }}
            </router-link>
            </div>
            <div class="ml-auto mr-5">
              <v-btn fab small color="secondary" class="black--text">
                {{ menu.count }}
              </v-btn>
            </div>
      </v-card>
    </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    menus: []
  }),
  computed: {
    ...mapState(['customers', 'orders', 'products', 'artisans' ])
  },
  created(){
    console.log(this.customers.length)
    this.menus = [
      { title: 'Commandes', link: {name: 'Commands'}, icon: 'mdi-cart', count: this.orders.length},
      { title: 'Clients', link: {name: 'Customers'}, icon: 'mdi-account', count: this.customers.length},
      { title: 'Produits', link: {name: 'Products'}, icon: 'mdi-heart', count: this.products.length},
      { title: 'Artisans', link: {name: 'Artisans'}, icon: 'mdi-account', count: this.artisans.length},
    ];
  }
}
</script>
