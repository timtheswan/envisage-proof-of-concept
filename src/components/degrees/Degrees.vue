<template>
    <v-container >
        <p class="font-weight-regular">
            Search for, get info on, create, and add degrees to your plan. <strong>Not required</strong>, if you already know which courses to take to meet degree requirements, skip to track.
            <br>
            <br>
            Summary data will be displayed here.

            
        </p>
        <v-row justify=center>
            <v-col cols="6">
                <v-card   class="overflow-hidden">
                   
                <v-app-bar
                    :collapse="!collapseOnScroll"
                    :collapse-on-scroll="collapseOnScroll"
                    absolute
                    color="secondary dark"
                    dark
                    scroll-target="#scrolling-techniques-7"
                    style="z-index:6"
                >
                    <v-toolbar-title>My Degrees</v-toolbar-title>

                    <v-spacer></v-spacer>
                    <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn 
                            class="mx-2" 
                            v-on="on"
                            icon  
                        >
                        <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="showAddDegree=true"
                        >
                            <v-list-item-title  >
                                Select Degree
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="createDegree">
                            <v-list-item-title 
                            >
                            Create Custom Degree
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-title 
                            >
                            Update Catalog Year
                            </v-list-item-title>
                        </v-list-item>
                        
                    </v-list>
                    </v-menu>
                </v-app-bar>

                <v-sheet
                id="scrolling-techniques-7"
                class="overflow-y-auto pt-8"
                max-height="600"
                
                >
                <br><br>
                <v-list two-line>
                    <v-list-item-group mandatory v-model="selectedDegree">
                        <v-list-item 
                        v-for="(degree,index) in currentDegrees"
                        :key=index
                        @click="degreeClicked(degree)"
                        >
                            
                            <v-list-item-content>
                                <v-list-item-title>
                                {{degree.name}}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{degree.department}}
                                </v-list-item-subtitle>
                            
                            </v-list-item-content>
                            <v-list-item-action
                            @click= removeDegree(index)
                            >
                                <v-icon>mdi-minus</v-icon>
                            </v-list-item-action>
                            
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                
                </v-sheet>
                </v-card>
            </v-col>
        </v-row>
        <!-- <v-dialog
            v-model="showCreateDegree"
            width="1000"
            >
            <CreateDegree 
            @hide = "showCourseCreator=false"
            @createDegree = "createDegree($event)"
            @courseClicked = "courseClicked($event)"
            />
        </v-dialog> -->
        <v-dialog
            v-model="showAddDegree"
            width="400"
            >
            <DegreeSelector 
            @cancel = "showAddDegree=false"
            @courseClicked = "courseClicked($event)"
            @degreeSelected = "addDegree($event)"
            @createDegree = "createDegree"
            />
        </v-dialog>
        <!-- <v-dialog
        v-model="removeDegreeDialog"
        width="400"
        >
            <Dialog 
            title="Remove Degree?"
            subtitle="This will not remove courses from your track"
            @cancel="removeDegreeDialog=false"
            @confirm="removeDegree"
            />
        </v-dialog>
         -->
    </v-container>
</template>
<script>
// import Dialog from "../Dialog.vue"
// import Degree from "../Degree.vue"
import DegreeSelector from "./DegreeSelector.vue"


  export default {
      components: {
        //   Degree,
          DegreeSelector,
      },
      data () {
          return {
            collapseOnScroll : true,
            showDegree : false,
            showAddDegree : false,
            selectedDegree : "",
          }

      },
      mounted (){
    },

      computed : {
      currentPlan (){
          try {
            return this.$store.getters.getCurrentTrack.name;
          }
          catch {
            // this.$store.commit('changeCurrentTrack', this.trackNames[this.selectedPlan]);
            console.log("ERROR - Bad Current Plan")
            return (null);
          }

      },
      trackNames (){
          return this.$store.getters.getTrackNames;
      },
      tracks (){
          return this.$store.getters.getTracks;
      },
      courses (){
        return this.$store.getters.getCourses; 
      },
      currentDegrees (){
        let degrees = this.$store.getters.getCurrentDegrees; 
        console.log(degrees);
        return degrees;

      },
      degrees (){
        return this.$store.getters.getDegrees; 

      },
    
    },
    methods: {
        courseClicked (code){
            this.showCourse = true;
            this.showCourseCode = code;
            console.log("hi");
        },
        createDegree (){
            this.$emit('degreeClicked','_new_')
            // this.$store.commit('createDegree',degree);
            // this.$store.commit('addDegree',degree.name);
            // this.showCreateDegree=false;
            // console.log(degree);
        },
        degreeClicked (degree){
            this.$emit("degreeClicked",degree);
        },
        removeDegree (degreeName){
            console.log("Remove")
            this.$store.commit('removeDegree',degreeName)
        },
        addDegree(degreeName){
            console.log("Add")
            this.showAddDegree=false;
            this.$store.commit('addDegree',degreeName);
            console.log(degreeName);

        }
        
        
    },

  }
</script>