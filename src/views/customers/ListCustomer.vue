<template>
  <div>
    <Toolbar title="Clients" />
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            clearable
            append-icon="mdi-magnify"
            placeholder="Chercher un client"
            v-model="searchText"
            @click:clear="clearSearch"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-list>
      <div v-for="customer in filteredCustomers" :key="customer.id">
        <v-list-item>
          <v-list-item-content @click="showCustomer(customer)">
            <v-list-item-title>{{ customer.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ customer.email }} <br />
              {{ customer.phone }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <a class="phone-call" :href="`tel: ${customer.phone}`">
              <v-icon>mdi-phone</v-icon>
            </a>
            <a class="phone-call" :href="`tel: ${customer.phone}`">
              <v-icon>mdi-envelop</v-icon>
            </a>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
      </div>
  </v-list>
  </div>
</template>
<script>
  import Toolbar from '@/components/Toolbar'

  export default {
    name: 'ListCustomer',
    components: {
      Toolbar,
    },

    computed: {
      filteredCustomers(){
        let list = this.customers
        let search = String(this.searchText).toLowerCase()
        if( search.length > 2 && search !== 'null' ){
          list = this.customers.filter( (customer) => customer.name.toLowerCase().includes(this.searchText.toLowerCase()) )
        }
        return list
      }
    },
    data: () => ({
      customers: [],
      searchText: '',
    }),
    created(){
      //this.loadCustomer()
      this.customers = this.$store.state.customers
    },
    methods: {
      clearSearch(){
        this.searchText = ''
      },
      loadCustomer(){
        this.customers = [
          { name: 'Peter Jhonson', email: 'peter@gmail.com', phone: '+33 45 789' },
          { name: 'John Doe', email: 'doe@gmail.com', phone: '+33 45 789' },
          { name: 'Mike', email: 'mike@gmail.com', phone: '+33 45 789' },
          { name: 'Alice', email: 'alice@gmail.com', phone: '+33 45 789' },
        ]
      },
      showCustomer( c ){
        console.log(c)
      }
    }
  }
</script>

<style scoped>
  a.phone-call{ text-decoration: none; }
</style>