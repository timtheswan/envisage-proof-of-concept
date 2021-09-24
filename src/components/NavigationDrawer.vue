<template>
  <v-list>
    <v-list-item>
      <v-list-item-content>
        
        <v-list-item-title class="title">
          Envisage
        </v-list-item-title>
       
        

      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list  nav>
      <v-list-item 
      link
      >
        <v-list-item-icon><v-icon>mdi-telescope</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Plans
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link> 
        <v-list-item-icon><v-icon>mdi-script</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Degrees
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item >
      <v-list-item link>
        <v-list-item-icon><v-icon>mdi-checkbox-marked</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Courses
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon><v-icon>mdi-calendar-month</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Track
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon><v-icon>mdi-clock</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Semester
          </v-list-item-title>
        </v-list-item-content>
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
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color=error>mdi-alert</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-btn text color=error @click="confirmClearBrowser=true">Clear Browser Storage</v-btn>
          </v-list-item-content>
        </v-list-item>
    </v-list>
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
  </v-list>
</template>
<script>
import Dialog from "./Dialog.vue";
import CreateTrack from "./track/CreateTrack.vue";

 
export default {
  components: {
    Dialog,
    CreateTrack,
  },
  data () {
    return {
      confirmClearBrowser : false,
      showCreateTrack : false,
      selectedPlan : "",
      params: {
        client_id: "119336198113-h6nhd9enl3o4maut0c4c4omi735bvuoi.apps.googleusercontent.com"
      },
      
    }
  },
  mounted (){
    let currentTrack = this.$store.getters.getCurrentTrack;
    if (currentTrack){
      this.selectedPlan = currentTrack.name;
    }
  },
  computed: {
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
    user () {
      console.log("Getting User");
      console.log(this.$store.getters.user);
      return this.$store.getters.user;
    }
  },

  methods: {
    clearBrowser(){
      this.confirmClearBrowser = false;
      localStorage.clear(); // Clears browser's local storage
      location.reload();
    },
    createTrackDialog (){
        this.showCreateTrack = true;
    },
    changeCurrentPlan(){
        console.log("Change current plan")
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
