<template>
  <!-- <v-card flat > -->
    <div v-if="tracks && Object.keys(tracks).length>0">
      <!-- <v-card-title>Academic Track</v-card-title> -->
      <!-- <v-card-subtitle>
        Plan when to take your courses during your college career. Add courses, drag and drop to move them around, and recieve helpful data to make the best track. Courses added and removed are synced to the courses view.
        
        
        </v-card-subtitle> -->
        <v-container>
        <v-card class="overflow-hidden">
        

          <v-app-bar
            :collapse="!collapseOnScroll"
            :collapse-on-scroll="collapseOnScroll"
            absolute
            color="secondary dark"
            dark
            scroll-target="#scrolling-techniques-6"
            style="z-index:6"
          >
            <v-btn 
            icon
            @click="toggleDrawer"
            ><v-app-bar-nav-icon></v-app-bar-nav-icon></v-btn>

            <!-- <v-toolbar-title>{{Object.keys(track.years).length}} Year Plan</v-toolbar-title> -->
            <v-toolbar-title> {{currentTrack.name}} - {{Object.keys(track.years).length}} Year Track</v-toolbar-title>
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
                
                  @click="addCourseDialog"
                  
                >
                  <v-list-item-title ><strong>Add Course</strong></v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="addSemesterDialog"
                >
                  <v-list-item-title>Add Semester</v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="addYearDialog"
                >
                  <v-list-item-title>Add Year</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu
              v-model="visibilityMenu"
              :close-on-content-click="false"
              :nudge-width="200"
              offset-x
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  dark
                  v-on="on"
                  icon
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>View Settings</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                  <v-list-item>
                    <v-list-item-action>
                      <v-switch v-model="condensed" color="purple"></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Condensed View</v-list-item-title>
                  </v-list-item>
                </v-list>

              </v-card>
            </v-menu>
          </v-app-bar>

          <v-sheet
          id="scrolling-techniques-6"
          class="overflow-y-auto pt-8"
          max-height="600"
          
          >
          <!-- <v-hover
            v-slot:default="{ hover }"
          > -->
            
          <v-navigation-drawer
            color="blue-grey lighten-3  "
            v-model="drawer"
            absolute
            style="z-index:5"
            mini-variant-width="100px"
            hide-overlay
            >
            <!-- hover fix point below -->
            <!-- <div v-if="setSideBarHover(hover)"/>  -->
            <div v-if="setSideBarHover(true)"/> 

              <v-list
                dense
                nav
                class="py-0"
                
              > 
              <br>
              <br>
              <br>
                <v-list-item>
                  <v-list-item-title>
                    Unplaced
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-subtitle>
                    Drag and drop courses
                  </v-list-item-subtitle>
                </v-list-item>
                
                <v-divider/>
                <draggable  v-if="!condensed" v-model="track.unplacedClasses" group="courses" style="min-height: 10px" @end="updateTrack()">
                    <v-list-item
                      v-for="course in track.unplacedClasses"
                      :key="course"
                      dense
                    >
                      <v-list-item-content  >
                        <v-list-item-title >
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn 
                                  text
                                  class="ma-0 pa-0"
                                  v-on="on"
                                  @click="courseClicked(course)"
                              >
                                  {{course}}
                              </v-btn>
                            </template>
                            <span>{{courses[course].name}}</span>
                          </v-tooltip>
                        </v-list-item-title>
                        <v-list-item-subtitle class="pl-1" v-if="getCourse(course)">
                          {{getCourse(course).hours}} hr <span v-if="true"> - {{getCourse(course).name}}</span>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                                <v-btn
                                text
                                icon
                                @click="removeCourse('','unplaced',course)"
                                >
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                              </v-list-item-action>
                    </v-list-item>
                  </draggable>
                  <draggable  v-else v-model="track.unplacedClasses" group="courses" style="min-height: 10px" @end="updateTrack()">
                     <v-chip  class="ma-1" v-for="course in track.unplacedClasses" :key="course">
                      <v-menu   offset-x>
                        <template v-slot:activator="{ on }">
                          <div > <div v-on="on">{{getCourse(course).hours}} - {{course}}</div></div>
                        </template>
                        <v-card width="300" >
                          <v-card-title>{{getCourse(course).name}}</v-card-title>
                          <v-card-subtitle>
                            <CourseLink
                              :code="course"
                              :content="course"
                              @courseClicked="courseClicked($event)"
                            />
                            - {{getCourse(course).hours}} credit hours
                            </v-card-subtitle>
                          <v-card-actions>
                            <v-spacer/>
                            <v-btn text @click="removeCourse('','unplaced',course);menu=false;">Remove from plan</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-menu>
                  </v-chip>
                    
                  </draggable>
                  <v-list-item v-if="track.unplacedClasses.length==0">
                    <v-list-item-subtitle>No Unplaced Classes</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item v-else>
                    <v-btn 
                      v-if="true" 
                      text
                      @click="removeDuplicates"
                      > 
                        Remove Duplicates
                      </v-btn>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          <!-- </v-hover> -->
          <v-row class="pa-0">
            <v-col cols="12" :sm="colA"/> 
            <v-col cols="12" :sm="colB" class="ml-3">
            <br>
            <v-card-title>
              Instructions
            </v-card-title>
            <v-card-text>
              To quickly add courses to a semester, click the dots on a semester and use "Quick Add". Or, to see the courses you selected in "Courses", open the left sidebar and drag and drop your unplaced classes into the correct semester.
            </v-card-text>
            <v-card-title>
              Summary
            </v-card-title>
            <v-card-text>
              <strong>{{trackData.totalHours}}</strong> Total Hours ({{trackData.totalCourses}} Courses)
              <br>
              <strong>{{trackData.scheduledHours}}</strong> Scheduled Hours ({{trackData.scheduledCourses}} Courses)
              <br>
              <strong>{{trackData.unplacedHours}}</strong> Unscheduled Hours ({{trackData.unplacedCourses}} Courses)
              <br>
              <!-- {{trackData}} -->
              <!-- {{track.unplacedClasses}}
              <br>
              {{track.years["2020"].semesters["2020 Fall"].courses}} -->

            </v-card-text>
            <v-card-title>
              Years
            </v-card-title>
            <!-- </v-banner> -->
            <v-expansion-panels
            hover
            accordion
            multiple
            v-if="!condensed"
          >
            <v-expansion-panel
              v-for="(year,index) in track.years"
              :key="index"
            >
              <v-expansion-panel-header>
                <!-- <v-row> -->
                  <!-- <v-col cols = "2"> -->

                      {{year.name}}
                  <!-- </v-col> -->
                  <!-- <v-col cols = "2"> -->
                    <v-spacer></v-spacer>
                    <div style="width:100px" class="text-right grey--text text--darken-1"> 
                      <div>{{yearData(year).count}} Courses</div>
                      
                      <div>{{yearData(year).hours}} Hours</div>

                      </div>
                  <!-- </v-col> -->

                <!-- <v-spacer></v-spacer> -->
                <!-- </v-row> -->
                
              </v-expansion-panel-header>
              <v-expansion-panel-content style="padding:0">
                <v-expansion-panels
                  accordion
                  multiple
                  hover
                >
                  <v-expansion-panel
                      v-for="semester in year.semesters"
                      :key="semester.name"
                  >
                    <v-expansion-panel-header>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <span v-on="on">{{semester.name}}</span>
                        </template>
                        <span>{{`${year.name} ${semester.name} - ${semesterData(semester).count} courses, ${semesterData(semester).hours} hours.`}}</span>
                      </v-tooltip>
                      
                      <v-spacer></v-spacer>
                      
                      <div style="width:100px" class="text-right grey--text text--darken-1"> 
                        
                        
                        <div>{{semesterData(semester).hours}} Hours</div>

                        </div>
                      </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-card>
                            <v-list two-line dense>
                              <draggable v-model="semester.courses" group="courses" style="min-height: 10px" @end="updateTrack()">
                                <v-list-item
                                  v-for="course in semester.courses.slice(0,Math.ceil(semester.courses.length/2))"
                                  :key="course"
                                >
                                <v-list-item-icon v-if="getCourse(course)">
                                  {{getCourse(course).hours}}
                                  
                                </v-list-item-icon>
                                  <v-list-item-content>
                                    <v-list-item-title>
                                      <CourseLink
                                        :code="course"
                                        :content="course"
                                        @courseClicked="courseClicked($event)"
                                      />
                                    </v-list-item-title >
                                    <v-list-item-subtitle v-if="getCourse(course)">
                                      {{getCourse(course).name}} 
                                    </v-list-item-subtitle>
                                  </v-list-item-content>
                                  <v-list-item-action>
                                    <v-btn
                                    text
                                    icon
                                    @click="removeCourse(year,semester,course)"
                                    >
                                      <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                  </v-list-item-action>
                                </v-list-item>
                              </draggable>
                              <v-list-item v-if="semester.courses.length==0">
                                <v-list-item-subtitle>No classes</v-list-item-subtitle>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-card>
                            <v-list two-line dense>
                              <draggable v-model="semester.courses" group="courses" style="min-height: 10px" @end="updateTrack()">
                                <v-list-item
                                  v-for="course in semester.courses.slice(Math.ceil(semester.courses.length/2),semester.courses.length)"
                                  :key="course"
                                >
                                <v-list-item-icon v-if="getCourse(course)">
                                  {{getCourse(course).hours}}
                                  
                                </v-list-item-icon>
                                  <v-list-item-content>
                                    <v-list-item-title>
                                      <CourseLink
                                        :code="course"
                                        :content="course"
                                        @courseClicked="courseClicked($event)"
                                      />
                                    </v-list-item-title >
                                    <v-list-item-subtitle v-if="getCourse(course)">
                                      {{getCourse(course).name}} 
                                    </v-list-item-subtitle>
                                  </v-list-item-content>
                                  <v-list-item-action>
                                    <v-btn
                                    text
                                    icon
                                    @click="removeCourse(year,semester,course)"
                                    >
                                      <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                  </v-list-item-action>
                                </v-list-item>
                              </draggable>
                              <v-list-item v-if="semester.courses.length==0">
                                <v-list-item-subtitle>No classes</v-list-item-subtitle>
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

          <v-expansion-panels
            hover
            accordion
            v-else
            multiple
          >
            <v-expansion-panel
                v-for="(year,index) in track.years"
                :key="index"
            >
              <v-expansion-panel-header>
                {{year.name}}
                <v-spacer></v-spacer>
                <div style="width:100px" class="text-right grey--text text--darken-1"> 
                  <div>{{yearData(year).count}} Courses</div>
                  
                  <div>{{yearData(year).hours}} Hours</div>
                </div>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12" sm="4" v-for="semester in mergeJTermAndSummer(year.semesters)" :key="semester.name" >
                    <v-card>
                      <v-menu :close-on-content-click="false" offset-y>
                        <template v-slot:activator="{ on }">
                          <v-btn 
                            class="ma-3" 
                            absolute  
                            right 
                            icon
                            v-on="on"
                            >
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-card width="300" >
                          <v-card-title>{{semester.id}}</v-card-title>
                          <v-divider/>
                          <v-card-text>
                            
                            <v-combobox
                              v-model="year.semesters[semester.id].courses"
                              :items=coursesList
                              item-text=complete
                              item-value=code
                              label="Quick Add"
                              no-data-text = "Loading courses failed, try reloading."
                              multiple
                              chips
                              hide-selected
                              
                              :search-input.sync="courseSearch"
                              @input="cleanCourses(year,semester,year.semesters[semester.id].courses)"

                              >

                            </v-combobox>
                          </v-card-text>
                        </v-card>
                      </v-menu>
                      
                      <v-card-title>{{year.semesters[semester.id].name}}</v-card-title>
                      <v-card-subtitle v-if="semesterData(semester).count"> {{semesterData(semester).count}} courses, {{semesterData(year.semesters[semester.id]).hours}} hours</v-card-subtitle>
                      <v-card-text>
                          <draggable v-model="year.semesters[semester.id].courses" group="courses" style="min-height: 10px" @end="updateTrack()">
                                 
                                
                                 <v-chip  class="ma-1" v-for="course in year.semesters[semester.id].courses" :key="course" >
                                      <v-menu   offset-x>
                                        <template v-slot:activator="{ on }">
                                          <div > <div v-on="on">{{getCourse(course).hours}} - {{course}}</div></div>
                                        </template>
                                        <v-card width="300" >
                                          <v-card-title>{{getCourse(course).name}}</v-card-title>
                                          <v-card-subtitle>
                                            <CourseLink
                                              :code="course"
                                              :content="course"
                                              @courseClicked="courseClicked($event)"
                                            />
                                            - {{getCourse(course).hours}} credit hours
                                            </v-card-subtitle>
                                          <v-card-actions>
                                            <v-spacer/>
                                            <v-btn text @click="removeCourse(year,semester,course);menu=false;">Remove</v-btn>
                                          </v-card-actions>
                                        </v-card>
                                      </v-menu>
                                 </v-chip>
                                 <v-card-subtitle  v-if="year.semesters[semester.id].courses.length==0">
                                    No classes
                                  </v-card-subtitle>
                          </draggable>
                      </v-card-text>
                    </v-card>
                    <br>
                    <v-card v-if="semester['Summer'] && semester['Summer'].name">
                      <v-card-title>{{year.semesters[semester['Summer'].idx].name}} </v-card-title>
                      <v-card-subtitle v-if="semesterData(semester.Summer).count"> {{semesterData(year.semesters[semester['Summer'].idx]).count}} courses, {{semesterData(year.semesters[semester['Summer'].idx]).hours}} hours</v-card-subtitle>
                
                      <v-card-text>
                        <!-- <v-list dense> -->
                          <draggable v-model="year.semesters[semester['Summer'].idx].courses" group="courses" style="min-height: 10px" @end="updateTrack()">
                            <!-- <v-list-item
                              v-for="course in semester.courses"
                              :key="course"
                            > -->
                              <!-- <v-list-item-content> -->
                                <v-chip  class="ma-1" v-for="course in year.semesters[semester['Summer'].idx].courses" :key="course">
                                  <v-menu   offset-x>
                                    <template v-slot:activator="{ on }">
                                      <div > <div v-on="on">{{getCourse(course).hours}} - {{course}}</div></div>
                                    </template>
                                    <v-card width="300" >
                                      <v-card-title>{{getCourse(course).name}}</v-card-title>
                                      <v-card-subtitle>
                                        <CourseLink
                                          :code="course"
                                          :content="course"
                                          @courseClicked="courseClicked($event)"
                                        />
                                        - {{getCourse(course).hours}} credit hours
                                        </v-card-subtitle>
                                      <v-divider/>
                                      <v-card-text>
                                        Course details will go here
                                      </v-card-text>
                                      <v-card-actions>
                                        <v-spacer/>
                                        <v-btn text @click="removeCourse(year,semester,course);menu=false;">Remove from track</v-btn>
                                      </v-card-actions>
                                    </v-card>
                                  </v-menu>
                              </v-chip>
                                 
                                 <v-card-subtitle  v-if="year.semesters[semester['Summer'].idx].courses.length==0">
                                    No classes
                                  </v-card-subtitle>
                          </draggable>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>

            </v-expansion-panel>
          </v-expansion-panels>






            </v-col>
          </v-row>
          </v-sheet>
      </v-card>
        </v-container>

      <v-card-actions>
        
      </v-card-actions>
      <v-dialog
        v-model="showCourseSelector"
        width="600"
      >
      <CourseSelector 
        @selected = "addCourse($event)"
        @cancel = "cancelCourse"
        @courseClicked="courseClicked($event)"
        
      />
    </v-dialog>
    <v-dialog
        v-model="showCreateTrack"
        width="600"
      >
      <CreateTrack 
        @hide = "cancelCreateTrack"
        @created = "trackCreated"
      />
    </v-dialog>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- <v-btn color="primary">
        Submit Changes
      </v-btn> -->
    </v-card-actions>
  </div>
  <div v-else>
      <v-card-title>No Plans</v-card-title>
      <v-card-subtitle>Looks like you don't have any plans created yet!</v-card-subtitle>
      <v-dialog
          v-model="showCreateTrack"
          width="600"
        >
        <CreateTrack 
          @hide = "cancelCreateTrack"
          @created = "firstTrackCreated"
        />
      </v-dialog>
      <v-card-actions>
        <v-btn
        color="primary"
        @click="createTrackDialog"
        >
        Create New Plan
        </v-btn>
      </v-card-actions>
  </div>
