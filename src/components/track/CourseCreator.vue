<template>
    <v-form>
      <v-card>
        <v-card-title
        primary-title
        >
        Create New Course
        </v-card-title>
        <v-card-subtitle>
            Create a course that is not yet in the Envisage system.
        </v-card-subtitle>
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                    v-model="code"
                    label="Course Code"
                    placeholder="ENG 101"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                    v-model="name"
                    label="Course Name"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                    v-model="hours"
                    label="Credit Hours"
                    ></v-text-field>
                </v-col>
            </v-row>
        
        <v-text-field
          v-model="description"
          label="Course Description"
        ></v-text-field>
        
        <v-combobox
          v-model="prerequisites"
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
        <!-- <template v-slot:selection="data">
            <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            @click="courseClicked(data.item.code)"
            >
            {{data.item.code}}
            </v-chip>
        </template> -->
         <template v-slot:no-data>
            <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                No results matching "<strong>{{ prerequisiteSearch }}</strong>". Press <kbd>enter</kbd> to add anyways, be sure to create this course later.
                </v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </template>
        </v-combobox>
        
        <!-- <v-combobox
          v-model="tags"
          :items=tagsList
          item-text=name
          item-value="name"
          :search-input.sync="tagSearch"
          label="Tags"
          placeholder="Tags"
          hint = "Tags are used to meet specific degree requirements (Cross Cultural, Speaking, etc)."
          no-data-text = "Loading courses failed, try reloading."
          multiple
          chips
        >
            <template v-slot:no-data>
                <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                    No results matching "<strong>{{ tagSearch }}</strong>". Press <kbd>enter</kbd> to create a new one
                    </v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </template>
        </v-combobox>
        {{tags}} -->
        
        
        

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
            @click="createCourse"
            :disabled=!complete
        >
            Add
        </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
</template>

<script>

  export default {
    props : {
        prevCode:{
            required: true,
        }
    },
    data () {
      return {
        code:this.prevCode,
        name : "",
        hours : "",
        description : "",
        tags : [],
        prerequisiteSearch : "",
        tagSearch : "",
        prerequisites : [],


          
      }
    },
    computed: {
        // course (){
        //     let course = this.$store.getters.getCourses[this.showCourseCode]; 
        //     if (!course){
        //         console.log("Null!")
        //         return null;
        //     }
        //     return course;
        // },
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
            return out;
        },
        tagsList () {
            let out = [];
            let tags = this.$store.getters.getTags;
            for (let i in tags){
                out.push(tags[i]);
            }
            return out;
        },
        complete() {
            return this.code && this.name && this.hours;
        },
        track :{
            get() {
                return this.$store.getters.getCurrentTrack;
            },
            set(value) {
                this.$store.commit('updateTrack', value);
            }
        },
        
    },
    methods: {
        hide(){
            this.$emit("hide")
        },
        getCourse(code){
            return this.courses[code];
        },
        courseClicked (code){
            console.log("Clicked")
            this.$emit('courseClicked',code);
        },  
        arrayToObject(array){
            let object = {};
            Object.assign(object,array);
            return object;
        },
        createCourse(){
            this.$emit('createCourse',this.code);
            this.$store.commit("createCourse",{
                code:this.code,
                name:this.name,
                hours:this.hours,
                description:this.description,
            });
            this.code="";
            this.name="";
            this.hours="";
            this.description="";
            console.log(this.coursesList);
        },
        cleanCourses(){
            console.log(this.prerequisites)
            for (let i in this.prerequisites){
                if (this.prerequisites[i].code){
                    console.log("Distilling")
                    this.prerequisites[i]=this.prerequisites[i].code
                }
                this.prerequisites[i]=this.prerequisites[i].toUpperCase();
            }
            console.log(this.prerequisites)

        }
        
        
        
    }
  }
</script>