<template>
  <div>
    <Toolbar title="Liste des Prestataires" />
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            clearable
            append-icon="mdi-magnify"
            placeholder="Chercher"
            v-model="searchText"
            @click:clear="clearSearch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="artisan in filteredArtisans" :key="artisan.id" cols="12" md="4" class="py-0">
          <v-card
            class="mb-2"
            flat
          >
            <v-row no-gutters class="fill-height">
              <v-col cols="2" class="d-flex align-center justify-center">
                <v-avatar
                  color="primary"
                  size="56"
                >
                  <v-icon class="white--text">mdi-account</v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="8">
                <div class="pa-3">
                  <span @click="showArtisan(artisan)">{{ artisan.name }}</span><br/>
                  <span>{{ artisan.phone }}</span>
                </div>
              </v-col>
              <v-col cols="2">
                <div class="fill-height d-flex flew-row align-center justify-center">
                  <v-icon @click="deleteArtisan(artisan.id)">mdi-delete</v-icon>
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
    <ActionButton :link="{name: 'CreateArtisan'}" />
  </div>
</template>

<script>
// @ is an alias to /src
////import HelloWorld from '@/components/HelloWorld.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import SnackBar from '@/components/SnackBar'
import Toolbar from '@/components/Toolbar'
import ActionButton from '@/components/ActionButton'
import * as artisanService from '@/services/artisan.js'

export default {
  name: 'artisans',
  components: {
    ConfirmDialog,
    SnackBar,
    Toolbar,
    ActionButton
  },
  data: () => ({
    searchText: '',
    artisans: [],
    showDialog: false,
    notification: {
      show: false,
      message: ''
    },
    artisanId: 0
  }),
  computed: {
    filteredArtisans(){
      let artisans = this.artisans
      let search = String(this.searchText)
      if( search.length > 2 && search !== 'null' ){
        artisans = this.artisans.filter( (artisan) => artisan.name.toLowerCase().includes(this.searchText.toLowerCase()) )
      }
      return artisans
    }
  },
  created(){
    this.artisans = this.$store.state.artisans;
  },
  methods: {
    clearSearch(){
      this.searchText = ''
    },
    showArtisan(p){
      this.$router.push({ name: 'ShowArtisan', params:{ id: p.id} })
    },
    deleteArtisan(id){
      console.log('Deleting #'+id)
      this.artisanId = id
      this.showDialog = true;
    },
    async closeDialog( result ){
      this.showDialog = false;
      if( result === true ){
        const result = await artisanService.remove(this.artisanId)
        console.log(result)
        const artisan = this.artisans.filter( (p) => p.id == this.artisanId )[0]
        this.$store.commit('delete_artisan', artisan)
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
