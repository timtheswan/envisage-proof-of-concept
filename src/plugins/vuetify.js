import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#2255FF',
          secondary: '#0C1F5E',
          accent: '#5DD39E',
        },
      },
    },
  })

export default vuetify;
