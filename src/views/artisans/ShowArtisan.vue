<template>
  <div>
    <Toolbar title="Detail du Prestataire" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-flex flex-column flex-md-row align-start align-md-center">
            <div class="text-h5">{{ artisan.name }}</div>
            <v-list>
              <v-list-item>
                <v-icon>mdi-phone</v-icon>{{ artisan.phone }}
              </v-list-item>
              <v-list-item>
                <v-icon>mdi-home</v-icon>{{ artisan.address }}
              </v-list-item>
            </v-list>
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="pt-5">
        <v-col><div class="text-h6">Prestations attribués</div></v-col>
      </v-row>
      <v-list v-if="artisan.prestations.length">
          <div v-for="command in artisan.prestations" :key="command.id">
            <v-list-item @click="showCommand(command)" >
              <v-list-item-content>
                <v-list-item-title>Commande #{{ command.num }}</v-list-item-title>
                <v-list-item-subtitle>{{ command.date }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn small text :class="`cmd ${command.status}`">{{ commandState(command) }}</v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
          </div>
      </v-list>
      <div v-else>Aucun</div>
    </v-container>
  </div>
</template>
<script>
  import Toolbar from '@/components/Toolbar'

  export default {
  name: 'artisans',
  components: {
    Toolbar,
  },
  data: () => ({
    searchText: '',
    commands: [],
    artisan: null,
  }),
  created(){
    //this.loadCommands();
    const id = this.$route.params.id
    this.artisan = this.$store.state.artisans.filter( (artisan) => String(artisan.id) == String(id))[0];
  },
  methods: {
    commandState( cmd ){
      let status = 'inconnu'
      switch( cmd.status ){
        case 'pending':
          status = 'en attente'
          break
        case 'done':
          status = 'terminé'
          break
        case 'ongoing':
          status = 'en cours'
      }
      return status
    },
    loadCommands(){
      this.commands = [
        { id: 1, num: 3001, status: 'pending', done: false, date: '12-07-202' },
      { id: 2, num: 3006, status: 'ongoing', done: false, date: '12-07-202' },
      { id: 3, num: 3070, status: 'done', done: true, date: '12-07-202' },
      ]
    },
    showCommand( cmd ){
      this.$router.push({ name: 'CommandDetail', params:{id: cmd.num}});
    }
  }
}
</script>

<style scoped>
  .cmd.done{
    color: green;
  }
  .cmd.pending{
    color: grey;
  }
  .cmd.ongoing{
    color: orange;
  }
</style>