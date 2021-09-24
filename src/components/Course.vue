<template>
      <v-card>
          <div v-if="course || showCourseCode=='_new_'">
            <v-btn 
            class="ma-3" 
            dark  
            fab 
            absolute  
            right 
            outlined
            color="primary"
            @click="toggleEdit"
            :disabled="!disabled"
            v-if="mode!='create'"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-card-title  v-if="mode=='create'" >
                Create Course 
            </v-card-title>
            <v-card-title  v-if="mode=='edit'" >
                Edit Course 
            </v-card-title>
            <v-divider v-if="mode!='view'"/>
            <v-card-title v-if="mode=='create'">
                <v-text-field
                    v-model="code"
                    label="Course Code"
                ></v-text-field>
            </v-card-title>
            <v-card-title v-else  >
                {{course.code}}
            </v-card-title>
            
            <v-card-subtitle v-if="mode=='view'">
                {{course.name}}
            </v-card-subtitle>
            <v-card-subtitle v-else>
                <v-text-field
                    v-model="name"
                    label="Course Name"
                    :disabled="hidden"
                    
                ></v-text-field>
            </v-card-subtitle>
            <v-divider v-if="mode=='view'"/>
            
            
            <v-card-text>
                <div v-if="mode=='view'"><strong>Hours: </strong>{{course.hours}}</div>
                <div v-else>
                    <v-text-field
                    dense
                    v-model="hours"
                    label="Credit Hours"
                    :disabled="hidden"

                    ></v-text-field>
                </div>

                <div v-if="mode=='view' && course.schedule"><strong>Semester Schedule: </strong>{{course.schedule}}</div>
                <div v-if="mode!='view'">
                    <v-overflow-btn
                    dense
                    editable
                    :items=scheduleOptions
                    v-model="schedule"
                    label="Semester Schedule"
                    :disabled="hidden"
                    >
                    </v-overflow-btn>
                </div>

                <br>
                <div v-if="mode=='view'"><strong>Description: </strong>{{course.description}}</div>
                <div v-else>
                    <v-textarea
                    outlined
                    :disabled="hidden"
                    
                    v-model="description"
                    label="Course Description"
                    ></v-textarea>
                </div>
                
                <br v-if="mode=='view'">
                <strong v-if="course.prerequisites.length && mode=='view'">Prerequisite Courses:  </strong>
                <div v-if="mode=='view'">
                    <v-chip 
                    color="primary darken--1"
                    class="ma-2"
                    outlined
                    :disabled="hidden"

                    v-for="(prerequisite,index) in course.prerequisites"
                    :key="index"
                    >
                        <CourseLink
                            :code="prerequisite"
                            :content="prerequisite"
                            @courseClicked="courseClicked($event)"
                        />
                    </v-chip>
                </div>
                <v-combobox
                v-model="prerequisites"
                v-else
                :disabled="hidden"

                :items=coursesList
                item-text=complete
                item-value=code
                label="Prerequisites"
                placeholder="Please enter course codes."
                no-data-text = "Loading courses failed, try reloading."
                multiple
                chips
                :search-input.sync="prerequisiteSearch"
                hide-selected
                @input="cleanCourses()"

                >
                <template v-slot:no-data>
                    <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>
                        No results matching "<strong>{{ prerequisiteSearch }}</strong>". Press <kbd>enter</kbd> to add anyways, be sure to create this course later.
                        </v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </template>
                <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                        v-bind="attrs"
                        :input-value="selected"
                    >
                        <CourseLink
                            :code="item"
                            :content="item"
                            @courseClicked="courseClicked($event)"
                        />
                    </v-chip>
                    </template>
                </v-combobox>
                <div v-if="mode=='edit'">
                    <div v-if="!course.custom">
                        <v-btn v-if="hidden" @click="unhide" outline >
                            Cancel Remove
                        </v-btn>
                        <v-btn v-else @click="hideCourse" color="error">
                            Remove Course
                        </v-btn>
                    </div>
                    <div v-else>
                        <v-btn v-if="hidden" @click="unhide" outline>
                            Cancel Remove Custom Course
                        </v-btn>
                        <v-btn v-else @click="removeCustom" color="error">
                            Remove Custom Course
                        </v-btn>
                    </div>
                </div>
            </v-card-text>
            
            
            

            <v-divider></v-divider>

            <v-card-actions>
                <v-btn
                v-if="mode=='view'"
                color="primary"
                text
                @click="hide"
                >
                    Close
                </v-btn>
                <v-btn
                v-else
                color="primary"
                text
                @click="hide"
                >
                    Cancel
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                color="primary"
                @click="saveChanges"
                v-if="mode!='view'"
                :disabled="disabled"
                >

                Save Changes

                </v-btn>
                <v-btn
                color="primary"
                @click="addCourseToTrack"
                v-if="mode=='view' && !(coursesTaking.includes(course.code))"
                >
                Add to Track 
                </v-btn>
            </v-card-actions>
          </div>
          <div v-if="!course">
                <v-card-title>
                    {{showCourseCode}} does not exist!
                </v-card-title>
                <v-card-text>
                    No course with id "{{showCourseCode}}" exists... yet!
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="hide"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
          </div>
      </v-card>
