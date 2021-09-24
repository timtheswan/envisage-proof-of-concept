<template>
  <v-sheet max-height="75vh">
    
    <v-card   elevation="5"  class="mx-auto">
      <v-app-bar
      absolute
      
    >
      
    <v-tabs
      v-model="tab"
      centered
      
      icons-and-text
      absolute
      style="z-index:300"
      
    >
      <v-tabs-slider color=primary class="lighten-2"></v-tabs-slider>

      <v-tab href="#tab-0">
        Plans
        <v-icon>mdi-telescope</v-icon>
      </v-tab>

      <v-tab href="#tab-1" :disabled=noPlan>
        Degrees
        <v-icon>mdi-script</v-icon>
      </v-tab>

      <v-tab href="#tab-2" :disabled=noPlan>
        Courses
        <v-icon>mdi-checkbox-marked-outline</v-icon>
      </v-tab>

      <v-tab href="#tab-3" :disabled=noPlan>
        Track
        <v-icon>mdi-calendar-month</v-icon>
      </v-tab>

      <v-tab href="#tab-4" :disabled=noPlan>
        Semester
        <v-icon>mdi-clock</v-icon>
      </v-tab>
    </v-tabs>
      </v-app-bar>
      
      <br><br><br>

      <v-alert
      
      border="left"
      close-text="Close Alert"
      color="error accent-4"
      dark
      dismissible
      style="z-index:900"
    >
      This is a prototype of Envisage, it is still very much a work in progress. Please report any issues you find on the feedback form on the home page. While your data will usually be saved across sessions, it is recommended that you save your plan (download button) at the end of sessions if you want to keep it. Google Chrome will be the least buggy browser.
      
    </v-alert>



    <v-tabs-items v-model="tab">
      <v-tab-item
        :key="0"
        :value="'tab-' + 0"
      >
        <Plans
        @courseClicked="courseClicked($event)"
        />
      </v-tab-item>
      <v-tab-item
        :key="1"
        :value="'tab-' + 1"
      >
        <Degrees
        @courseClicked="courseClicked($event)"
        @degreeClicked="degreeClicked($event)"
        />
      </v-tab-item>
      <v-tab-item
        :key="2"
        :value="'tab-' + 2"
      >
        <Courses
        @courseClicked="courseClicked($event)"
        />
      </v-tab-item>
      <v-tab-item
        :key="3"
        :value="'tab-' + 3"
      >
        
        <Track
          @courseClicked="courseClicked($event)"
        />
        <!-- <v-card flat>
          <v-card-text>Track!</v-card-text>
        </v-card> -->
      </v-tab-item>
      <v-tab-item
        :key="4"
        :value="'tab-' + 4"
      >
        <v-card flat>
          <v-card-text>Plan weekly course times for each semester and handle section time/roster conflicts, semesters in advance. Coming soon... </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-divider/>
    

    <!-- <v-card-actions>
      <v-spacer/>
      <v-btn  color="primary" @click="savePlan">
        Download Plan
        <v-icon class="ml-3">mdi-download</v-icon>

      </v-btn>
    </v-card-actions> -->
  </v-card>
  <v-dialog
      v-model="showCourse"
      width="600"
    >
    <Course 
      :showCourseCode = "showCourseCode"
      :visible = showCourse
      @courseClicked="showCourseCode=($event)"
      @hide = "showCourse=false"
    />
  </v-dialog>
  <v-dialog
      v-model="showDegree"
      width="800"
    >
    <Degree 
      :degreeProp = "degreeData"
      :visible = showDegree
      @degreeClicked="degreeData=($event)"
      @hide = "showDegree=false"
      @courseClicked="showCourseCode=($event);showCourse=true;"

    />
  </v-dialog>
  <!-- <v-dialog
    v-model="noPlan"
    width=300px

    >
      <Dialog 
      title="No Existing Plans"
      subtitle="Looks like you don't have any plans created yet!"
      confirm = "Create Plan"
      @cancel="noPlan=false"
      @confirm="showCreateTrack=true; noPlan=false"
      />
    </v-dialog> -->
    <v-dialog
        v-model="showCreateTrack"
        width="600"
      >
      <CreateTrack 
        @hide = "showCreateTrack=false"
        @created = "showCreateTrack=false"
      />
    </v-dialog>
    
  </v-sheet>
  
</template>
<script>
  import Track from "../components/track/Track.vue";
  import Courses from "../components/courses/Courses.vue";
  // import Dialog from "../components/Dialog.vue";
  import Course from "../components/Course.vue";
  import CreateTrack from "../components/track/CreateTrack.vue";
  import Plans from "../components/plans/Plans.vue";
  import Degrees from "../components/degrees/Degrees.vue";
  import Degree from "../components/Degree.vue"




  export default {
    components: {
      Track,
      Course,
      Courses,
      // Dialog,
      CreateTrack,
      Plans,
      Degrees,
      Degree
    },    
    data () {
      return {
        tab: null,
        text: 'test',
        showCourse : false,
        showCourseCode : {},
        showDegree : false,
        degreeData : "",
        // noPlan : false,
        showCreateTrack : false,
        downloadLink : "",
      }
    },
    // mounted (){
    //   if (!(this.tracks&&Object.keys(this.tracks).length>0)){
    //     this.noPlan = true;
    //   }
    // },
    computed : {
      noPlan (){
        return !(this.tracks&&Object.keys(this.tracks).length>0);
      },
      tracks (){
        return this.$store.getters.getTracks;
      }
    },
    methods : {
      courseClicked (code){
        console.log(code)
        this.showCourse = true;
        this.showCourseCode = code;
      },
      degreeClicked (degree){
        this.showDegree = true;
        this.degreeData=degree;
      },
      savePlan (){
        let file = this.$store.getters.getCurrentPlanFile;
        let data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(file));

        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     data);
        downloadAnchorNode.setAttribute("download", this.$store.getters.getCurrentTrack.name + " Envisage Plan" + ".json");
        document.body.appendChild(downloadAnchorNode); //for firefox 
        downloadAnchorNode.click();
        downloadAnchorNode.remove();


      
        // this.$store.dispatch("savePlan");
      }
    }
  }
</script>