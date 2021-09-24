<template>
      <v-card>
        <v-card-title
        primary-title
        >
        Add Course
        </v-card-title>
        <v-card-subtitle>
            Select a course, or create a new one
        </v-card-subtitle>
        <v-divider/>
        <v-container>
            Selected:{{selectedCourse}}
            <v-combobox
            v-model="selectedCourse"
            auto-select-first
            placeholder="Search for a course"
            :items=coursesList
            item-text=complete
            item-value="code"
            :search-input.sync="courseSearch"
            @input="courseClicked(selectedCourse)"
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
            <v-btn @click="viewCourse" v-if="selectedCourse" class="ma-2">
                View Course
            </v-btn>
            <v-btn @click="courseClicked('new')" v-else class="ma-2">
                Create New Course
            </v-btn>


        <!-- <v-autocomplete
        v-if=!showCourseCreator
        v-model="selectedCourse"
        :items=coursesList
        item-text=complete
        item-value=code
        label="Type in a course code or name"
        @keyup.enter="testInput"
        :search-input.sync="courseSearch"

        >
            <template v-slot:no-data>
                <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                    No classes matching "<strong>{{ courseSearch }}</strong>".  Press <kbd>enter</kbd> to create a new one.
                    </v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </template>
        </v-autocomplete> -->
        
        
        <!-- <v-list-item-group
                        value="true"
                        v-model="selectedSemester"
                    > -->
        <v-sheet
        class="overflow-y-auto pt-8"
        max-height="450"
        >
        <v-card-text>
            Select Semester (optional)
        </v-card-text>
        <v-radio-group v-model="selectedSemester">
            <v-expansion-panels
            multiple
            hover
            accordion
            >
            
            <v-expansion-panel
                v-for="(year,index) in track.years"
                :key="index"
            >
                <v-expansion-panel-header>
                {{year.name}}
                <v-spacer></v-spacer>
                <div style="width:100px" class="text-right grey--text text--darken-1"> 
                  <div>{{yearData(year).count}} Courses, {{yearData(year).hours}} Hrs</div>
                  
                  <div></div>

                  </div>
                
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                <!-- <v-container> -->
                    <v-list>
                        <v-list-item
                            v-for="semester in year.semesters"
                            :key="semester.id"
                        >
                            <!-- <template v-slot:activator>
                                <v-list-item-title>Fall</v-list-item-title>
                            </template> -->
                            <!-- <v-list-item-content>{{semester.name}}</v-list-item-content> -->
                            
                            <v-list-item-content>
                                <v-radio
                                dense
                                mandatory="false" 
                                :label="semester.name + ' - ' + semesterData(semester).count + ' courses, ' + semesterData(semester).hours + ' hrs'"
                                :value="semester.id"
                                ></v-radio>
                            </v-list-item-content>
                            <v-list-item-content>
                                <v-chip
                                color="primary darken--1"
                                class="ma-2"
                                outlined
                                v-for="(course,index) in semester.courses"
                                :key="index"
                                >  
                                    <CourseLink
                                        :code="course"
                                        :content="course"
                                        @courseClicked="courseClicked($event)"
                                    />
                                    <!-- {{semester.id}} {{selectedSemester}} -->
                                </v-chip>
                            </v-list-item-content>
                                        
                            
                                    
                            
                        </v-list-item>
                    </v-list>
                <!-- </v-container> -->
            </v-expansion-panel-content>
        </v-expansion-panel>
        </v-expansion-panels>
                    <!-- </v-list-item-group> -->
        </v-radio-group>
        </v-sheet>

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
            @click="selected"
            :disabled=!courseExists
        >
            Add
        </v-btn>
        </v-card-actions>
        <!-- <v-container>
        <v-dialog
            v-model="showCourseCreator"
            width="800"
            >
            <CourseCreator 
            :prevCode = "selectedCourse"
            @hide = "showCourseCreator=false"
            @createCourse = "createCourse($event)"
            @courseClicked="courseClicked($event)"
            />
        </v-dialog>
        </v-container> -->
      </v-card>
</template>

<script>
import CourseLink from "../CourseLink.vue";
// import CourseCreator from "./CourseCreator.vue";



  export default {

    components: {
        CourseLink,
        // CourseCreator,
    },
    data () {
      return {
          selectedCourse:"",
          selectedSemester:"",
          selectedYear:"",
        //   showCourseCreator:false,
          updateCourses:false,
          courseSearch: "",
          
      }
    },
    computed: {
        course (){
            let course = this.$store.getters.getCourses[this.showCourseCode]; 
            if (!course){
                return null;
            }
            return course;
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
        
        track :{
            get() {
                return this.$store.getters.getCurrentTrack;
            },
            set(value) {
                this.$store.commit('updateTrack', value);
            }
        },
        courseExists (){
            if (this.updateCourses){
                if (!this.selectedCourse) return true;
                return this.selectedCourse in this.courses;  
            }
            if (!this.selectedCourse) return true;
            return this.selectedCourse in this.courses;
        },

    },
    watch : {
        selectedCourse : function () {
            if (this.selectedCourse && this.selectedCourse.code){
                this.selectedCourse=this.selectedCourse.code;
            }
        }
    },
    methods: {
        hide(){
            this.$emit("cancel")
        },
        selected(){
            let years = this.track.years;
            for (let year in years){
                for (let semester in years[year].semesters){
                    if (years[year].semesters[semester].id==this.selectedSemester){
                        this.selectedYear = years[year].year;
                    }
                }
            }
            let data = {
                year:this.selectedYear,
                semester:this.selectedSemester,
                course:this.selectedCourse,
            };
            this.$emit("selected",data)
            this.year = "";
            this.semester = "";
            this.selectedCourse="";
        },
        courseClicked (course){
            console.log("Click")
            if (!course){return;}
            if (course.code){course=course.code;}
            // this.selectedCourse=course;
            if (course && !(Object.keys(this.courses).includes(course))){
                this.$emit('courseClicked','_new_');
            }
        },
        viewCourse (){
            console.log("View")
            this.$emit('courseClicked',this.selectedCourse);

        },
        getCourse(code){
            return this.courses[code];
        },
        arrayToObject(array){
            let object = {};
            Object.assign(object,array);
            return object;
        },
        
        testInput(){
            if (!(this.selectedCourse in this.courses)){
                this.courseCreatorClicked();
            }
        },
        
        yearData (year){
        let out = {};
        let sum = 0;
        let courseCount = 0;
        for (let semester in year.semesters){
          for (let courseI = 0; courseI < year.semesters[semester].courses.length; courseI++){
            courseCount++;
            if (this.courses[year.semesters[semester].courses[courseI]]){
              sum+=parseInt(this.courses[year.semesters[semester].courses[courseI]].hours);
            }
          }
        }
        out = {
          hours : sum,
          count : courseCount,
        };
        return out;
      },
      semesterData (semester){
        let out = {};
        let sum = 0;
        let courseCount = 0;
        for (let courseI of semester.courses){
          courseCount++;
          if (this.courses[courseI]){
            sum+=parseInt(this.courses[courseI].hours);
          }
        }
        out = {
          hours : sum,
          count : courseCount,
        };
        return out;
      },
    }
  }
</script>