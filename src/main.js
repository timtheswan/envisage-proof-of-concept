import Vue from "vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import axios from "axios";
import App from "./App.vue";
import VueAnalytics from 'vue-analytics';
// import * as firebase from "firebase";


Vue.use(VueAnalytics, { //Google Analytics
  id: 'UA-143684267-3',
  router
}
)

const axiosClient = axios.create({
  baseURL: "http://localhost:3000"
});
Vue.prototype.$axios = axiosClient;

Vue.config.productionTip = false;

// const configOptions = {
//   apiKey: "AIzaSyC9ifE02VyFo48hYOIg6AANRM2qEsD7gEA",
//   authDomain: "envisage-1580402989981.firebaseapp.com",
//   databaseURL: "https://envisage-1580402989981.firebaseio.com",
//   projectId: "envisage-1580402989981",
//   storageBucket: "envisage-1580402989981.appspot.com",
//   messagingSenderId: "119336198113",
//   appId: "1:119336198113:web:51cb23c413ed266ed1bca0",
//   measurementId: "G-GP9JHJS7JL"
// };

// firebase.initializeApp(configOptions);
// firebase.analytics();

// firebase.auth().onAuthStateChanged(user => {
//   store.dispatch("fetchUser", user);
  
// });

new Vue({
  el: "#app",
  data: {
  },
  router,
  store,
  vuetify,
  render: h => h(App)
});


