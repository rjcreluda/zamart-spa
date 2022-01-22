<template>
  <div>
    <Toolbar :title="title" />
    <v-container>
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
            <div class="text-h6">Numéro de commande: {{ order.id }}</div>
            <div class="text-h6">Client: {{ order.billing_first_name }}</div>
            <div class="text-h6">Date: {{ order.date_created }}</div>
            <div class="text-h6">Etat: <span>{{ orderStatus }}</span></div>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <th class="text-left">Produits/Services</th>
                  <th class="text-left">PU (€)</th>
                  <th class="text-left">Qté</th>
                </thead>
                <tbody>
                  <tr v-for="item in order.items" :key="item.product_id">
                    <td>{{ item.name.toUpperCase() }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.quantity }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-col>

            <div v-if="artisanNum == 0 && !done">
              <v-col
                cols="12"
                md="8"
              >
                <div class="text-h6 mb-2">Selectionner le traiteur</div>
                <v-sheet
                  class="mx-auto"
                  max-width="1000"
                >
                  <v-slide-group
                  v-model="order.artisan_id"
                  >
                    <v-slide-item
                      v-for="artisan in artisans"
                      :key="artisan.id"
                      v-slot="{ active, toggle }"
                      :value="artisan.id"
                    >
                      <v-btn
                        class="mx-2"
                        :input-value="active"
                        active-class="brown white--text"
                        depressed
                        rounded
                        @click="toggle"
                      >
                        {{artisan.name}}
                      </v-btn>
                    </v-slide-item>
                  </v-slide-group>
                </v-sheet>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
              <v-btn
                color="secondary"
                class="mr-4 elevation-0 black--text"
                width="100%"
                :disabled="submitting"
                @click="setOrderArtisan()"
              >
                {{ btnText }}
              </v-btn>
              </v-col>
            </div>
            <div v-else>
              <v-col>
                <h4>Traiteur: {{ nomTraiteur }}</h4>
              </v-col>
            </div>

          </v-row>
        </v-container>
      </v-form>
    </v-container>
    <OverlayLoader :show="submitting" />
  </div>
</template>
<script>
  import Toolbar from '@/components/Toolbar'
  import OverlayLoader from '@/components/OverlayLoader.vue'
  import * as OrderService from '@/services/order.js'
  import {orderStatusText} from '@/helper.js'
  export default {
    name: 'CommandDetail',
    components:{
      Toolbar,
      OverlayLoader,
    },
    data: () => ({
      title: 'Detail du commande',
      id: '',
      artisanNum: 0,
      artisans: [],
      order: null,
      submitting: false,
      done: false,
      btnText: 'Enregistrer',
    }),
    computed: {
      nomTraiteur(){
        if( this.order.artisan_id == 0 )
          return 'Aucun'
        let artisan = this.artisans.filter( (artisan) => artisan.id == this.order.artisan_id )[0]
        return artisan.name
      },
      orderStatus(){
        return orderStatusText(this.order)
      },
    },
    created(){
      this.id = this.$route.params.id
      this.artisans = this.$store.state.artisans
      this.order = this.$store.state.orders.filter( (order) => String(order.order_key) == String(this.id)  )[0];
      let num = this.order.artisan_id
      this.artisanNum = num
    },
    methods: {
      async setOrderArtisan(){
        //console.log(this.order);
        this.submitting = true
        this.btnText = 'Enregistrement ...'
        let result = await OrderService.set_prestataire(this.order.id, this.order.artisan_id)
        if(result){
          this.done = true
        }
        this.submitting = false

        this.btnText = 'Terminé'
      },
    }
  }
</script>