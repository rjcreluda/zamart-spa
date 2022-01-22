import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

//import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdi', // default - only for display purposes
	},
  theme: {
    themes: {
      light: {
        primary: '#d9534f',
        secondary: '#f5e06e',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
});
