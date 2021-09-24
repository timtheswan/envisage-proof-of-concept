<template>
  <v-app-bar app dark elevate-on-scroll color="primary" style="z-index:10;">

      <v-app-bar-nav-icon v-if="false" @click="openSidebar"/>
      <v-sheet
        class="mx-auto"
        height="100%"
        width="100%"
        background="transparent"
        color="transparent"
      >
        <v-slide-group multiple >
          <v-slide-item class="mt-2">
            <router-link v-bind:to="{ name: 'home-page' }">
              <v-toolbar-title class="white--text">
                <!-- Envisage  -->
                <v-img max-width="100px" src="/logos/white_transparent.png"/>
              </v-toolbar-title>
            </router-link>
          </v-slide-item>
          <v-slide-item class="mt-2"> 
          <v-btn class="ml-3" v-if="isLoggedIn" text v-bind:to = "{ name: 'plan' }">
              Prototype 
          </v-btn>
          </v-slide-item>
          <v-slide-item class="mt-2">
          <v-btn class="ml-3" v-if="isLoggedIn" text v-bind:to = "{ name: 'work' }">
              Work
          </v-btn>
          </v-slide-item>
          <v-slide-item class="mt-2">
          <v-btn class="ml-3" v-if="isLoggedIn" text v-bind:to = "{ name: 'investor' }">
              Invest 
          </v-btn>
          </v-slide-item>
          <v-slide-item class="mt-2">
          <v-btn class="ml-3" text v-bind:to = "{ name: 'join' }">
            Apply
          </v-btn>
          </v-slide-item>
          
          <v-spacer></v-spacer>
          <v-slide-item v-if="!isLoggedIn">
          <v-btn  @click="showLogin=true" text>
            Log In
          </v-btn>
          </v-slide-item>

          <!-- Currently disabled while only working with Google -->
          <!-- <v-btn text v-if="!isLoggedIn" @click="showRegister=true">
            Register
          </v-btn> -->

          
            
          <v-slide-item v-if="isLoggedIn" class="d-flex ma-1 "
          >
            <div>
            <v-combobox
            
            style="background:rgba(0,0,0,0);z-index:200"
            v-model="showCourseCode"
            rounded
            solo-inverted
            auto-select-first
            placeholder="Courses and degrees"
            prepend-icon="mdi-magnify"
            :items=searchItems
            item-text=complete
            item-value=code
            :search-input.sync="courseSearch"
            @input="courseClicked(showCourseCode)"
            @keyup.enter="courseClicked(courseSearch)"

            >
              <template v-slot:no-data>
                <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                    No classes matching "<strong>{{ courseSearch }}</strong>". Press <kbd>enter</kbd> to create a new one.
                    </v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </template>
            <!-- :items="states"
            :loading="isLoading"
            :search-input.sync="search" -->
            </v-combobox>
            </div>
          </v-slide-item>
          
          <v-slide-item class="ma-3" v-if="user && user.data">
            {{user.data.displayName}}
          </v-slide-item>
          <v-slide-item>
          <v-menu
            
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-y
            v-if="false"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
              >
                <v-avatar v-if="isLoggedIn" class="pa-1">
                  <v-img v-if="user && user.data" :src='user.data.photoURL' />
                  <v-icon v-else>mdi-school-outline</v-icon>
                </v-avatar>
              </v-btn>
            </template>

            <v-card >
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img v-if="user && user.data" :src='user.data.photoURL' alt="user.data.displayName" />
                    <v-icon v-else>mdi-school-outline</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-if="user && user.data">{{user.data.displayName}}</v-list-item-title>
                    <v-list-item-title v-else>John Smith</v-list-item-title>
                    <v-list-item-subtitle>Data Admin</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list>
              
              <!-- <v-list-item>
                <v-list-item-title>
                  Selected Plan
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                
                <v-overflow-btn
                v-model="selectedPlan"
                :items=planNames
                label="Selected Plan"
                @input="changeCurrentPlan"
                />
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                <v-btn
                @click="createTrackDialog"
                >
                Create New Plan
                </v-btn>
                </v-list-item-action>
              </v-list-item> -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color=error>mdi-alert</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-btn text color=error @click="confirmClearBrowser=true">Clear Browser Storage</v-btn>
                </v-list-item-content>
              </v-list-item>
              </v-list>

              <v-card-actions>
                <!-- <v-spacer></v-spacer> -->

                <!-- <v-btn text @click="menu = false">Cancel</v-btn> -->
                <!-- <v-layout align-space-around column> -->
                  <v-btn large color="primary" block disabled @click="signOut(); menu = false;">
                    Sign Out
                  </v-btn>
                <!-- </v-layout> -->
                <!-- <v-btn color="primary" text @click="menu = false">Save</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-menu>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
  <v-dialog
  v-model="showLogin"
  width=400px
  >
    <Login
    @login = "showLogin=false"
    @cancel = "showLogin=false"
    />
  </v-dialog>

  <v-dialog
  v-model="showRegister"
  width=400px
  >
    <Register
    @registered = "showRegister=false"
    @cancel = "showRegister=false"
    />
  </v-dialog>
  <v-dialog
    v-model="confirmClearBrowser"
    width=300px

    >
      <Dialog 
      title="Clear Local Browser Data?"
      subtitle="This will delete all changes you have made, including plans, custom degrees, and custom courses."
      @cancel="confirmClearBrowser=false"
      @confirm="clearBrowser"
      />
    </v-dialog>
    <v-dialog
        v-model="showCreateTrack"
        width="600"
      >
      <CreateTrack 
        @hide = "showCreateTrack=false"
        @created = "planCreated"
      />
    </v-dialog>

  </v-app-bar>
