<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h6">
          Supprimer cet element?
        </v-card-title>
        <v-card-text>Vous êtes sur le point de supprimer ce produit. Veuillez confirmer.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="confirmDialog( false )"
          >
            Non
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="confirmDialog( true )"
          >
            Oui, supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    name: 'ConfirmDialog',
    props: {
      dialog: { type: Boolean, required: true },
    },
    methods:{
      confirmDialog( isConfirmed ){
        this.$emit('closed', isConfirmed )
      }
    }
  }
</script>