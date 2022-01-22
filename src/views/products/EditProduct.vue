<template>
  <div>
    <Toolbar title="Modifier le produit" />
    <v-container>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="product.name"
                :rules="nameRules"
                :counter="30"
                label="Nom du produit"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="8"
            >
              Catégorie
              <v-sheet
                class="mx-auto"
                max-width="1000"
              >
                <v-slide-group
                v-model="product.category_id"
                center-active
                >
                  <v-slide-item
                    v-for="category in categories"
                    :key="category.id"
                    v-slot="{ active, toggle }"
                    :value="category.id"
                  >
                    <v-btn
                      class="mx-2"
                      :input-value="active"
                      active-class="brown white--text"
                      depressed
                      rounded
                      @click="toggle"
                    >
                      {{ category.name }}
                    </v-btn>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="product.price"
                label="Prix (€)"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-file-input
                accept="image/*"
                label="Image"
                chips
                truncate-length="15"
                prepend-icon="mdi-camera"
                multiple
                counter
                show-size
              ></v-file-input>
            </v-col>

            <v-col cols="12" md="12">
              <v-textarea
                name="input-7-1"
                label="Description du produit"
                v-model="product.description"
                hint="Hint text"
              ></v-textarea>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
            <v-btn
              color="secondary"
              class="mr-4 elevation-0 black--text"
              @click="validate"
              width= 100%
            >
              Enregistrer
            </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>
  </div>
</template>
<script>
  import Toolbar from '@/components/Toolbar'
  export default {
    name: 'EditProduct',
    components:{
      Toolbar,
    },
    data: () => ({
      valid: false,
      name: 'Ongle',
      price: '10',
      description: 'lorem ispum simit dolor emet siri',
      nameRules: [
        v => !!v || 'Nom du produit est obligatoire',
        v => v.length <= 30 || 'Nom du produit trop long',
      ],
      category: 10,
      categories: [],
      product: null
    }),
    created(){
      const id = this.$route.params.id
      this.product = this.$store.state.products.filter( (product) => String(product.id) == String(id)  )[0];
      this.categories = this.$store.state.product_cats
    },
    methods: {
      validate(){},
    },
  }
</script>