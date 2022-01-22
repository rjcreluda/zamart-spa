<template>
  <div>
    <Toolbar title="Ajouter un artisan" />
    <v-container>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="50"
                label="Nom"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="phone"
                label="Téléphone"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="address"
                label="Adresse"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
            <v-btn
              color="secondary"
              class="mr-4 elevation-0 black--text"
              @click="validate"
              width="100%"
              :disabled="submitting"
            >
              {{ btnText }}
            </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-row>
        <v-col cols="12">
          <SnackBar :message="notification.message" :show="notification.show" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
  import Toolbar from '@/components/Toolbar'
  import SnackBar from '@/components/SnackBar'
  import * as artisanService from '@/services/artisan.js'
  export default {
    name: 'AddProduct',
    components:{
      Toolbar,
      SnackBar
    },
    data: () => ({
      valid: false,
      name: '',
      phone: '',
      nameRules: [
        v => !!v || 'Nom est obligatoire',
        v => v.length <= 50 || 'Nom  trop long',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      address: '',
      notification: {
        show: false,
        message: ''
      },
      submitting: false,
      btnText: 'Ajouter'
    }),
    methods: {
      async validate(){
        /*this.notification.message="Succès, un email contenant son mot de passe est envoyé"
        this.notification.show = true
        setTimeout( () => {
          this.notification.show = false
          this.$router.push({ name: 'Artisans'})
        }, 2500)*/
        this.submitting = true
        this.btnText = 'Enregistrement ...'
        // Saving product
        const result = await artisanService.save({
          name: this.name,
          email: this.email,
          phone: this.phone,
          address: this.address,
        })
        console.log(result)
        this.$router.push({ name: 'Artisans'})
      },
    }
  }
</script>