</template>

<script>
import CourseLink from "./CourseLink.vue";



  export default {
    components: {
        CourseLink,
    },
    
    props : {
        showCourseCode:{
            required: true,
        },
        visible:{
            required:true,
        },
        creating:{
            required:false,
        }
    
    },
    
    data () {
      return {
          mode : "view",
          code : "",
          name : "",
          hours : 0,
          schedule : "",
          description : "",
          tags : [],
          prerequisites : [],
          prerequisiteSearch : "",
          hidden : false,
          scheduleOptions : [
              "Unspecified",
              "Every Semester",
              "Fall",
              "Spring",
              "J-Term",
              "Summer",
              "Fall Odd Years",
              "Fall Even Years",
              "Spring Odd Years",
              "Spring Even Years",
              "Offered Inconsistently"



          ]
              
          
      }
    },
    watch : {
        visible : function(){
            console.log("Visibility" + this.visible)
            if (!this.visible) {
                this.mode="view";
                this.hidden=false
            }
            if (this.visible && this.showCourseCode=='_new_'){
                console.log("Create")
                this.mode="create";
            }
            
        },
        
    },

    computed: {
        coursesTaking (){

            return this.$store.getters.getClassesTaking
        },
        
        course (){
            if (this.showCourseCode=="_new_"){
                return {
                    code:"",
                    name:"",
                    hours:"",
                    description:"",
                    tags:"",
                    prerequisites: [],
                    scheduleOptions: "",
                };
            }
            let course = this.$store.getters.getCourses[this.showCourseCode]; 
            if (!course){
                return null;
            }
            return course;
        },
        coursesList () {
            let out = [];
            let courses = this.$store.getters.getCourses;
            for (let i in courses){
                let course = courses[i];
                course.complete = course.code + " - " + course.name;
                out.push(course);
            }
            return out;
        },
        courses () {
            return this.$store.getters.getCourses;
        },
        disabled () {
            if (this.mode=='view'){
                return true;
            }
            if (!(this.name&&this.hours)){
                return true;
            }
            if ((
                this.name==this.course.name &&
                this.hours==this.course.hours &&
                this.scheduleOptions==this.course.scheduleOptions &&
                this.description==this.course.description &&
                this.prerequisites==this.course.prerequisites &&
                this.hidden==this.course.hidden)){
                    return true
                }
            if (this.mode=="create"&& (this.code in this.courses)){
                return true;
            }
            return false;
        },

        
        
    },
    methods: {
        hide(){
            this.$emit("hide")
        },
        courseClicked (code){
            this.$emit('courseClicked',code);
            this.updateData;
        }, 
        
        updateData () {
            let course = {};
            if (this.showCourseCode=='_new_' && this.code){
                course = this.$store.getters.getCourses[this.code]; 
            }
            else {
                course = this.$store.getters.getCourses[this.showCourseCode]; 
            }
            this.code = course.code;
            this.name = course.name;
            this.hours = course.hours;
            this.description = course.description;
            this.tags = course.tags;
            this.prerequisites = course.prerequisites;
            this.hidden = course.hidden;
        },
        toggleEdit (){
            if (this.mode=="edit"){
                this.mode="view";
            }
            else {
                this.mode="edit";
                this.edit();
            }
        },
        edit () {
            this.updateData();
        },
        cleanCourses(){
            for (let i in this.prerequisites){
                if (this.prerequisites[i].code){
                    this.prerequisites[i]=this.prerequisites[i].code
                }
                this.prerequisites[i]=this.prerequisites[i].toUpperCase();
            }
        },
        removeCustom () {
            this.hidden=true;
        },

        hideCourse () {
            this.hidden=true;
        },
        unhide () {
            this.hidden=false;
        },
        
        saveChanges () {
            if (this.hidden){
                if (this.course.custom){
                    this.$store.commit("deleteCustomCourse",this.code)
                }
                else {
                    this.$store.commit("hideCourse",this.code)
                }
            }
            else {
                let course = {
                    code : this.code,
                    name : this.name,
                    hours : this.hours,
                    scheduleOptions : this.scheduleOptions,
                    description : this.description,
                    tags : this.tags,
                    prerequisites : this.prerequisites,
                    hidden : this.hidden,
                };

                this.$store.commit("saveCustomCourse",course)
            }
            
            this.mode="view";
            this.updateData();
            if (this.showCourseCode=="_new_"){
                this.$emit("hide")
            }
        },
        addCourseToTrack(){
            this.$store.commit('addCourse',{course:this.course.code});
        }

    }
  }
</script>