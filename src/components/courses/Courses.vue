<template>
  <!-- <v-card flat > -->
    <v-container>
    <v-card v-if="tracks && Object.keys(tracks).length>0">
      
      <v-app-bar
      color="secondary dark"
      dark
      style="z-index:6"
      hide-on-scroll
      >
        <v-toolbar-title> {{currentPlan.name}} - Course Selection</v-toolbar-title>
        <v-spacer/>
      </v-app-bar>
      <v-sheet
      class="overflow-y-auto pt-8"
      max-height="76vh"
      >
      <v-container>
        <!-- <h1 class="title" >Courses</h1> -->
        <h2 class="subtitle-1 ml-3">Quickly choose and add courses according to your degree requirements. <strong>Not required</strong>, if you already know which courses you want to take to meet degree requirements, skip to track. </h2>
        <br>

        <!-- {{substitutions}} -->
        <v-expansion-panels
        
        hover
        accordion
        tile
        
        
        >
          <v-expansion-panel 
          v-for="(degree,index) in currentDegrees"
          :key = "index"
          >
            <v-expansion-panel-header>
              <strong> {{degree.name}} </strong>
              <div  style="width:100px" class="text-right grey--text text--darken-1">
                {{degreeHours(degree)}} Hours
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              
              <v-expansion-panels
              
              hover
              accordion
              tile
              >
                <v-expansion-panel 
                v-for="(category,index) in degree.categories"
                :key = "index"
                
                >
                <v-expansion-panel-header>
                    {{category.name}} 
                    
                    <div v-if="category.comment" style="width:100px" class=" ml-2 grey--text text--darken-1"> 
                      {{category.comment}}                  
                    </div>
                    <div v-if="category.requirementType==='all'" style="width:100px" class="text-right grey--text text--darken-1"> 
                      &nbsp;&nbsp;All required
                      ({{categoryCourseCount(category)}}/{{category.courses.length}})
                    </div>
                    <div v-else-if="category.requirementType=='1'" style="width:100px" class="text-right grey--text text--darken-1"> 
                      &nbsp;&nbsp;1 required
                      ({{categoryCourseCount(category)}}/1)
                    </div>
                    <div v-else-if="category.requirementType==='courses'" style="width:100px" class="text-right grey--text text--darken-1"> 
                      &nbsp;&nbsp;{{category.requirementValue}} required
                      ({{categoryCourseCount(category)}}/{{category.requirementValue}})
                    </div>
                    <div v-else-if="category.requirementType=='total'" style="width:100px" class="text-right grey--text text--darken-1"> 
                      &nbsp;&nbsp;{{category.requirementValue}} degree hours required
                      ({{degreeHours(degree)}}/{{degree.minimumHours}})
                    </div>
                    <div v-else-if="category.requirementType=='hours'" style="width:100px" class="text-right grey--text text--darken-1"> 
                      &nbsp;&nbsp;{{category.requirementValue}} hours required
                      ({{categoryHoursCount(category)}}/{{category.requirementValue}})
                    </div>
                    
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-btn 
                    text
                    color=primary
                    max-width="100px"
                    @click="showSubstitute=true; substituteCategory=category; substituteDegree=degree;"
                    > 
                      Substitute
                    </v-btn>
                  <v-btn 
                    v-if="category.requirementType==='all' " 
                    text
                    max-width="100px"
                    @click="addAll(category,degree)"
                    > 
                      Add All
                    </v-btn>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-card>
                      <v-list>
                        <v-list-item 
                          v-for="(course,index) in category.courses.slice(0,Math.ceil(category.courses.length/2))"
                          :key = "index"
                          dense
                        >
                        <v-list-item-icon>
                            <v-checkbox 
                            v-if="Object.keys(courses).includes(course)" 
                            :indeterminate="indeterminate(course,degree.name,category.name)"
                            :disabled="indeterminate(course,degree.name,category.name)"
                            v-model="selectedCourses" 
                            :value=course
                            @click="toggleCourseSelection(degree.name,category.name,course)"
                            ></v-checkbox>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title v-if="getCourse(course)"> 
                              <CourseLink
                                :code="course"
                                :content="course"
                                @courseClicked="courseClicked($event)"
                              />
                            </v-list-item-title>
                            <v-list-item-title v-else>
                              {{course}}
                            </v-list-item-title>
                            
                            <v-list-item-subtitle v-if="getCourse(course)">
                              {{getCourse(course).name}} - {{getCourse(course).hours}} hrs
                            </v-list-item-subtitle>
                            <v-list-item-subtitle v-else-if="getCategoryCustom(category,course)">
                              {{getCategoryCustom(category,course).name}} - {{getCategoryCustom(category,course).hours}} hrs
                            </v-list-item-subtitle>

                            
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-menu>
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  icon
                                  v-on="on"
                                >
                                  <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                              </template>

                              <v-list>
                                <v-list-item
                                  @click="sendTo(item)"
                                >
                                  <v-list-item-title>Choose Semester</v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                  @click="sendTo(item)"
                                >
                                  <v-list-item-title>Substitute</v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-menu>

                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-card v-if="category.courses.length>1">
                      <v-list>
                        <v-list-item 
                          v-for="(course,index) in category.courses.slice(Math.ceil(category.courses.length/2),category.courses.length)"
                          :key = "index"
                          dense
                        >
                        <v-list-item-icon>
                            <v-checkbox
                            v-if="Object.keys(courses).includes(course)" 
                            :indeterminate="indeterminate(course,degree.name,category.name)"
                            :disabled="indeterminate(course,degree.name,category.name)"
                            v-model="selectedCourses" 
                            :value=course
                            @click="toggleCourseSelection(degree.name,category.name,course)"
                            ></v-checkbox>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title v-if="getCourse(course)"> 
                              <CourseLink
                                :code="course"
                                :content="course"
                                @courseClicked="courseClicked($event)"
                              />
                            </v-list-item-title>
                            <v-list-item-title v-else>
                              {{course}}
                            </v-list-item-title>
                            
                            <v-list-item-subtitle v-if="getCourse(course)">
                              {{getCourse(course).name}} - {{getCourse(course).hours}} hrs
                            </v-list-item-subtitle>
                            <v-list-item-subtitle v-else-if="getCategoryCustom(category,course)">
                              {{getCategoryCustom(category,course).name}} - {{getCategoryCustom(category,course).hours}} hrs
                            </v-list-item-subtitle>

                            
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-menu>
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  icon
                                  v-on="on"
                                >
                                  <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                              </template>

                              <v-list>
                                <v-list-item
                                  @click="sendTo(item)"
                                >
                                  <v-list-item-title>Choose Semester</v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                  @click="sendTo(item)"
                                >
                                  <v-list-item-title>Substitute</v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-menu>

                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
                    
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <br>
        <br>
        <br>
        <br>
        <v-dialog
          v-model="showSubstitute"
          width="500"
        >
        <Substitute
          :categoryData=substituteCategory
          :substituteDegree=substituteDegree
          @hide = "showSubstitute=false"
          @save = "addSubstitute($event); showSubstitute=false;"
        />
      </v-dialog>
      </v-container>
    </v-sheet>
    </v-card>
    <div v-else>
      <v-card-title>No Plans</v-card-title>
      <v-card-subtitle>Looks like you don't have any plans created yet!</v-card-subtitle>
      <v-dialog
          v-model="showCreateTrack"
          width="600"
        >
        <CreateTrack 
          @hide = "showCreateTrack=false"
          @created = "showCreateTrack=false"
        />
      </v-dialog>
      <v-card-actions>
        <v-btn
        color="primary"
        @click="showCreateTrack=true"
        >
        Create New Plan
        </v-btn>
      </v-card-actions>
    </div>  
  <!-- </v-card> -->
    </v-container>
