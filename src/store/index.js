import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    product_cats: null,
    customers: null,
    products: null,
    artisans: null,
    orders: null,
    nonce: null,
    loading: false,
    newOrder: 0,
  },
  mutations: {
    set_loading( state, payload ){
      state.loading = payload
    },
    set_product_cats( state, data){
      state.product_cats = data
    },
    set_customers( state, data){
      state.customers = data
    },
    set_products( state, data){
      state.products = data
    },
    set_artisans( state, data){
      state.artisans = data
    },
    set_orders( state, data){
      state.orders = data
    },
    set_nonce( state, data){
      state.nonce = data
    },
    add_product( state, product ){
      state.products.push(product)
    },
    delete_product( state, product ){
      //const index = state.products.indexOf( product )
      const index = state.products.map( (item) => item.id).indexOf(product.id)
      if( index != -1 ){
        state.products.splice(index, 1)
      }
    },
    delete_artisan( state, artisan ){
      //const index = state.products.indexOf( product )
      const index = state.artisans.map( (item) => item.id).indexOf(artisan.id)
      if( index != -1 ){
        state.artisans.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
