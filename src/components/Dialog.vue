<template>
  <v-card @keyup.enter="confirmClicked"> 
    <v-card-title v-if="title">
        {{title}}
    </v-card-title>
    <v-card-text v-if="subtitle">
      {{subtitle}}
    </v-card-text>

    <v-card-actions>
      <v-btn text @click="cancel">Cancel</v-btn>
      <v-spacer />
      <v-btn v-if="confirm" color="primary" @click="confirmClicked">{{confirm}}</v-btn>
      <v-btn v-else color="primary" @click="confirmClicked">Confirm</v-btn>

    </v-card-actions>
    <CourseLink v-if="false"/>

  </v-card>
</template>

<script>
import CourseLink from "./CourseLink.vue";



  export default {

    components: {
        CourseLink,
    },
    props: {
        title : {
            required : true
        },
        subtitle : {
            required : false
        },
        confirm : {
            required : false
        }
    },
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
        cancel(){
            this.$emit("cancel")
        },
        confirmClicked(){
            this.$emit("confirm")
        }
        
    }
  }
</script>