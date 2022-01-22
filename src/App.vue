
<template>
  <v-app id="inspire" style="background-color: #fff;">
    <template v-if="$route.name.includes('Home')">
    <v-card height="200px" flat class="rounded-0">
      <v-img
          height="200px"
          src="https://www.voyage.mada-digital.net/wp-content/uploads/2021/10/nail-care-procedure-in-a-beauty-salon-8KU42M9.jpg"
        >

        <v-app-bar
        flat
        color="rgba(0, 0, 0, 0)"
        dark
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Zamart</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-badge
            v-if="newOrder == 0"
            color="green"
            :content="newOrder"
            :value="newOrder"
          >
            <v-icon @click="$router.push({ name: 'Commands'})">
              mdi-cart
            </v-icon>
        </v-badge>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <div class="text-h4 mt-5 white--text ml-5">Gestionaire des produits</div>
    </v-img>
    </v-card>
    </template>
    <v-main :class="{'big-padding-top': !isHome}">
      <!-- <keep-alive :include="['HelloWorld']"> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </v-main>
    <template v-if="!isHome">
      <!-- Footer bottom menu -->
      <v-bottom-navigation app dark color="white" background-color="primary" grow>

        <v-btn :to="{name: 'Commands'}">
          <span>Commandes</span>
          <v-icon>mdi-cart</v-icon>
        </v-btn>

        <v-btn :to="{name: 'Customers'}">
          <span>Clients</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-btn :to="{name: 'Products'}">
          <span>Les Produits</span>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn :to="{name: 'Artisans'}">
          <span>Artisans</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </template>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    data: () => ({
      drawer: null,
      value: 1,
      items: [
        { title: 'Produits', icon: 'mdi-format-list-checks', to: { name: 'Products' } },
        { title: 'Artisans', icon: 'mdi-help-box', to: '/about' },
        { title: 'Commandes', icon: 'mdi-cart', to: '/project'},
      ],
    }),
    computed: {
      isHome(){
        return this.$route.name.includes('Home')
      },
      ...mapState( ['newOrder'] )
    },
    created(){
      this.$store.commit('set_nonce', window.wpData.nonce)
      this.$store.commit('set_orders', window.wpData.orders)
      this.$store.commit('set_customers', window.wpData.customers)
      this.$store.commit('set_products', window.wpData.products)
      this.$store.commit('set_product_cats', window.wpData.product_cats)
      this.$store.commit('set_artisans', window.wpData.artisans)
      //console.log(this.$store.state.nonce)
    }
  }
</script>
<style scoped>

  .big-padding-top{
    margin-top: 60px;
  }

</style>