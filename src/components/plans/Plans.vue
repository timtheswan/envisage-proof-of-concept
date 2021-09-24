<template>
    <v-container >
        <h1 class="title" >Plans</h1>
        <h2 class="subtitle-1">Manage your plans, which contains a set of degrees, course selections, tracks, and semester plans.</h2>
        <p class="body-1" v-if=planDetails>
            <br>
            Active Plan: <strong>{{currentPlan}}</strong>

            {{planDetails.description}}
            
            <!-- Degrees: <span v-for="planDetails.currentDegrees"photos
            > -->
            <br>
            <!-- {{trackNames[selectedPlan]}} ({{selectedPlan}})({{trackNames}}) -->
            
            <!-- {{planDetails}} -->
            {{planDetails.startingSemester}} {{planDetails.startingYear}} - {{planDetails.finalSemester}} {{planDetails.finalYear}}
            

            
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
                    <v-toolbar-title>My Plans</v-toolbar-title>

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
                        <v-list-item
                            @click="createTrackDialog"
                        >
                        <v-list-item-title >Create New</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                        @click="importPlanDialog=true"
                        
                        >
                        <v-list-item-title 
                        >
                        Import Envisage File
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
                    <!-- <v-list-item-group mandatory v-model="currentPlan"> -->
                        <v-list-item
                        disabled
                        v-if="!Object.keys(plans).length"
                        >
                        <p> Looks like you don't have any plans created yet! Click + to get started.</p>
                        </v-list-item>
                        <v-list-item
                        v-else 
                        v-for="(plan,index) in plans"
                        :key=index
                        @click="selectPlan(plan)"
                        >
                            
                            <v-list-item-content>
                                <v-list-item-title v-if="plan.name==currentPlan">
                                    <strong>{{plan.name}}</strong>  
                                </v-list-item-title>
                                <v-list-item-title v-else>
                                    {{plan.name}}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{plan.description}}
                                </v-list-item-subtitle>

                            
                            </v-list-item-content>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-list-item-action
                                    @click= savePlan(index)
                                    v-on="on"
                                    >
                                        <v-icon>mdi-download</v-icon>
                                    </v-list-item-action>
                                </template>
                                <span>Download plan and all custom courses and degrees</span>
                            </v-tooltip>
                            
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-list-item-action
                                    @click= confirmDelete(plan.name)
                                    v-on="on"
                                    >
                                        <v-icon>mdi-delete</v-icon>
                                    </v-list-item-action>
                                </template>
                                <span>Permanently </span>
                            </v-tooltip>
                            
                        </v-list-item>
                    <!-- </v-list-item-group> -->
                </v-list>
                
                </v-sheet>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog
        v-model="showCreateTrack"
        width="600"
        >
            <CreateTrack 
                @hide = "showCreateTrack=false"
                @created = "planCreated"
            />
        </v-dialog>
        <v-dialog
        v-model="deletePlanDialog"
        width="400"
        >
            <Dialog 
            title="Delete Plan?"
            subtitle="This will delete your plan, including the planned degrees, courses, and semesters under it."
            @cancel="deletePlanDialog=false"
            @confirm="deletePlan"
            />
        </v-dialog>
        <v-dialog
        v-model="importPlanDialog"
        width="400"
        >
            <v-card @keyup.enter="confirmClicked"> 
                <v-card-title > 
                    Import Plan from File"
                </v-card-title>
                <v-card-text>
                Select a .json file to import plan settings as a new plan. This will import all of custom courses and degrees along with the plan.
                <v-file-input @change = "fileSelected" id="importFile" accept="json" label="File input"></v-file-input>
                <v-text-field
                    v-model="newPlanName"
                    label="Plan Name"
                    :disabled=!selectedPlanFile
                ></v-text-field>
                </v-card-text>

                
                

                <v-card-actions>
                <v-btn text @click="importPlanDialog=false">Cancel</v-btn>
                <v-spacer />
                <v-btn :disabled=!validPlan color="primary" @click="importPlan">Import</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import CreateTrack from "../track/CreateTrack.vue";
