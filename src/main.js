import '@/assets/styles/styles.css'

import App from './App'
import Vue from 'vue'
import VueCompositionApi from "@vue/composition-api"

Vue.use(VueCompositionApi)

new Vue({
  render: h => h(App),
}).$mount('#app')
