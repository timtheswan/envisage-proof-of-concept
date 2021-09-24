<template>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn 
            color="secondary"
            
            text
            class="ma-0 pa-0"
            v-on="on"
            @click="courseClicked"
        >
            {{content}}
        </v-btn>
      </template>
      <span v-if="course">{{course.hours}} hrs - {{course.name}}</span>
      <span v-else>No Course Data</span>

    </v-tooltip>
</template>
<script>

  export default {
    data (){
        return {
            linkColor : "primary"
        };
    },
    props: {
        code : {
            required: true,
            type: String,
        },
        content : {
            type: String,
            required: true,
        },
        color : {
            required: false,
        }
        },
    
    methods: {
        courseClicked (){
            this.$emit('courseClicked',this.code); 
        }
    },
    computed: {
        course (){
            return this.$store.getters.getCourses[this.code]; 

        }
    }


};
</script>