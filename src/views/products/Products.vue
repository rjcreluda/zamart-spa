<template>
  <div>
    <Toolbar title="Liste des produits" />
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            clearable
            append-icon="mdi-magnify"
            placeholder="Chercher un produit"
            v-model="searchText"
            @click:clear="clearSearch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="product in filteredProducts" :key="product.id" cols="12" md="4" class="py-0">
          <v-card
            class="mb-4 grey lighten-5 elevation-1 overflow-hidden"
            height="110px"
          >
            <v-row no-gutters class="">
              <v-col cols="3">
                <v-img
                  :src="productImage(product)"
                  height="100%"
                ></v-img>
              </v-col>
              <v-col cols="7">
                <div class="pa-3">
                  <span @click="showProduct(product)">{{ product.name }}</span><br/>
                  <span>{{ product.price }}€</span>
                </div>
              </v-col>
              <v-col cols="2">
                <div class="pr-3 fill-height d-flex align-center">
                  <v-icon @click="deleteProduct(product.id)">mdi-delete</v-icon>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <ConfirmDialog :dialog="showDialog" @closed="closeDialog($event)" />
      <v-row>
        <v-col cols="12">
          <SnackBar :message="notification.message" :show="notification.show" />
        </v-col>
      </v-row>
    </v-container>
    <!-- <div class="float-button">
        <v-btn
          color="primary"
          dark
          fab
          elevation="12"
          @click="$router.push({name: 'AddProduct'})"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div> -->
    <ActionButton :link="{name: 'AddProduct'}" />
    <OverlayLoader :show="$store.state.loading" />
  </div>
</template>

<script>
// @ is an alias to /src
////import HelloWorld from '@/components/HelloWorld.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import SnackBar from '@/components/SnackBar'
import Toolbar from '@/components/Toolbar'
import ActionButton from '@/components/ActionButton'
import OverlayLoader from '@/components/OverlayLoader'
import * as productService from '@/services/product.js'


export default {
  name: 'Products',
  components: {
    ConfirmDialog,
    SnackBar,
    Toolbar,
    ActionButton,
    OverlayLoader
  },
  data: () => ({
    searchText: '',
    products: [],
    showDialog: false,
    notification: {
      show: false,
      message: ''
    },
    productId: 0,
  }),
  computed: {
    filteredProducts(){
      let articles = this.products
      let search = String(this.searchText)
      if( search.length > 2 && search !== 'null' ){
        articles = this.products.filter( (product) => product.name.toLowerCase().includes(this.searchText.toLowerCase()) )
      }
      return articles
    },
  },
  created(){
    this.products = this.$store.state.products
  },
  methods: {
    productImage( product ){
      return product.thumbnail ? product.thumbnail : 'https://picsum.photos/id/143/300/200'
    },
    clearSearch(){
      this.searchText = ''
    },
    showProduct(p){
      this.$router.push({ name: 'EditProduct', params:{ id: p.id} })
    },
    deleteProduct(id){
      console.log('Deleting #'+id)
      this.productId = id
      this.showDialog = true;
    },
    async closeDialog( result ){
      this.showDialog = false;
      if( result === true ){
        this.$store.commit('set_loading', true)
        const result = await productService.remove(this.productId)
        console.log(result)
        const product = this.products.filter( (p) => p.id == this.productId )[0]
        this.$store.commit('delete_product', product)
        this.$store.commit('set_loading', false)
        this.showNotification('Operation succès')
      }
      else
        this.showNotification('Operation annulé')
    },
    showNotification( message ){
      this.notification.message = message
      this.notification.show = true
      setTimeout( () => {
        this.notification.show = false
      }, 2000)
    }
  }
}
</script>
