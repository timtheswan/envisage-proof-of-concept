<template>
      <v-card>
        <v-card-title
        primary-title
        >
        Substitute Credit - {{categoryData.name}}
        </v-card-title>
        <v-divider/>
        <v-card-text>
            <v-card-title color=error>This feature is not  finished.</v-card-title> 
            <v-card-text> You cannot yet make substitutions, this won't stop you from making a plan that has substitutions, you'll just have to remember it yourself :(</v-card-text>
        <br>

            <v-card>
                <v-card-title>Replace</v-card-title>
                <v-card-text>
                    <v-radio-group v-model="replacedType" row>
                        <v-radio label="Hours" value="hours"></v-radio>
                        <v-radio label="Course" value="course"></v-radio>
                        <v-radio label="Nothing" value="nothing"></v-radio>
                    </v-radio-group>

                    <v-text-field v-if="replacedType=='hours'" label="Number of hours" v-model="replacedHours"/>

                    <v-select v-if="replacedType=='course'" label='Course' v-model="replacedCourse" :items="categoryData.courses"/>

                    <p v-if="replacedType=='nothing'">Substitution will not meet any enforced category requirements.</p>
                </v-card-text>
            </v-card>
            <br>
            <v-card>
                <v-card-title>With</v-card-title>
                <v-card-text>
                    <v-radio-group v-model="replaceWithType" row>
                        <v-radio label="Existing" value="existing"></v-radio>
                        <v-radio label="Transferred" value="transferred"></v-radio>
                        <v-radio label="Test Credit" value="test"></v-radio>

                    </v-radio-group>
                    <v-combobox
                    v-if="replaceWithType=='existing'"
                    v-model="replaceWithExisting"
                    auto-select-first
                    placeholder="Search for a course"
                    :items=coursesList
                    item-text=complete
                    item-value=code
                    :search-input.sync="courseSearch"
                    >
                        <template v-slot:no-data>
                        <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>
                            No classes matching "<strong>{{ courseSearch }}</strong>". 
                            </v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </template>
                    </v-combobox>


                    <v-text-field
                    v-if="replaceWithType!='existing'"
                    label="Name"
                    v-model="replaceWithNonExisting"
                    >
                    </v-text-field>
                    Substitution will not add any courses to your track. 
                </v-card-text>
            </v-card>
            

            
        </v-card-text>

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
            @click="save"
            :disabled="true"
        >
            Save
        </v-btn>
        </v-card-actions>
        
      </v-card>
</template>

<script>
export default {
    components: {},
    props : {
        categoryData : {
            required: true
        },
        substituteDegree : {
            required: true
        }
    },
    data () {
        return{
            // existingCourse : "",
            courseSearch : "",
            replacedType : "hours",
            replacedHours : 0,
            replacedCourse : "",
            replaceWithType : "existing",
            replaceWithExisting : "",
            replaceWithNonExisting : "",
            
        }
    },
    computed: {
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
        saveReady () {
            if (!((this.replacedType == 'hours' && this.replacedHours) || (this.replacedType == 'course' && this.replacedCourse)||this.replacedType == 'nothing')){
                return false;
            }
            if (!((this.replaceWithType=='existing'&&this.replaceWithExisting)||this.replaceWithNonExisting)){
                return false;
            }
            return true;
        },
        
    },
    methods: {
        hide(){
            this.$emit('hide');
        },
        save () {
            console.log("save")
            let substitution = {
                replacedType : this.replacedType,
                replaceWithType : this.replaceWithType
            };
            if (this.replacedType == 'hours'){
                substitution['replacedHours'] = this.replacedHours;
            }
            else if (this.replacedType == 'course'){
                substitution['replacedCourse'] = this.replacedCourse.code;
            }
            if (this.replaceWithType == 'existing'){
                substitution['replaceWithExisting'] = this.replaceWithExisting.code;
            }
            else if (this.replacedType == 'transferred'){
                substitution['replaceWithTransferred'] = this.replaceWithNonExisting;
            }
            else if (this.replacedType == 'test') {
                substitution['replaceWithTest'] = this.replaceWithNonExisting;
            }
            substitution['category'] = this.categoryData.name;
            substitution['degree'] = this.substituteDegree.name;
            this.$emit('save', substitution)
        }
    },

}
</script>