<template>
  <div>
    <Toolbar title="Ajouter un produit" />
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
                    :key="category.term_id"
                    v-slot="{ active, toggle }"
                    :value="category.term_id"
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
                label="Prix"
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

                counter
                show-size
                @change="selectFile"
              ></v-file-input>
              <div v-if="currentFile">
                <div>
                  <v-progress-linear
                    v-model="uploadProgress"
                    color="light-blue"
                    height="25"
                    reactive
                  >
                    <strong>{{ uploadProgress }} %</strong>
                  </v-progress-linear>
                </div>
              </div>
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
              width="100%"
              :disabled="submitting"
              :loading="submitting"
            >
              {{ btnText }}
            </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>
    <OverlayLoader :show="$store.state.loading" />
  </div>
</template>
<script>
  import Toolbar from '@/components/Toolbar'
  import * as productService from '@/services/product.js'
  import * as uploadService from '@/services/uploadService.js'
  import OverlayLoader from '@/components/OverlayLoader'
  export default {
    name: 'AddProduct',
    components:{
      Toolbar,
      OverlayLoader
    },
    data: () => ({
      valid: false,
      nameRules: [
        v => !!v || 'Nom du produit est obligatoire',
        v => v.length <= 30 || 'Nom du produit trop long',
      ],
      categories: [],
      //category_id: null,
      product: {
        name: '',
        price: 0,
        description: '',
        category_id: null,
        thumbnail_id: -1
      },
      submitting: false,
      btnText: 'Ajouter',
      currentFile: undefined,
      uploadProgress: 0,
      uploadMessage: '',
      fileInfos: []
    }),
    created(){
      this.categories = this.$store.state.product_cats
    },
    methods: {
      // Get selected files from v-file-input
      selectFile( file ){
        this.uploadProgress = 0
        this.currentFile = file
      },
      async upload(){
        // call upload service
        if( this.currentFile ){
          this.$store.commit('set_loading', true)
          const result = await uploadService.upload( this.currentFile )
          console.log(result)
          this.$store.commit('set_loading', false)
          return result
        }
        return false
      },
      async validate(){
        this.submitting = true
        this.btnText = 'Enregistrement ...'
        // Upload image
        console.log('uploading image ...')
        const thumbnail_id = await this.upload()
        console.log('upload done')
        // Saving product
        console.log('saving product ...')
        this.product.thumbnail_id = thumbnail_id
        const result = await productService.save(this.product)
        console.log('product saved!')
        console.log(result)
        if( result.name && result.name == this.product.name ){ // product created
          this.$store.commit('add_product', result)
        }

        this.$router.push({ name: 'Products'})
        //this.submitting = false
      },
    }
  }
</script>