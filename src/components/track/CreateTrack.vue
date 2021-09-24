<template>
      <v-card>
        <v-card-title
        primary-title
        >
        Create Plan
        </v-card-title>
        <v-card-subtitle>
            Create a new academic plan for what degrees you will take, what courses you will take, and when you will take them. 
        </v-card-subtitle>
        <v-divider/>
        <v-container class="pa-5">

        <v-text-field
          v-model="name"
          label="Plan Name"
        ></v-text-field>
        <v-text-field
          v-model="description"
          
          label="Plan Description"
        ></v-text-field>
        <v-card-subtitle>Date Range</v-card-subtitle>
        <v-row>
            <v-col cols = "14" sm="3" >
                <v-overflow-btn
                    v-model="startingYear"
                    class="my-2"
                    :items="years"
                    item-text=name
                    item-value=value
                    editable
                    menu-props="top"
                    hint="Starting Year"
                ></v-overflow-btn>
            </v-col>
            <v-col cols = "14" sm="3">
                <v-overflow-btn
                    v-model="startingSemester"
                    class="my-2"
                    :items="semesters"
                    item-text=name
                    item-value=value
                    menu-props="top"
                    hint="Starting Semester"
                ></v-overflow-btn>
            </v-col>
            <v-col cols = "14" sm="3" >
                <v-overflow-btn
                    v-model="finalYear"
                    class="my-2"
                    :items="years"
                    item-text=name
                    item-value=value
                    editable
                    menu-props="top"
                    hint="Ending Year"
                ></v-overflow-btn>
            </v-col>
            <v-col cols = "14" sm="3">
                <v-overflow-btn
                    v-model="finalSemester"
                    class="my-2"
                    :items="semesters"
                    item-text=name
                    item-value=value
                    menu-props="top"
                    hint="Ending Semester"
                ></v-overflow-btn>
            </v-col>
        </v-row>
        </v-container>


        <v-divider></v-divider>

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
            @click="createTrack"
            :disabled=!complete
        >
            Add
        </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>

  export default {
    data () {
      return {
        name : "",
        description : "",
        startingYear : new Date().getFullYear(),
        startingSemester : "Fall",
        finalYear : new Date().getFullYear()+4,
        finalSemester : "Spring",
        semesters : ["Fall","J-Term","Spring","Summer"]

          
      }
    },
    computed: {
        complete() {
            if (!(this.name && this.startingYear && this.startingSemester && this.finalYear && this.finalSemester)){
                return false;
            }
            return !(this.trackNames.includes(this.name));
        },
        trackNames (){
          return this.$store.getters.getTrackNames;
        },
        track :{
            get() {
                return this.$store.getters.getCurrentTrack;
            },
            set(value) {
                this.$store.commit('updateTrack', value);
            }
        },
        years () {
            let years = [];
            let thisYear = new Date().getFullYear();
            for (let year = thisYear-4; year <= thisYear+4; year++){
                years.push(year);
            }
            return years;
        }


    },
    methods: {
        hide(){
            this.$emit("hide")
        },
        createTrack(){
            let semesters = this.semesters;
            let yearNames = ["Freshman","Sophomore","Junior","Senior","Super Senior"];
            let track = {
                id : this.name,
                name : this.name,
                description : this.description,
                unplacedClasses : [],
                transferred : {},
                years : {},
                startingYear : this.startingYear,
                startingSemester : this.startingSemester,
                finalYear : this.finalYear,
                finalSemester : this.finalSemester,
                currentDegrees : ["Foundational Core"],
                courseSelections : {},


            };
            for (let year = this.startingYear; year < this.finalYear; year++){
                track.years[year]={
                    year : year,        //Starting year (2019-2020 would be 2019)
                    name : yearNames[year-this.startingYear],
                    semesters : {}
                };
                let semesterCounter = 0;
                if (year==this.startingYear ){ //To handle students starting on semesters other than Fall, starting later shortens freshmen year
                    semesterCounter = semesters.indexOf(this.startingSemester)
                    if (this.startingSemester=="Summer"){
                        semesterCounter = -1;
                    }
                }

                let yearAdjust = 0;
                
                while (semesterCounter < 4 && (year<this.finalYear-1 || semesterCounter <= semesters.indexOf(this.finalSemester))){
                    if (semesterCounter==1){
                        yearAdjust=1;
                    }
                    if (semesterCounter==-1){
                        let id = year+yearAdjust + " " + semesters[3];
                        track.years[year].semesters[id]={
                            id : id,
                            name : semesters[3],
                            courses : []
                        }
                    }
                    else {
                        let id = year+yearAdjust + " " + semesters[semesterCounter];
                        track.years[year].semesters[id]={
                            id : id,
                            name : semesters[semesterCounter],
                            courses : []
                        }
                    }
                    semesterCounter++;

                }
            }
            this.$store.commit('addTrack', track);
            this.$emit("created");
            this.name = "";
            this.description="";
            this.startingYear = new Date().getFullYear();
            this.startingSemester = "Fall";
            this.finalYear = new Date().getFullYear()+4;
            this.finalSemester = "Spring";



        }
    }
  }
</script>