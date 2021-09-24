<template>
  <v-app>
    <nav-bar 
    @openSidebar="drawer=true"
    @courseClicked="courseClicked($event)"
    @degreeClicked="degreeClicked($event)"

    />
    <v-navigation-drawer 
      v-model="drawer"
      absolute
      temporary
      left
      width="350px"
      style="z-index:11"
      v-if="false"
      
    >
      <navigationDrawer/>
    </v-navigation-drawer>
    <v-content max-height=100vh>
      <!-- <v-container> -->
        <v-dialog
          v-model="showCourse"
          width="600"
        >
          <Course 
            :showCourseCode = "showCourseCode"
            :visible=showCourse
            @hide = "showCourse=false"
            @courseClicked="showCourseCode=($event);"

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
        <router-view></router-view>
      <!-- </v-container> -->
    </v-content>

      
    <v-footer class="pa-3" style="z-index:200">
    
      <v-layout justify-center class="font-weight-thin">
        &copy; {{ new Date().getFullYear() }} Tim Swanson 
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  import NavBar from "./components/NavBar.vue";
  import NavigationDrawer from "./components/NavigationDrawer.vue";
  import Course from "./components/Course.vue";
  import Degree from "./components/Degree.vue"

  

  export default { 
  name: "App",
  components: {
    NavBar,
    NavigationDrawer,
    Course,
    Degree
  },
  
  data (){
    return {
      drawer : false,
      showCourse : false,
      showCourseCode : "",
      showDegree : false,
      degreeData : "",
    }
  },
  methods: {
    courseClicked (code){
      this.showCourseCode = code;
      this.showCourse = true;
    },
    degreeClicked (degree){
      this.degreeData = degree;
      this.showDegree = true;
    },
    

  }
  
};
</script>
 

