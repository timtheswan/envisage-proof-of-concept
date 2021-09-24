<template>
    <div>
      <v-card v-if="mode=='view'">
          <div v-if="degreeData">
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
            
            
            <v-card-title v-if="mode=='create'">
                <v-text-field
                    v-model="code"
                    label="Degree Name"
                ></v-text-field>
            </v-card-title>
            <v-card-title v-else  >
                {{degreeData.name}}
            </v-card-title>
            <v-card-subtitle v-if="mode=='view'">
                {{degreeData.department}}
            </v-card-subtitle>
            <v-divider v-if="mode=='view'"/>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-card>
                            <v-card-title>Degree Info</v-card-title>
                            <v-card-text>
                                Type: {{degreeData.type}}
                        
                                <br>


                                Catalog Year: {{degreeData.catalogYear}}
                        
                                <br>

                                Minimum Degree Hours: {{degreeData.minimumHours}}

                                
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card v-if="plan">
                            <v-card-title>Planning Help</v-card-title>
                            <v-card-subtitle>Personalized data on how adding this degree would affect you, coming soon</v-card-subtitle>
                            <v-card-text>
                                <ul>
                                    <li>If changes students catalog year</li>
                                    <li>(If taking) amount of completed</li>
                                    <li>Number of hours and classes added (max/min)</li>
                                    <li>Number of hours and classes listed that are already covered</li>
                                    <li>Automatically generate plans with this in it and provide even more detailed data on how it would affect graduation date, avg hrs per semester, etc </li>
                                </ul>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                
                <br>

                <v-card>
                    <v-card-title> Course Requirements </v-card-title>
                    <v-list>
                        <v-list-item
                        :v-if="degreeData.categories"
                        v-for="(category,index) in degreeData.categories"
                        :key=index
                        >
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{category.name}} - {{convertRequirementType(category.requirementType,category.requirementValue)}}
                                </v-list-item-title>
                                <div width="200">
                                    <v-chip
                                    v-for="(course,index) in category.courses"
                                    :key=index
                                    class="ma-2"
                                    >
                                        <CourseLink
                                            :code="course"
                                            :content="course"
                                            @courseClicked="courseClicked($event)"
                                        />
                                    </v-chip>
                                </div>
                            </v-list-item-content>

                        </v-list-item>
                    </v-list>
                </v-card>
                <br>
                <v-card>
                    <v-card-title>Additional Requirements</v-card-title>
                    <v-card-text v-if="degreeData.requirements"> 
                        <li
                        v-for="(index,requirement) in degreeData.requirements"
                        :key="(index)"
                        
                        > 
                        {{requirement}}
                        </li>
                    </v-card-text>
                    <v-card-text v-else>
                        No data
                    </v-card-text>
                </v-card>
                
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
                @click="addDegreeToTrack"
                v-if="mode=='view'&& !isInPlan "
                >
                Add to Plan 
                </v-btn>
            </v-card-actions>
          </div>
          <div v-if="!degreeData">
                <v-card-title>
                    {{degreeName}} does not exist!
                </v-card-title>
                <v-card-text>
                    No degree with name "{{degreeName}}" exists... yet!
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

      <v-card v-else>
          <div v-if="!degreeData"> Error, no degree data, try creating one. </div>
          <div v-else>
            <v-btn 
            class="ma-3" 
            dark  
            fab 
            absolute  
            right 
            outlined
            color="primary"
            @click="toggleEdit"
            v-if="mode=='edit'"
            >  
                <v-icon>mdi-close</v-icon>
            </v-btn>

            <v-card-title v-if="mode=='edit'" >
                Edit Degree - {{degreeData.name}}, {{degreeData.type}}
            </v-card-title>
            <v-card-title v-else>
                Create Degree 
            </v-card-title>

            <v-card-subtitle>
                Changes are not specific to plan and will only be applied once saved.
            </v-card-subtitle>

            <v-divider/>

            <v-card-text>
                <v-card>
                    <v-card-title>Get Curriculum Document</v-card-title>
                    <v-card-text>
                        To make an accurate degree, you will need a curriculum document <a target="none" href="/example_curriculum.pdf"> like this</a>. 
                        Curriculum can be downloaded at Taylor's Major's and Minors page, find your major and scroll down to "[major name] Curriculum & Degree Options".
                    </v-card-text>
                    <v-card-text>
                        Be sure to account for catalog year (ask your advisor if you don't have the right year).
                    </v-card-text>
                    <v-card-actions>
                        <v-btn><a target="none" href="https://www.taylor.edu/majors">Get Curriculum</a></v-btn>
                    </v-card-actions>
                </v-card>
                <br>
                <v-card>
                    <v-card-title>Degree Info</v-card-title>
                    <v-card-text>
                        <v-text-field
                        v-if="mode=='create'"
                        v-model="name"
                        label="Degree Name"
                        hint="Once you create the degree, you will not be able to modify degree name or type."
                        ></v-text-field>
                        <v-text-field
                        v-model="department"
                        label="Department"
                        :disabled=hidden

                        ></v-text-field>
                        <v-row>
                            <v-col cols="12" sm="4">
                                <v-overflow-btn
                                    :disabled="mode!='create'"
                                    v-model="type"
                                    class="my-2"
                                    :items="degreeTypes"
                                    item-text=name
                                    item-value=value
                                    editable
                                    menu-props="top"
                                    label="Degree Type"
                                    hint="Once you create the degree, you will not be able to modify degree name or type."

                                ></v-overflow-btn>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field
                                :disabled=hidden
                                v-model="catalogYear"
                                label="Catalog Year"
                                hint="Enter the starting year"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field
                                :disabled=hidden
                                v-model="minimumHours"
                                label="Total Major Hours"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                
                <br>

                <v-card>
                    <v-card-title>Course Requirements</v-card-title>
                    <v-card-text>Requirements categories typically show on the curriculum as chunks of courses with a header or italic line describing the type of requirement.</v-card-text>
                    <v-card-text>
                        <v-expansion-panels>
                            <v-expansion-panel
                            v-for="(category,index) in categories"
                            :key=index
                            :disabled=hidden

                            >
                                <v-expansion-panel-header>
                                    <strong>{{category.name}}</strong>
                                    <div class="text-right">
                                        {{category.courses.length}} Courses
                                        <!-- <v-chip 
                                        v-for="(course,index) in category.courses"
                                        :key=index
                                        class="ma-2"
                                        >
                                            {{course}}
                                        </v-chip> -->
                                    </div>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-row>
                                        <v-col cols="12" sm="4">
                                            <v-text-field
                                            v-model="category.name"
                                            label="Category Name"
                                            hint="Make name unique within degree"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4">
                                            <v-overflow-btn
                                            v-model="category.requirementType"
                                            class="my-2"
                                            :items="requirementData"
                                            item-text=name
                                            item-value=value
                                            label="Category Type"
                                            ></v-overflow-btn>
                                        </v-col>
                                        <v-col cols="12" sm="4">
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
                                    <br>
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
                                    </v-combobox>
                                    <v-btn @click="removeCategory(category)" color="error">
                                        Remove Category
                                    </v-btn>
                                    
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <v-card-actions>
                            <v-btn :disabled="hidden" class="mt-3" @click="addCategory">
                                Add Category
                            </v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
                <br>
                <v-card>
                    <v-card-title>Additional Requirements</v-card-title>
                    <v-card-text>
                        <v-textarea
                        outlined
                        :disabled="hidden"
                        v-model="requirements"
                        hint="Envisage will show this in Degree info and below the degree in the courses view."
                        ></v-textarea>
                    </v-card-text>
                </v-card>
                <br>
                <div v-if="mode=='edit'">
                    <v-btn v-if="hidden" @click="unhide" outline >
                        Cancel Remove
                    </v-btn>
                    <v-btn v-else @click="hideDegree" color="error">
                        Remove Degree
                    </v-btn>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
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
                :disabled="disabled"
                >

                Save Changes

                </v-btn>
                
            </v-card-actions>

          </div>
      </v-card>
    </div>
</template>

<script>
import CourseLink from "./CourseLink.vue";



  export default {
    components: {
        CourseLink,
    },
    
    props : {
        degreeProp:{
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
            name : "",
            department : "",
            type : "",
            catalogYear : new Date().getFullYear(),
            minimumHours : "",
            requirements : "",
            categories : [],
            hidden : false,
            courseSearch : "",
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
    mounted (){
        if (!this.visible) {
            this.mode="view";
            this.hidden=false
        }
        if (this.visible && this.degreeProp=='_new_'){
            this.mode="create";
        }
    },
    watch : {
        visible : function(){
            console.log("visibility")
            if (!this.visible) {
                this.mode="view";
                this.hidden=false
            }
            if (this.visible && this.degreeProp=='_new_'){
                this.mode="create";
                
            }
            
        },
       
        
    },

    computed: {
        degreeName (){
            return this.degreeData.name;
        },
        degreeData (){
            let degrees = this.$store.getters.getDegrees;
            for (let degree of degrees ){
                if (!degree.hidden && degree.name==this.degreeProp.name && degree.type==this.degreeProp.type){
                return degree;
                }
            }
            return {};
        },
        isInPlan () {
            console.log(this.$store.getters.getCurrentDegreeNames)
            console.log(this.degreeProp.name)
            console.log()
            return this.$store.getters.getCurrentDegreeNames.includes(this.degreeProp.name);
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
            if (!(this.name&&this.type)){return true;}
            
            return false;
        },
        plan () {
            return this.$store.getters.getCurrentTrack;
        }

        
        
    },
    methods: {
        hide(){
            this.$emit("hide")
        },
        courseClicked (code){
            this.$emit('courseClicked',code);
            this.updateData;
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
        
        hideDegree () {
            this.hidden=true;
        },
        unhide () {
            this.hidden=false;
        },
        
        saveChanges () {
            if (this.hidden){
                if (this.degreeData.custom){
                    this.$store.commit("deleteCustomDegree",this.degreeData.name,this.degreeData.type)
                }
                else {
                    this.$store.commit("hideDegree",this.degreeData.name,this.degreeData.type)
                }
            }
            else {
                let degree = {
                    name : this.name,
                    department : this.department,
                    type : this.type,
                    catalogYear : this.catalogYear,
                    minimumHours : this.minimumHours,
                    categories : [...this.categories],
                    requirements : this.requirements,
                };

                this.$store.commit("saveCustomDegree",degree);
                this.$store.commit('addDegree',this.name);

                this.name = "";
                this.department = "";
                this.type = "";
                this.catalogYear = new Date().getFullYear();
                this.minimumHours = "";
                this.requirements = "";
                this.categories = [];
                this.hidden = false;
                
            }
            if (this.mode=='create'){
                    this.$emit("hide");
            }
            else {
                this.mode="view";
            }
            this.updateData();

        },
        addDegreeToTrack(){
            this.$store.commit('addDegree',this.degreeData.name);
            this.$emit('hide')
        },
        convertRequirementType(type,number){
            if (type=="all"){
                return "All Courses"
            }
            if (type=="1"){
                return "Take One"
            }
            if (type=="courses"){
                return "Take " + number + " courses"
            }
            if (type=="hours"){
                return "Take " + number + " hours"
            }
            if (type=="total"){
                return "Total " + number + " degree hours"
            }
        },
        getDegree (name,type){   
            let degrees = this.$store.getters.getDegrees;
            for (let degree of degrees){
                if (degree.name==name && degree.type==type){
                    return degree;
                }
            }
        },
        updateData () {
            console.log("Update")
            let degree = {};
            if (this.degreeData=='_new_'&&this.name&&this.type){
                degree = this.getDegree(this.name,this.type);
            }
            else if (this.degreeData=='_new_'){
                return;
            }
            else {
                degree = this.getDegree(this.degreeData.name,this.degreeData.type);
            }
            console.log(degree)

            this.name = degree.name;
            this.department = degree.department;
            this.type = degree.type;
            this.catalogYear = degree.catalogYear;
            this.minimumHours = degree.minimumHours;
            this.categories = degree.categories;
            this.requirements = degree.requirements;
            console.log(this.minimumHours)


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
                    this.categories[index].courses[i]=this.categories[index].courses[i].code
                }
                this.categories[index].courses[i]=this.categories[index].courses[i].toUpperCase();
            }
        }

    }
  }
</script>