</template>

<script>
import Login from "./Login.vue";
import Register from "./Register.vue";
// import firebase from "firebase";
import CreateTrack from "./track/CreateTrack.vue";
import Dialog from "./Dialog.vue";


export default {
  components: {
    Login,
    Register,
    CreateTrack,
    Dialog,
  },
  mounted (){
    let currentTrack = this.$store.getters.getCurrentTrack;
    if (currentTrack){
      this.selectedPlan = currentTrack.name;
    }
  },
  
  data () {
      return {
        courseSearch : "",
        showCourseCode : "",
        showCourse : false,
        showDegreeName : "",
        showDegree : false,
        showLogin : false,
        showRegister : false,
        menu : false,
        selectedPlan : false,
        showCreateTrack : false,
        confirmClearBrowser : false,


      }
    },
  computed: {
    searchItems(){
      let items = this.degreesList.concat(this.coursesList);
      // items.concat(this.degrees);
      // items.concat(this.coursesList);
      // console.log(this.degrees);
      // console.log(this.coursesList);
      // console.log(items);
      return items;
      
    },
    isLoggedIn() {
      return true;
      // return this.$store.getters.isLoggedIn; Disabled Accounts for now
    },
    user(){
      return null;
      //return this.$store.getters.user;
    },
    degrees (){
      return this.$store.getters.getDegrees;
    },
    degreesList (){
      let out = [];
      let degrees = this.$store.getters.getDegrees;
      for (let i in degrees){
          let degree = degrees[i];
          degree.complete = degree.name + " - " + degree.catalogYear;
          degree.code = degree.complete;
          out.push(degree);
      }
      return out;
    },
    degreeNames (){
      let out = [];
      let degrees = this.degreesList;
      for (let degree of degrees){
          out.push(degree.complete);
      }
      return out;
    },
    courses (){
        return this.$store.getters.getCourses; 
    },
    coursesList () {
      let out = [];
      let courses = this.$store.getters.getCourses;
      for (let i in courses){
          let course = courses[i];
          course.complete = course.code + " - " + course.name;
          out.push(course);
      }
      if (this.updateCourses){
          return out;
      }
      return out;
    },
    plans (){
      return this.$store.getters.getTracks; 
    },
    planNames (){
      let out = [];
      for (let plan in this.plans){
        out.push(this.plans[plan].name);
      }
      return out;
    },
  },

  methods: {
    openSidebar(){
      this.$emit("openSidebar");
    },
    courseClicked (course){
      if (course && this.degreeNames.includes(course.complete )){ //If degree clicked
        // console.log("Degree")
        this.$emit('degreeClicked',course);

      }
      else if (course && !(course.code in this.courses)){
        this.$emit('courseClicked','_new_');
      }
      else if (course){
        // console.log("View course");

        this.$emit('courseClicked',course.code);
      }
      this.showCourseCode = "";
      console.log("clearing")
    },
    testInput(){
      if (!(this.showCourseCode in this.courses)){
          console.log("Create course");
      }
    },
    // signOut() {
    //   firebase
    //     .auth()
    //     .signOut()
    //     .then(() => {
    //       this.$router.replace({
    //         name: "home-page"
    //       });
    //     });
    // },
    clearBrowser(){
      this.confirmClearBrowser = false;
      localStorage.clear(); // Clears browser's local storage
      location.reload();
    },
    createTrackDialog (){
        this.showCreateTrack = true;
    },
    changeCurrentPlan(){
        this.$store.commit('changeCurrentTrack', this.selectedPlan);
        // this.$forceUpdate();


      },
    planCreated (){
      this.showCreateTrack = false;
      this.selectedPlan = this.$store.getters.getCurrentTrack.name;
    },
    
  }
};
</script>