</template>

<script>
import CourseLink from "../CourseLink.vue";
import Substitute from "./Substitute.vue";
import CreateTrack from "../track/CreateTrack.vue";


export default {
  
  components: {
    CourseLink,
    CreateTrack,
    Substitute
  },
  data () {
      return {
        preventDoubleToggle : false,
        update : false,
        showCreateTrack : false,
        showSubstitute : false,
        substituteCategory : {},
        substituteDegree : {},
      }
    },
  computed: {
      foundationalCore (){
        return this.$store.getters.getFoundationalCore;
      },
      currentDegrees (){
        this.courseSelections;
        return this.$store.getters.getCurrentDegrees;
      },
      courses (){
        return this.$store.getters.getCourses; 
      },
      
      courseSelections (){
        return this.$store.getters.getCourseSelections;
      },
      selectedCourses (){
        let selections = this.$store.getters.getCourseSelections;
        let out = [];
        if (this.update){this.update;}
        for (let courseI in selections){
          if (courseI=="manuallyAdded"){
            for (let course of selections.manuallyAdded){
              out.push(course);
            }
          }
          else {
            out.push(courseI)
          }
        }
        return out;
      },
      tracks () {
        this.courseSelections;
        return this.$store.getters.getTracks; 
      },
      currentPlan (){
        return this.$store.getters.getCurrentTrack;
      },
      substitutions (){
        return this.$store.getters.getSubstitutions;
      },
      getCategorySubstitutions (degree,category){ 
        let out = []
        for (let sub of this.substitutions){
          // if (substitutions[sub].degree==substitution.degree && substitutions[sub].category.name==substitution.category.name && substitutions[sub].replacedHours==substitution.replacedHours ){}
          if (sub.degree.name==degree.name && sub.category.name==category.name){
            out.push(sub);
          }
        }
        return out;
      }
  },
  methods: {
    getCourse(code){
        return this.courses[code];
    },
    courseClicked (code){
        this.$emit('courseClicked',code);
    },
    categoryCourseCount(category){
        let courseCount = 0;
        for (let courseI of category.courses){
          if (this.selectedCourses.find((course)=>{
            return course==courseI;
            })){
              courseCount++;
          }
        }
        return courseCount;
    },
    categoryHoursCount(category){
        let hourCount = 0;
        for (let courseI of category.courses){
          if (this.selectedCourses.find((course)=>{
            return course==courseI;
            })){
              hourCount+=parseInt(this.getCourse(courseI).hours);
          }
        }
        return hourCount;
    },
    degreeHours(degree){
        let degreeCourses = [];
        let hours = 0;
        for (let category of degree.categories){
          for (let courseI of category.courses){
            if (this.getCourse(courseI)){
              degreeCourses.push(courseI);
            }
            // if (this.getCourse(courseI) && this.selectedCourses.find((course)=>{
            //   return course==courseI;
            //   })){
            //     hours+=parseInt(this.getCourse(courseI).hours);
            // }
          }
        }
        console.log("Degree's courses")
        console.log(degreeCourses);
        console.log("Selected courses")
        console.log(this.selectedCourses)
        for (let selectedCourse of this.selectedCourses){
          // console.log(selectedCourse)
          if (degreeCourses.includes(selectedCourse)){
            console.log('hi')
            hours+=parseInt(this.getCourse(selectedCourse).hours);
          }
        }
        
        
        return hours;
    },
    getCategoryCustom (category,course){
      if (!category.custom){return null}
      let data = category.custom.find((item)=>{
        return item.code==course;
      })
      return data;

    },
    addAll(category,degree){
      for (let course of category.courses){
        if (!(this.selectedCourses.includes(course))){
          this.selectedCourses.push(course)
          this.$store.commit('addCourseSelection',{course:course,degree:degree.name,category:category.name});
          this.addToTrack(course)

        }
        else if (!(this.courseSelections[course].meetsCategory===category.name && this.courseSelections[course].degree===degree.name) && !category.preventDoubleCount){  //Change from indeterminate to yes
          this.selectedCourses.push(course)
          this.$store.commit('addCourseSelection',{course:course,degree:degree.name,category:category.name});

        }
      }
    },
    toggleCourseSelection(degree,category,course){
      if (!this.preventDoubleToggle){
        if (this.courseSelections[course]&&this.courseSelections[course].degree==degree&&this.courseSelections[course].meetsCategory==category){   //If unchecking something that was added in Courses view
          this.$store.commit('removeCourseSelection', course);
          if (!this.courseSelections[course]){
            this.removeFromTrack(course);
          }


        }
        
        else {  //Checking, add course
          if (!this.courseSelections[course]){
            this.addToTrack(course);
          }
          this.$store.commit('addCourseSelection',{course:course,degree:degree,category:category});
          }
        
        this.courseSelections;
        this.selectedCourses;
        this.update = !this.update;
        this.$forceUpdate();
      }
      this.preventDoubleToggle=!this.preventDoubleToggle;
      

    },
    isSelected (course, degree, category){
      if (this.courseSelections[course]&&this.courseSelections[course].degree==degree&&this.courseSelections[course].meetsCategory==category){ //Is selected normally
        return true;
      }
      else if (this.courseSelections[course]&&!(this.courseSelections[course].degree==degree&&this.courseSelections[course].meetsCategory==category)){ //Is selected elsewhere
        return "indeterminate";
      }
      else if (this.courseSelections["manuallyAdded"].includes(course)){    //Exists from track
        this.$store.commit('removeManuallyAdded', course); //Fixes, adds location data, prevents double-counting courses
        this.$store.commit('addCourseSelection',{course:course,degree:degree,category:category}); 
        return true; 
      }
      return false;
    },
    indeterminate (course,degree,category){
      if (this.courseSelections[course]&&!(this.courseSelections[course].degree==degree&&this.courseSelections[course].meetsCategory==category)){ //Is selected elsewhere
        return true;  
      }
      else if (this.courseSelections["manuallyAdded"].includes(course)){    //Exists only in track, need to fix
        this.$store.commit('removeManuallyAdded', course); //Fixes, adds location data, prevents double-counting courses
        this.$store.commit('addCourseSelection',{course:course,degree:degree,category:category}); 
      }
      return false; 
    },
    addToTrack (course){
      this.$store.commit('addCourse', {course:course});
    },
    removeFromTrack (course){
      this.$store.commit('removeCourse', course);

    },
    addSubstitute (substitution){
      console.log("New Substitution");
      console.log(substitution)
      this.$store.commit('addSubstitution',substitution)
    },
    removeSubstitute(substitution){
        this.$store.commit('removeSubstitution',substitution)
    }

  },
   
};
</script>