<!-- </v-card> -->
</template>

<script>
import CourseLink from "../CourseLink.vue";
import CourseSelector from "./CourseSelector.vue";
import CreateTrack from "./CreateTrack.vue";
import draggable from 'vuedraggable'



export default {
  
  components: {
    CourseLink,
    draggable,
    CourseSelector,
    CreateTrack,
  },
  data () {
      return {
        showCourseSelector : false,
        showCreateTrack : false,
        collapseOnScroll : true,
        drawer : false,
        sideBarHover : false,
        condensed : true,
        visibilityMenu : false,
        track : JSON.parse(JSON.stringify(this.$store.getters.getCurrentTrack)),
        courseSearch : "",
      }
    },
    computed: {
      courses (){
        return this.$store.getters.getCourses; 
      },
      getTrack :{
        get() {
            return this.$store.getters.getCurrentTrack;
        },
      },
      getUnplacedClasses : {
        get() {
          return this.$store.getters.getCurrentTrack.unplacedClasses; 
        },
      },
      tracks () {
        return this.$store.getters.getTracks; 
      },
      courseSelections (){
        return this.$store.getters.getCourseSelections;
      },
      colA (){
        if (!this.drawer){
          return "0";
          }
        else if (this.sideBarHover){
          return "3";
        }
        return "1";
      },
      colB () {
        if (!this.drawer){
          return "11";
          }
        else if (this.sideBarHover){
        return "8";
        }
        return "10";
      },
      currentTrack (){
        return this.$store.getters.getCurrentTrack;
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
      trackData () {
        let track = this.$store.getters.getCurrentTrack;
        let courses = this.$store.getters.getCourses;

        let scheduledHours = 0;
        let scheduledCourses = 0;
        let unplacedCourses = track.unplacedClasses.length;
        let unplacedHours = 0;

        for (let course of track.unplacedClasses){
          unplacedHours += parseInt(courses[course].hours);
        }
        
        for (let yearI in track.years){
          let year = track.years[yearI];
          for (let semester in year.semesters){
            for (let courseI = 0; courseI < year.semesters[semester].courses.length; courseI++){
              scheduledCourses++;
              if (courses[year.semesters[semester].courses[courseI]]){
                scheduledHours+=parseInt(courses[year.semesters[semester].courses[courseI]].hours);
              }
            }
          }
        }
        return {
          totalHours : scheduledHours+unplacedHours,
          totalCourses : scheduledCourses+unplacedCourses,
          scheduledHours : scheduledHours,
          scheduledCourses : scheduledCourses,
          unplacedHours : unplacedHours,
          unplacedCourses : unplacedCourses,
        };
      }
    },
    methods: {
      courseClicked (code){
        this.$emit('courseClicked',code);
      },
      getCourse(code){
        return this.courses[code];
      },
      addCourseDialog(){
        this.showCourseSelector = true;
      },
      addSemesterDialog(){
        console.log("Add Semester");
      },
      addYearDialog(){
        console.log("Add Year");
      },
      addCourse(data){
        this.showCourseSelector = false;
        this.$store.commit('addCourse', data);
        this.$store.commit('manuallyAddCourseSelection',data.course);
      },
      cancelCourse(){
        this.showCourseSelector = false;
      },
      removeCourse(year,semester,course){
        console.log('Remove')
        this.$store.commit("removeCourseAtLocation",{year:year,semester:semester,course:course})
        
        if (this.courseSelections["manuallyAdded"].includes(course)){    //If unchecking something that was added in Track view
          this.$store.commit('removeManuallyAdded', course);
        }
        if (this.courseSelections[course]){
          this.$store.commit('removeCourseSelection', course);
        }
        this.updateTrackState();
        this.$forceUpdate();
      },
      changeTrack(track){
        this.$store.commit('changeCurrentTrack', track);
        this.$forceUpdate();
      },
      updateTrackState(){
        this.track = JSON.parse(JSON.stringify(this.$store.getters.getCurrentTrack));
      },
      updateTrack(){
        // evt Properties (Draggable docs)
        //draggedContext: context linked to dragged element
        //  index: dragged element index
        //  element: dragged element underlying view model element
        //  futureIndex: potential index of the dragged element if the drop operation is accepted
        //relatedContext: context linked to current drag operation
        //  index: target element index
        //  element: target element view model element
        //  list: target list
        //  component: target VueComponent

        //return false to cancel the move (use if invalid semester)
        this.$store.commit('updateTrack', this.track)
        

        // this.track = JSON.parse(JSON.stringify(this.$store.getters.getCurrentTrack));
      },
      quickAddDelete (year,semester){
        let storeCourses = this.$store.getters.getCurrentTrack.years[year.year].semesters[semester.id].courses;
        let tempCourses = this.track.years[year.year].semesters[semester.id].courses;
        let courseSelections = this.$store.getters.getCourseSelections;
        for (let course of storeCourses ){
          if (!(tempCourses.includes(course))&&courseSelections["manuallyAdded"].includes(course)){
            this.$store.commit('removeCourseAtLocation',{year:year,semester:semester,course:course})
            this.$store.commit('removeManuallyAdded', course);
          }
        }
        for (let course of tempCourses){
          if (!(storeCourses.includes(course))){
            this.$store.commit('addCourse', {year:year.year,semester:semester.id,course:course});
          }
          if (!(courseSelections[course] || courseSelections["manuallyAdded"].includes(course))){
            this.$store.commit('manuallyAddCourseSelection',course);
          }
        }
        this.updateTrack();
      },
      createTrackDialog (){
        this.showCreateTrack = true;
      },
      cancelCreateTrack(){
        this.showCreateTrack = false;
      },
      trackCreated(){
        this.showCreateTrack = false;
        this.$forceUpdate();

      },
      firstTrackCreated(){
        this.showCreateTrack = false;
        this.$forceUpdate();
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
      toggleDrawer(){
        this.drawer=!this.drawer;
      },
      setSideBarHover(hover){
        this.sideBarHover=hover;
      },
      mergeJTermAndSummer(semestersReference){
          let semesters = JSON.parse(JSON.stringify(semestersReference));
          let jTerm = {};
          let summer = {};

        for (let semesterIdx of Object.keys(semesters)){
          let semester = semesters[semesterIdx];
          if (semester.name=='J-Term'){
            jTerm = semester;
          }
          else if (semester.name=='Summer'){
            summer = semester;
            summer ['idx'] = semesterIdx;
          }
        }

        jTerm['Summer']=summer;
        if (jTerm && summer){
          for (let semesterIdx of Object.keys(semesters)){
            let semester = semesters[semesterIdx];
            if (semester.name=='J-Term'){
              semesters[semesterIdx] = jTerm;
            }
            else if (semester.name=='Summer'){
              delete semesters[semesterIdx];
            }
          }
        }
        return semesters;
        
      },
        cleanCourses(year,semester,courses){
            for (let courseI in courses){
              if (courses[courseI].code){
                  courses[courseI]=courses[courseI].code
              }
              courses[courseI]=courses[courseI].toUpperCase();
              if (!this.courses[courses[courseI]]){
                courses.splice(courseI,1);
              }
            }
            this.quickAddDelete(year,semester);
            return courses;
        },
      // courseOptions(){

      // }
      removeDuplicates(){
        let track = this.$store.getters.getCurrentTrack

        for (let yearI in track.years){
          let year = track.years[yearI];
          for (let semesterI in year.semesters){
            let semester = year.semesters[semesterI]
            for( let courseI in semester.courses ){ 
              let course = semester.courses[courseI];
              for (let unplacedCourseI = 0; unplacedCourseI < track.unplacedClasses.length; unplacedCourseI++){
                let unplacedCourse = track.unplacedClasses[unplacedCourseI];
                if (course == unplacedCourse){
                  track.unplacedClasses.splice(unplacedCourseI,1)
                }
              }
            }
          }
        }
        this.track=track;
        this.$store.commit('updateTrack', track);
      }
  },
};
</script>
