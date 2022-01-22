<template>
  <div>
    <Toolbar title="Catégories de produit" />
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            clearable
            append-icon="mdi-magnify"
            placeholder="Cherche"
            v-model="searchText"
            @click:clear="clearSearch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="category in filteredCategories" :key="category.id" cols="12" md="4" class="py-0">
          <v-card
            class="mb-4 grey lighten-5 elevation-1 overflow-hidden"
            height="90px"
          >
            <v-row no-gutters class="fill-height">

              <v-col cols="10">
                <div class="pa-3">
                  <strong @click="showCategory(category)">{{ category.name }}</strong><br/>
                  <span class="text-secondary">{{ category.count }} produits</span>
                </div>
              </v-col>
              <v-col cols="2">
                <div class="fill-height d-flex align-center justify-center">
                  <v-icon @click="deleteCategory(category.id)">mdi-delete</v-icon>
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
    <ActionButton :link="{name: 'AddCategory'}" />
  </div>
</template>

<script>
// @ is an alias to /src
////import HelloWorld from '@/components/HelloWorld.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import SnackBar from '@/components/SnackBar'
import Toolbar from '@/components/Toolbar'
import ActionButton from '@/components/ActionButton'

export default {
  name: 'Categories',
  components: {
    ConfirmDialog,
    SnackBar,
    Toolbar,
    ActionButton
  },
  data: () => ({
    searchText: '',
    showDialog: false,
    notification: {
      show: false,
      message: ''
    },
    categories: []
  }),
  computed: {
    filteredCategories(){
      let articles = this.categories
      let search = String(this.searchText)
      if( search.length > 2 && search !== 'null' ){
        articles = this.categories.filter( (category) => category.name.toLowerCase().includes(this.searchText.toLowerCase()) )
      }
      return articles
    }
  },
  created(){
    this.categories = this.$store.state.product_cats
  },
  methods: {
    clearSearch(){
      this.searchText = ''
    },
    showCategory(p){
      this.$router.push({ name: 'EditCategory', params:{ id: p.id} })
    },
    deleteCategory(id){
      console.log('Deleting #'+id)
      this.showDialog = true;
    },
    closeDialog( result ){
      this.showDialog = false;
      if( result === true )
        this.showNotification('Operation succès')
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