import Dialog from "../Dialog.vue"

  export default {
      components: {
          CreateTrack,
          Dialog
      },
      data () {
          return {
            collapseOnScroll : true,
            showCreateTrack : false,
            deletePlanDialog : false,
            onDeckDeletePlan : "",
            importPlanDialog : false,
            selectedPlanFile : null,
            newPlanName : "",
          }

      },
      mounted (){
          this.selectedPlan = this.trackNames.indexOf(this.currentPlan)
    },

      computed : {
      plans (){
        return this.$store.getters.getTracks;
      },
      planDetails (){
          try {
                return this.$store.getters.getCurrentTrack;
            }
            catch {
                // this.$store.commit('changeCurrentTrack', this.trackNames[this.selectedPlan]);
                console.log("ERROR - Bad Current Plan")
                return (null);
            }
      },
    //   selectedPlan : {
    //       get() {
    //           console.log("get")
    //         return this.$store.getters.getCurrentTrack.name;
    //       },
    //       set(value){
    //         console.log("Set")
    //         console.log(this.trackNames[value])
    //         // this.$store.commit('changeCurrentTrack', this.trackNames[value]);
    //       }

    //   },
      currentPlan :{
        get() {
            try {
                return this.$store.getters.getCurrentTrack.name;
            }
            catch {
                // this.$store.commit('changeCurrentTrack', this.trackNames[this.selectedPlan]);
                console.log("ERROR - Bad Current Plan")
                return (null);
            }
        },
        set(value) {
            this.$store.commit('changeCurrentTrack', this.trackNames[value]);

            // this.$forceUpdate();
        }
      },
    //   currentPlan (){
    //       try {
    //         return this.$store.getters.getCurrentTrack.name;
            
    //       }
    //       catch {
    //         // this.$store.commit('changeCurrentTrack', this.trackNames[this.selectedPlan]);
    //         console.log("ERROR - Bad Current Plan")
    //         return (null);
    //       }

    //   },
      trackNames (){
          return this.$store.getters.getTrackNames;
      },
      
      tracks (){
          return this.$store.getters.getTracks;
      },
      courses (){
        return this.$store.getters.getCourses; 
      },
      degrees (){
        return this.$store.getters.getDegrees; 
      },
    validPlan (){
        if (!(this.selectedPlanFile&&this.newPlanName)){return false}
        return !(this.trackNames.includes(this.newPlanName))
    }
      
    
    },
    methods: {
        planCreated (){
            this.showCreateTrack = false;
            this.selectedPlan = this.trackNames.indexOf(this.currentPlan);
        },
        createTrackDialog (){
            this.showCreateTrack = true;
        },
        selectPlan (plan) {
            this.$store.commit('changeCurrentTrack', plan   );

        },
        confirmDelete (plan){
            this.onDeckDeletePlan = plan;
            this.deletePlanDialog = true;
        },
        deletePlan () {
            this.deletePlanDialog = false;
            this.$store.commit('removeTrack', this.onDeckDeletePlan   );
            if (this.currentPlan==this.onDeckDeletePlan){
                this.$store.commit('changeCurrentTrack',Object.keys(this.tracks)[0]);
                // this.selectedPlan = 0;
            }
            this.onDeckDeletePlan = "";

        },
        savePlan (plan){
        let temp = this.$store.getters.getCurrentTrack; //Jank, I know
        this.$store.commit("changeCurrentTrack",plan);
        let file = this.$store.getters.getCurrentPlanFile;
        this.$store.commit("changeCurrentTrack", temp);
        let data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(file));

        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     data);
        downloadAnchorNode.setAttribute("download", plan + " Envisage Plan" + ".json");
        document.body.appendChild(downloadAnchorNode); //for firefox 
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        },
        fileSelected () {
            let selectedFile = document.getElementById('importFile').files[0];
            let vm = this;
            if (selectedFile) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    let newPlan = JSON.parse(evt.target.result);
                    vm.selectedPlanFile = newPlan;
                    vm.newPlanName = newPlan.name;
                };

                reader.onerror = function (evt) {
                    console.error("An error ocurred reading the file",evt);
                };

                reader.readAsText(selectedFile, "UTF-8");
            }
        },
        importPlan (){
            this.selectedPlanFile.track.name = this.newPlanName;
            this.selectedPlanFile.track.id = this.newPlanName;
            if (!this.selectedPlanFile.track.courseSelections){
                this.selectedPlanFile.track.courseSelections={};
            }
            this.$store.commit('addTrack', this.selectedPlanFile.track);
            for (let course of Object.keys(this.selectedPlanFile.customCourses)){
                if (!this.courses[course]){
                    this.$store.commit("createCourse",this.selectedPlanFile.customCourses[course]);
                }
            }
            console.log(this.selectedPlanFile.customDegrees);
            for (let degree of this.selectedPlanFile.customDegrees){
                if (!this.degrees[degree.name]){
                    this.$store.commit("createDegree",degree);
                }
            }

            //TODO Import custom tags here
            this.importPlanDialog = false;
            this.selectedPlan = this.trackNames.indexOf(this.currentPlan);

            
        },
        
        
    },

  }
</script>