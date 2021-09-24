<template>
    <v-form>
      <v-card>
        <v-card-title
        primary-title
        >
        Create Degree
        </v-card-title>
        <v-card-subtitle>
            Create a degree that is not yet in the Envisage system..
        </v-card-subtitle>
        <v-container>
            Text
        </v-container>
        <v-container>
            <v-text-field
            v-model="name"
            label="Degree Name"
            ></v-text-field>
            <v-row>
                <v-col cols="12" md="4">
                    <v-overflow-btn
                        v-model="type"
                        class="my-2"
                        :items="degreeTypes"
                        item-text=name
                        item-value=value
                        editable
                        label="Degree Type"
                    ></v-overflow-btn>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                    v-model="catalogYear"
                    label="Catalog Year"
                    hint="Enter the starting year"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                    v-model="hours"
                    label="Total Major Hours"
                    ></v-text-field>
                </v-col>
            </v-row>
            <strong>Courses</strong>
            <v-expansion-panels>
                <v-expansion-panel
                v-for="(category,index) in categories"
                :key=index
                >
                    <v-expansion-panel-header>
                        <strong>{{category.name}}</strong>
                        <div class="text-right">
                            <v-chip 
                            v-for="(course,index) in category.courses"
                            :key=index
                            class="ma-2"
                            >
                                {{course}}
                            </v-chip>
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field
                                v-model="category.name"
                                label="Category Name"
                                hint="Make name unique within degree"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-overflow-btn
                                v-model="category.requirementType"
                                class="my-2"
                                :items="requirementData"
                                item-text=name
                                item-value=value
                                label="Category Type"
                                ></v-overflow-btn>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field
                                v-if="category.requirementType == 'courses' || category.requirementType == 'hours' || category.requirementType == 'total'"
                                v-model="category.requirementValue"
                                label="Requirement Value"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-text-field
                        v-model="category.comment"
                        label="Additional Requirement Info"
                        hint="Will show when students choose courses, will not be enforced by Envisage"
                        ></v-text-field>
                        {{category.courses}}
                        <v-combobox
                        v-model="category.courses"
                        :items=coursesList
                        item-text=complete
                        item-value=code
                        label="Courses"
                        no-data-text = "Loading courses failed, try reloading."
                        multiple
                        chips
                        hide-selected
                        @input="cleanCourses(category.name)"
                        
                        :search-input.sync="courseSearch"

                        >
                            <!-- <template v-slot:selection="{ attrs, item, select, selected }">
                                <v-chip
                                    v-bind="attrs"
                                    :input-value="selected"
                                >
                                    {{ item }}&nbsp;
                                    
                                </v-chip>
                            </template> -->
                            <!-- <template v-slot:no-data>
                                <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                    No results matching "<strong>{{ courseSearch }}</strong>". Press <kbd>enter</kbd> to add anyways, be sure to create this course later.
                                    </v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>
                            </template> -->
                        </v-combobox>
                        <v-btn @click="removeCategory(category)" color="error">
                            Remove Category
                        </v-btn>
                        
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <br>
            <v-btn @click="addCategory">
                Add Category
            </v-btn>
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
            @click="createDegree"
            :disabled=!complete
        >
            Create Degree
        </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
</template>

<script>

  export default {
    props : {
        
    },
    data () {
      return {
        code:this.prevCode,
        name : "",
        hours : "",
        description : "",
        tags : [],
        type: "",
        catalogYear: new Date().getFullYear(),
        prerequisiteSearch : "",
        tagSearch : "",
        prerequisites : [],
        categories : [],
        courseSearch : "",
        mycourses : [],
        requirementTypeValues : ["hours","courses","total"],
        requirementData : [
            {
                name:"All Courses",
                value:"all",
                
            },
            {
                name:"Take One",
                value:"1"
            },
            {
                name:"X Hours",
                value:"hours",
                needsValue:true
            },
            {
                name:"X Courses",
                value:"courses",
                needsValue:true
            },
            {
                name:"X Total Degree Hours",
                value:"total",
                needsValue:true
            },
            
        ],
        degreeTypes : ["B.A.","B.S.","Minor"],



          
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
            return this.name && this.type && this.hours && this.catalogYear && this.categories;
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
        addCategory(){
            //TODO Updae Category requirements mechanics (type vs val?) on Courses
            this.categories.push({
                name : "New Category",
                requirementType : "",
                requirementValue : 0,
                courses : [],
                comment : "",
            })

        },
        removeCategory(category){
            for (var i = this.categories.length - 1; i >= 0; --i) {
            if (this.categories[i] === category) {
                this.categories.splice(i,1);
            }
        }
        },
        createDegree(){
            this.$emit("createDegree",
            {
                name : this.name,
                type : this.type,
                catalogYear : this.catalogYear,
                minimumHours:this.hours,
                categories : this.categories,
                custom : true,
            })

            
        },
        cleanCourses(categoryName){
            let index = null;
            for (let i in this.categories){
                if (this.categories[i].name===categoryName){
                    index=i;
                    break;
                }
            }
            for (let i in this.categories[index].courses){
                if (this.categories[index].courses[i].code){
                    console.log("Distilling");
                    console.log(this.categories[index].courses[i].code);
                    this.categories[index].courses[i]=this.categories[index].courses[i].code
                }
                this.categories[index].courses[i]=this.categories[index].courses[i].toUpperCase();
            }
        }
        
        
        
    }
  }
</script>