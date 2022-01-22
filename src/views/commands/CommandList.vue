<template>
  <div>
    <Toolbar title="Commandes" />
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            clearable
            append-icon="mdi-magnify"
            placeholder="Chercher un commande"
            v-model="searchText"
            @click:clear="clearSearch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="command in filteredCommands" :key="command.id" cols="12" md="4" class="py-0">
          <v-card
            class="mb-4 grey lighten-5 elevation-1 overflow-hidden"
            height="90px"
          >
            <v-row no-gutters class="fill-height">
              <v-col cols="11" md="10">
                <div class="pa-3">
                  <strong @click="showCommand(command.order_key)">N°{{ command.id }}</strong><br/>
                  <span>{{ command.date_created }}</span>
                </div>
              </v-col>
              <v-col cols="1" md="2">
                <div class="fill-height d-flex">
                  <v-icon @click="deleteCommand(command.id)">mdi-delete</v-icon>
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
  </div>
</template>

<script>
// @ is an alias to /src
////import HelloWorld from '@/components/HelloWorld.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import SnackBar from '@/components/SnackBar'
import Toolbar from '@/components/Toolbar'

import { mapState } from 'vuex'

export default {
  name: 'CommandList',
  components: {
    ConfirmDialog,
    SnackBar,
    Toolbar,
  },
  data: () => ({
    searchText: '',
    commands: [],
    showDialog: false,
    notification: {
      show: false,
      message: ''
    }
  }),
  computed: {
    filteredCommands(){
      let articles = this.commands
      let search = String(this.searchText)
      if( search.length > 2 && search !== 'null' ){
        articles = this.commands.filter( (command) => String(command.num).includes(this.searchText) )
      }
      return articles
    },
    ...mapState(['orders'])
  },
  created(){
    this.commands = this.orders
    //console.log(this.commands)
  },
  methods: {
    clearSearch(){
      this.searchText = ''
    },
    showCommand(num){
      this.$router.push({ name: 'CommandDetail', params: {id: num}})
    },
    deleteCommand(id){
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
