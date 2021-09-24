<template>
      <v-card>
        <v-card-title
        primary-title
        >
        Add Degree {{selectedDegree}}
        </v-card-title>
        <v-container>
        <v-autocomplete
        v-model="selectedDegree"
        :items=degrees
        item-text=name
        label="Search degrees by name"
        @keyup.enter="testInput"
        :search-input.sync="courseSearch"
        autofocus
        auto-select-first
        >
            <template v-slot:no-data>
                <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                    No degrees matching "<strong>{{ courseSearch }}</strong>".  Press <kbd>enter</kbd> to create a new one.
                    </v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </template>
        </v-autocomplete>
        
       

        </v-container>



        <v-card-actions>
        
        <v-btn
            color="primary"
            text
            @click="hide"
        >
            Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            @click="selected"
            :disabled=!valid
        >
            Add
        </v-btn>
        </v-card-actions>
        
      </v-card>
</template>

<script>
// import CourseLink from "../CourseLink.vue";



  export default {

    components: {
        // CourseLink,
    },
    data () {
      return {
          selectedDegree:"",
          courseSearch: "",
          
      }
    },
    computed: {
        
        degreesList () {
            let out = [];
            let degrees = this.$store.getters.getDegrees;
            for (let i in degrees){
                let degree = degrees[i];
                // degree.complete = degree.code + " - " + degree.name;
                out.push(degree);
            }
            return out;
        },
        valid (){
            // if (!this.selectedDegree) return false;
            return this.selectedDegree
        },
        degrees (){
            return this.$store.getters.getDegrees;
        }

    },
    methods: {
        hide(){
            this.$emit("cancel")
        },
        selected(){
            
            this.$emit("degreeSelected",this.selectedDegree)
            this.selectedDegree="";

        },
        testInput(){
            let degreeFound = false;
            for (let i of this.degrees){
                if (i.name===this.selectedDegree){
                    degreeFound = true;
                }
            }
            if (!degreeFound){
                this.$emit("createDegree")
            }
            
        },  

    }
  }
</script>