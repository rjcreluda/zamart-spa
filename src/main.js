import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false


/**
* Warning: this is a dummy data for local test
**/
//import json_data from '@/data.json'
import json_data from '@/wpData.json'
if (window.location.port === '8080' && json_data) {
  window.wpData = json_data
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
